import { Router } from 'express'

const routes = Router()

import Items from './../controllers/ItemsController'
import Point from './../controllers/PointController'

routes.get( '/items', Items.index )

routes.get( '/points', Point.index )
routes.get( '/points/:id', Point.show )
routes.post( '/points', Point.store )


export default routes
