import { Router } from 'express'
import multer from 'multer'
import { celebrate, Joi } from 'celebrate'

import multerConfig from './../config/multer'

const routes = Router()
const upload = multer( multerConfig )

import Items from './../controllers/ItemsController'
import Point from './../controllers/PointController'

routes.get( '/items', Items.index )

routes.get( '/points', Point.index )
routes.get( '/points/:id', Point.show )
routes.post(
  '/points',
  upload.single( 'image' ),
  celebrate( {
    body: Joi.object().keys( {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      whatsapp: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().max( 2 ).required(),
      items: Joi.string().required(),
    } )
  }, {
    abortEarly: false,
  } ),
  Point.store
)


export default routes
