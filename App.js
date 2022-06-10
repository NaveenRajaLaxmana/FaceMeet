/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect} from 'react';

import {
  SafeAreaView,
 
  Text,
  View
} from 'react-native';



import PushNotification  from 'react-native-push-notification';
import tw from 'twrnc';




const App = () => {
  const notifyChannel = () =>{
    PushNotification.createChannel({
      channelId:"text",
      channelName:"text-channel"
    })
  }
  useEffect(() => {
    notifyChannel()
  })
  return (
    <SafeAreaView>
      <View style={tw`h-screen`}>
        <Text></Text>
      </View>
    </SafeAreaView>
  )
};



export default App;
