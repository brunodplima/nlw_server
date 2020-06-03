import { Request, Response } from 'express'
import knex from '../database/connection'

class ItemController {
  async index(request: Request, response: Response) {
    const items = await knex('item').select('*')

    const serializedItems = items.map(item => {
      return {
        ...item,
        image: `http://localhost:3333/uploads/${item.image}`
      }
    })

    return response.json({data: items})
  }
}

export default ItemController
