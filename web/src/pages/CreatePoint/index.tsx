import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'

import './CreatePoint.css'
import logo from './../../assets/logo.svg'

const CreatePoint: React.FC = () => {
  return (
    <section id="page-create-point">
      <header>
        <img src={ logo } alt="Ecoleta" title="Ecoleta"/>  
        <Link to="/" title="Voltar para Home">
          <FiArrowLeft />
          Voltar para Home
        </Link>
      </header>

      <form>
        <h1>Cadastro do <br/>ponto de coleta</h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" name="name" id="name"/>
          </div>

          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email"/>
          </div>

          <div className="field">
            <label htmlFor="whatsapp">Whatsapp</label>
            <input type="text" name="whatsapp" id="whatsapp"/>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map 
            center={ [ -23.7833347, -46.6802013 ] }
            zoom={ 15 }
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={ [ -23.7833347, -46.6802013 ] }/>
          </Map>

          <div className="field-group">

            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf">
                <option value="0">Selecione um UF</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city">
                <option value="0">Selecione uma cidade</option>
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

            <li>
              <img src="http://192.168.0.105:3333/uploads/oleo.svg" alt="Teste" title="Teste"/>
              <span>Óleo de Cozinha</span>
            </li>

            <li className="selected">
              <img src="http://192.168.0.105:3333/uploads/oleo.svg" alt="Teste" title="Teste"/>
              <span>Óleo de Cozinha</span>
            </li>

            <li>
              <img src="http://192.168.0.105:3333/uploads/oleo.svg" alt="Teste" title="Teste"/>
              <span>Óleo de Cozinha</span>
            </li>

            <li>
              <img src="http://192.168.0.105:3333/uploads/oleo.svg" alt="Teste" title="Teste"/>
              <span>Óleo de Cozinha</span>
            </li>

            <li>
              <img src="http://192.168.0.105:3333/uploads/oleo.svg" alt="Teste" title="Teste"/>
              <span>Óleo de Cozinha</span>
            </li>

            <li>
              <img src="http://192.168.0.105:3333/uploads/oleo.svg" alt="Teste" title="Teste"/>
              <span>Óleo de Cozinha</span>
            </li>

          </ul>
        </fieldset>

        <button type="submit">
          Cadastrar Ponto de Coleta
        </button>
      </form>
    </section>
  )
}

export default CreatePoint