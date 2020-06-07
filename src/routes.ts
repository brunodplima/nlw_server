import express from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import ItemController from './controller/ItemController';
import PointController from './controller/PointController';

const routes = express.Router()
const upload = multer(multerConfig)

const itemController = new ItemController()
const pointController = new PointController()

routes.get('/items', itemController.index)

routes.post('/points', upload.single('image'), pointController.create)
routes.get('/points/:id', pointController.show)
routes.get('/points', pointController.index)

export default routes
