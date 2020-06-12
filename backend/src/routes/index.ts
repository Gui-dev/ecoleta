import { Router, Request, Response } from 'express'

const routes = Router()

import Items from './../controllers/ItemsController'

routes.get( '/items', Items.index )


export default routes
