import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './../screens/Home'

const Routes: React.FC = () => {

  const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={ Home } 
        options={ {
          headerShown: false,
        } }
      />
    </Stack.Navigator>
  )
}

export default Routes