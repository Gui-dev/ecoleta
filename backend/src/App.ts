import express from 'express'
import cors from 'cors'
import { resolve } from 'path'

import routes from './routes'

class App {

  public app: express.Application

  constructor() {

    this.app = express()

    this.middlewares()
    this.routes()
  }

  private middlewares(): void {
    this.app.use( express.json() )
    this.app.use( cors() )
    this.app.use( '/uploads', express.static( resolve( __dirname, '..', 'uploads' ) ) )
  }

  private routes(): void {
    this.app.use( routes )
  }
}

export default new App().app
