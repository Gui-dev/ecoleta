import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './../screens/Home'
import Points from './../screens/Points'
import Detail from './../screens/Detail'

const Routes: React.FC = () => {

  const Stack = createStackNavigator()

  return (
    <Stack.Navigator 
      headerMode="none"
      screenOptions={ {
        cardStyle: {
          backgroundColor: '#F0F0F5' 
        }
      } }
    >
      <Stack.Screen 
        name="Home" 
        component={ Home } 
      />
      <Stack.Screen name="Points" component={ Points }/>
      <Stack.Screen name="Detail" component={ Detail }/>
    </Stack.Navigator>
  )
}

export default Routes