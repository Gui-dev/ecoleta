import { Request, Response } from 'express'
import knex from './../database/connection'

class PointController {

  async index( request: Request, response: Response ) {
    const { city, uf, items } = request.query
    const parseItems = String( items ).split( ',' ).map( item => Number( item.trim() ) )
    const points = await knex( 'points' )
      .join( 'point_items', 'points.id', '=', 'point_items.point_id' )
      .whereIn( 'point_items.item_id', parseItems )
      .where( 'city', String( city ) )
      .where( 'uf', String( uf ).toUpperCase() )
      .distinct()
      .select( 'points.*' )

    const serializePoints = points.map( point => {
      return {
        ...point,
        image_url: `http://192.168.0.105:3333/uploads/${point.image}`
      }
    } )

    return response.status( 201 ).json( serializePoints )
  }

  async store( request: Request, response: Response ) {

    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body

    const trx = await knex.transaction()

    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }

    const insertedIds = await trx( 'points' ).insert( point )

    const point_id = insertedIds[ 0 ]

    const pointItems = items
      .split( ',' )
      .map( ( item: string ) => Number( item.trim() ) )
      .map( ( item_id: number ) => {
        return {
          item_id,
          point_id
        }
      } )

    await trx( 'point_items' ).insert( pointItems )
    await trx.commit()

    return response.status( 201 ).json( {
      id: point_id,
      ...point
    } )
  }

  async show( request: Request, response: Response ) {
    const { id } = request.params
    const point = await knex( 'points' ).where( 'id', id ).first()

    if( !point ) {
      return response.status( 400 ).json( { error: 'Point not found' } )
    }

    const serializePoint = {
        ...point,
        image_url: `http://192.168.0.105:3333/uploads/${point.image}`
    }


    const items = await knex( 'items' )
      .join( 'point_items', 'items.id', '=', 'point_items.item_id' )
      .where( 'point_items.point_id', id )
      .select( 'items.title' )



    return response.status( 201 ).json( { serializePoint, items } )
  }
}

export default new PointController
