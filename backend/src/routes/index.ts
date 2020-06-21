import { Router } from 'express'
import multer from 'multer'

import multerConfig from './../config/multer'

const routes = Router()
const upload = multer( multerConfig )

import Items from './../controllers/ItemsController'
import Point from './../controllers/PointController'

routes.get( '/items', Items.index )

routes.get( '/points', Point.index )
routes.get( '/points/:id', Point.show )
routes.post( '/points', upload.single( 'image' ), Point.store )


export default routes
