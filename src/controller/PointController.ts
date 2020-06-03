import { Request, Response } from 'express'
import knex from '../database/connection'

class PointController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query

    const query = knex('point')
      .join('point_item', 'point.id', '=', 'point_item.point_id')
      .distinct()
      .select('point.*')

    if (city) {
      query.where('city', String(city))
    }
    if (uf) {
      query.where('uf', String(uf))
    }
    if (items) {
      query.whereIn('point_item.item_id', items.map(item => Number(item.trim())))
    }

    const points = await query

    return response.json({ data: points })
  }
  async show(request: Request, response: Response) {
    const { id } = request.params

    const point = await knex('point').where('id', id).first()

    if (!point) {
      return response.json('Not found').status(400)
    }

    const items = await knex('item')
      .join('point_item', 'item.id', '=', 'point_item.item_id')
      .where('point_item.point_id', id)
      .select('point_item.id', 'item.id AS item_id', 'item.title')

    //TODO: Utilizar uma query apenas
    return response.json({ ...point, items })
  }

  async create(request: Request, response: Response) {
    const {
      // image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body

    const trx = await knex.transaction()

    const point = {
      image: 'placeholder',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }

    const insertedIds = await trx('point').insert(point)

    const point_id = insertedIds[0]

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      }
    })

    await trx('point_item').insert(pointItems)

    await trx.commit()

    return response.json({
      id: point_id,
      ...point,
    }).status(201)
  }
}

export default PointController
