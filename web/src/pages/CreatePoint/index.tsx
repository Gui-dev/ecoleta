import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiCheckCircle, FiXCircle } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import axios from 'axios'

import api from './../../services/api'

import './CreatePoint.css'
import logo from './../../assets/logo.svg'

interface ItemsProps {
  id: number,
  title: string,
  image_url: string,
}

interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

const CreatePoint: React.FC = () => {

  const history = useHistory()
  const [ initialPosition, setInitialPosition ] = useState<[number, number]>( [ 0, 0 ] )
  const [ formData, setFormData ] = useState( {
    name: '',
    email: '',
    whatsapp: '',
  } )
  const [ items, setItems ] = useState<ItemsProps[]>( [] )
  const [ ufs, setUfs ] = useState<string[]>( [] )
  const [ selectedUf, setSelectedUf ] = useState( '0' )
  const [ cities, setCities ] = useState<string[]>( [] )
  const [ selectedCity, setSelectedCity ] = useState( '0' )
  const [ selectedItems, setSelectedItems ] = useState<number[]>( [] )
  const [ selectedPosition, setSelectedPosition ] = useState<[number, number]>( [ 0, 0 ] )
  const [ showCheckout, setShowCheckout ] = useState<boolean>( false )

  useEffect( () => {
    navigator.geolocation.getCurrentPosition( position => {
      const { latitude, longitude } = position.coords
      setInitialPosition( [ latitude, longitude ] )
    } )
  }, [] )

  useEffect( () => {
    api.get( '/items' )
      .then( response => {
        setItems( response.data )
      } )
  }, [] )

  useEffect( () => {
    axios.get<IBGEUFResponse[]>( `https://servicodados.ibge.gov.br/api/v1/localidades/estados` )
      .then( response => {
        const ufInitials = response.data.map( uf => uf.sigla )
        setUfs( ufInitials )
      } )
  }, [] )

  useEffect( () => {

    if( selectedUf === '0' ) return 

    axios.get<IBGECityResponse[]>( 
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios` 
    ).then( response => {
        const cityNames = response.data.map( city => city.nome )
        setCities( cityNames )
      } )

  }, [ selectedUf ] )

  const handleSelectUf = ( event: ChangeEvent<HTMLSelectElement> ) => {
    const uf = event.target.value
    setSelectedUf( uf )
  }

  const handleSelectCity = ( event: ChangeEvent<HTMLSelectElement> ) => {
    const city = event.target.value
    setSelectedCity( city )
  }

  const handleMapClick = ( event: LeafletMouseEvent ) => {
    setSelectedPosition( [ 
      event.latlng.lat,
      event.latlng.lng,
    ] )
  }

  const handleInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = event.target 
    setFormData( { ...formData, [ name ]: value } )
  }

  const handleSelectItem = ( id: number ) => {
    const alreadySelected = selectedItems.findIndex( item => item === id )

    if( alreadySelected >= 0 ) {
      const filteredItems = selectedItems.filter( item => item !== id )
      setSelectedItems( filteredItems )
    } else {
      setSelectedItems( [ ...selectedItems, id ] )
    }

  }

  const handleSubmit = async ( event: FormEvent ) => {
    event.preventDefault()
    const { name, email, whatsapp } = formData
    const uf = selectedUf
    const city = selectedCity
    const [ latitude, longitude ] = selectedPosition
    const items = selectedItems

    const data = { name, email, whatsapp, uf, city, latitude, longitude, items }

    await api.post( '/points', data )
    setShowCheckout( true )
  }

  const handleClose = () => {
    setShowCheckout( false )
    history.push( '/' )
  }

  return (
    <>
      { showCheckout && (
        <div className="page-create-point-check">
          <div className="check">
            <span className="close" onClick={ handleClose }>
              <FiXCircle  size={40} color="#34CB79"/>
            </span>
            <FiCheckCircle size={40} color="#34CB79"/>
            <h2>Cadastro concluido</h2>
          </div>
        </div>
      ) }
    
      <section id="page-create-point">

        <header>
          <img src={ logo } alt="Ecoleta" title="Ecoleta"/>  
          <Link to="/" title="Voltar para Home">
            <FiArrowLeft />
            Voltar para Home
          </Link>
        </header>

        <form onSubmit={ handleSubmit }>
          <h1>Cadastro do <br/>ponto de coleta</h1>

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>

            <div className="field">
              <label htmlFor="name">Nome da entidade</label>
              <input
                type="text" 
                name="name" 
                id="name"
                onChange={ handleInputChange }
              />
            </div>

            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input 
                type="email" 
                name="email" 
                id="email"
                onChange={ handleInputChange }/>
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input 
                type="text" 
                name="whatsapp" 
                id="whatsapp"
                onChange={ handleInputChange }/>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </legend>

            <Map 
              center={ initialPosition }
              zoom={ 15 }
              onClick={ handleMapClick }
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={ selectedPosition }/>
            </Map>

            <div className="field-group">

              <div className="field">
                <label htmlFor="uf">Estado (UF)</label>
                <select 
                  name="uf" 
                  id="uf" 
                  value={ selectedUf } 
                  onChange={ handleSelectUf }
                >
                  <option value="0">Selecione um UF</option>

                  { ufs.map( uf => (
                    <option key={ String( uf ) } value={uf}>{uf}</option>
                  ) ) }

                </select>
              </div>

              <div className="field">
                <label htmlFor="city">Cidade</label>
                <select 
                  name="city" 
                  id="city"
                  value={ selectedCity }
                  onChange={ handleSelectCity }
                >
                  <option value="0">Selecione uma cidade</option>

                  { cities.map( city => (
                    <option key={ city } value={city}>{ city }</option>
                  ) ) }

                </select>
              </div>

            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Ítens de Coleta</h2>
              <span>Selecione um ou mais ítens abaixo</span>
            </legend>

            <ul className="items-grid">

              { items.map( item => (
                <li 
                  key={ String( item.id ) }
                  onClick={ () => handleSelectItem( item.id ) }
                  className={ selectedItems.includes( item.id ) ? 'selected' : '' }
                >
                  <img src={ item.image_url } alt={ item.title } title={ item.title }/>
                  <span>{ item.title }</span>
                </li>
              ) ) }

            </ul>
          </fieldset>

          <button type="submit">
            Cadastrar Ponto de Coleta
          </button>
        </form>
      </section>
    </>
  )
}

export default CreatePoint