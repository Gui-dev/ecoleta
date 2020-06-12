import { Router, Request, Response } from 'express'

const routes = Router()

import Items from './../controllers/ItemsController'
import Point from './../controllers/PointController'

routes.get( '/items', Items.index )

routes.post( '/points', Point.store )


export default routes
