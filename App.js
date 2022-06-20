import React from 'react'
import tw , { useDeviceContext } from 'twrnc';
import CallScreen from './screens/CallScreen';
import HomePage from './screens/HomePage';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Trial from './Trial';
import Voicecall from './screens/voicecall';

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
    // <Voicecall />
    // <Trial />
  )
}

export default App