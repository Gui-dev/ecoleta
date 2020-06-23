import express from 'express'
import cors from 'cors'
import { resolve } from 'path'
import { errors } from 'celebrate'

import routes from './routes'

class App {

  public app: express.Application

  constructor() {

    this.app = express()

    this.middlewares()
    this.routes()
    this.handleException()
  }

  private middlewares(): void {
    this.app.use( express.json() )
    this.app.use( cors() )
    this.app.use( '/uploads', express.static( resolve( __dirname, '..', 'uploads' ) ) )
  }

  private routes(): void {
    this.app.use( routes )
  }

  private handleException(): void {
    this.app.use( errors() )
  }
}

export default new App().app
