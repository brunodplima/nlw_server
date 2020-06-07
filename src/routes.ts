import express from 'express'
import { celebrate, Joi } from 'celebrate'

import multer from 'multer'
import multerConfig from './config/multer'

import ItemController from './controller/ItemController';
import PointController from './controller/PointController';

const routes = express.Router()
const upload = multer(multerConfig)

const itemController = new ItemController()
const pointController = new PointController()

routes.get('/items', itemController.index)

routes.post('/points',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.number().required(),
      uf: Joi.number().required().min(2).max(2),
      items: Joi.string().required(), //TODO: regex
    })
  }, {
    abortEarly: false,
  }),
  pointController.create
)
routes.get('/points/:id', pointController.show)
routes.get('/points', pointController.index)

export default routes
