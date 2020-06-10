import { Router, Request, Response } from 'express'

const routes = Router()

routes.get( '/', ( request: Request, response: Response ) => {
  response.json( { ok: 'Hello World' } )
} )

export default routes