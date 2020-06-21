import React, { useEffect, useState } from 'react'
import { Alert, View, ImageBackground, Image, Text, TextInput, 
  KeyboardAvoidingView, Platform, StyleSheet 
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select'

import api from './../../services/api'

interface IBGEUFResponse {
  sigla: string,
}

interface UFProps {
  label: string,
  value: string,
}

interface IBGECityResponse {
  nome: string
}

interface CityProps {
  label: string,
  value: string,
}

const Home: React.FC = () => {

  const navigation = useNavigation()
  const [ ufs, setUfs ] = useState<UFProps[]>( [] )
  const [ selectedUf, setSelectedUf ] = useState( '' )
  const [ cities, setCities ] = useState<CityProps[]>( [] )
  const [ selectedCity, setSelectedCity ] = useState( '' )

  useEffect( () => {
    api.get<IBGEUFResponse[]>( `https://servicodados.ibge.gov.br/api/v1/localidades/estados` )
      .then( response => {
        const uf = response.data.map( selectUfs => {
          return {
            label: selectUfs.sigla,
            value: selectUfs.sigla
          }
        } )
        setUfs( uf )
      } )
  }, [] )

  useEffect( () => {
    api.get<IBGECityResponse[]>( `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios` )
      .then( response => {
        const cityNames = response.data.map( allCities => {
          return {
            label: allCities.nome,
            value: allCities.nome
          }
        } )

        setCities( cityNames )
      } )
  }, [ selectedUf ] )

  const handleNavigationToPoints = () => {

    if( selectedUf === '' || selectedCity === '' ) {
      Alert.alert( 'Ooooops!', "Você tem selecionar um Estado e Cidade" )
      return
    }

    navigation.navigate( 'Points', { uf: selectedUf, city: selectedCity } )
  }

  const handleSelectedUf = ( uf: string ) => {
    if( uf === null ) return 

    setSelectedUf( uf )
  }

  const handleSelecedtCity = ( city: string ) => {
    if( city === null ) return

    setSelectedCity( city )
  }

  return (
    <KeyboardAvoidingView
      style={ { flex: 1 } }
      behavior={ Platform.OS === 'ios' ? 'position' : undefined }
    >
      <ImageBackground 
        source={ require( './../../assets/home-background.png' ) } 
        imageStyle={ { width: 274, height: 368 } }
        style={ styles.container }
      >
        <View style={ styles.main }>
          <Image source={ require( './../../assets/logo.png' ) }/>
          <View>
            <Text style={ styles.title }>Seu market place de coleta de resíduos</Text>
            <Text style={ styles.description }>
              Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
            </Text>
          </View>
        </View>

        <View style={ styles.footer }>

          <RNPickerSelect
            placeholder={ { label: 'Selecione um Estado', value: null } }
            onValueChange={ (value) => handleSelectedUf( value ) }
            items={ufs}
            style={ 
              Platform.OS === 'ios' 
                ? { inputIOS: styles.input }  
                : { inputAndroid: styles.input }
            }
          />

          <RNPickerSelect
            placeholder={ { label: 'Selecione uma Cidade', value: null } }
            onValueChange={ (value) => handleSelecedtCity( value ) }
            items={cities}
            style={ 
              Platform.OS === 'ios' 
                ? { inputIOS: styles.input }  
                : { inputAndroid: styles.input }
            }
          />

          <RectButton style={ styles.button } onPress={ handleNavigationToPoints }> 
            <View style={ styles.buttonIcon }>
              <Icon name="arrow-right" size={ 24 } color="#FFF"/>
            </View>
            <Text style={ styles.buttonText }>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
})


export default Home