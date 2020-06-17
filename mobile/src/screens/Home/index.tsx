import React from 'react'
import { View, Image } from 'react-native'

import styles from './style'

const Home: React.FC = () => {
  return (
    <View>
      <Image source={ require( './../../assets/logo.png' ) }/>
    </View>
  )
}

export default Home