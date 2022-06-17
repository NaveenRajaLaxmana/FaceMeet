import React from 'react'
import tw , { useDeviceContext } from 'twrnc';
import CallScreen from './screens/CallScreen';
import HomePage from './screens/HomePage';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Trial from './Trial';

const Stack = createNativeStackNavigator()

const App = () => {
    useDeviceContext(tw)
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home' screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name='home' component={HomePage}/>
        <Stack.Screen name='call' component={CallScreen}/>
      </Stack.Navigator>
    
    </NavigationContainer>
    // <Trial />
  )
}

export default App