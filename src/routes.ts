import express from 'express'

import ItemController from './controller/ItemController';
import PointController from './controller/PointController';

const routes = express.Router()

const itemController = new ItemController()
const pointController = new PointController()

routes.get('/items', itemController.index)

routes.post('/points', pointController.create)
routes.get('/points/:id', pointController.show)
routes.get('/points', pointController.index)

export default routes
