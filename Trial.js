/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect,useState} from 'react';

import {
  Platform, ScrollView, Text, TouchableOpacity, View, PermissionsAndroid
} from 'react-native';
import styles from './check';


import PushNotification  from 'react-native-push-notification';
import tw from 'twrnc';
import RtcEngine,{RtcLocalView,RtcRemoteView,VideoRenderMode} from 'react-native-agora';

const APP_ID = "8fe2172f003741ebacf7f6d3ac87a5e7"
const CHANNELNAME = "MAPP"

const requestCameraAndAudioPermission = async () =>{
  try {
      const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ])
      if (
          granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
          && granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
          console.log('You can use the cameras & mic')
      } else {
          console.log('Permission denied')
      }
  } catch (err) {
      console.warn(err)
  }
}
let rtcEngine

const Trial = () => {
  const notifyChannel = () =>{
    PushNotification.createChannel({
      channelId:"text",
      channelName:"text-channel"
    })
  }

  const localnotification = () => {
    PushNotification.localNotification({
      channelId:"text",
      title:'Mapp',
      message:"Its Working"
    })
  }

  var uid = String(Math.floor(Math.random()  * 10000))
  const [isjoined,setisJoined] = useState(false)

  const createRtcEngine = async () => {
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission().then(() => {
          console.log('requested!')
      })
  }
     rtcEngine = await RtcEngine.create(APP_ID)
  await  rtcEngine.enableVideo()

    rtcEngine.addListener('UserJoined',(uid,elapsed) => {
      console.log('remote User Joined',uid,elapsed)

    })

    rtcEngine.addListener('UserOffline',(uid,reason) => {
      console.log('User Offline',uid,reason)
      
    })
    rtcEngine.addListener('JoinChannelSuccess',(channel,uid,elapsed) => {
      console.log('local User Joined',channel,uid,elapsed)
      setisJoined(true)
    })

    rtcEngine.addListener('SnapshotTaken',(channel,uid,filepath,width,height,errCode) =>{
      if(errCode==0){
        console.log('Snapshot success ',channel,uid,filepath,width,height)
      }else{
        console.log('Snapshot failed ',channel,uid,filepath,width,height,errCode)
      }
    })
  }

  const startCall = async () => {
    await rtcEngine.joinChannel(null,CHANNELNAME,null,0)
    console.log('joined channel')
  }

  const endCall = async () => {
    await rtcEngine.leaveChannel()
    console.log('call ended')
    setisJoined(false)
  }

  useEffect(() => {
    notifyChannel()
    createRtcEngine()
  })


  const renderVideos = () => {
    return (
      <View style={styles.fullView}>
                <RtcLocalView.SurfaceView
                    style={styles.max}
                    channelId={CHANNELNAME}
                    renderMode={VideoRenderMode.Hidden}/>
                {/* {renderRemoteVideos()} */}
            </View>
    )
  }

  const capturePhoto = async() => {
   await rtcEngine.takeSnapshot(CHANNELNAME,0,'/storage/emulated/0/Android/data/com.vcall/files/example.jpg')
    
  }

  const renderRemoteVideos = () => {
    return (
      <ScrollView
          style={styles.remoteContainer}
          contentContainerStyle={{paddingHorizontal: 2.5}}
          horizontal={true}>
         
                  <RtcRemoteView.SurfaceView
                      style={styles.remote}
                      uid={uid}
                      channelId={CHANNELNAME}
                      renderMode={VideoRenderMode.Hidden}
                      zOrderMediaOverlay={true}/>
             
      </ScrollView>
  )
  }

  const startscreenShare = async() => {
    await rtcEngine.startScreenCapture({
      captureVideo:true
    })
  }

  const stopscreenShare = async() => {
    await rtcEngine.stopScreenCapture()
  }

  const schedulelocalnotification = () => {
    PushNotification.localNotificationSchedule({
      channelId:"text",
      title:"Schedule",
      message:"5 sec",
      date: new Date(Date.now() + 5 *1000),
      allowWhileIdle: true,
      repeatTime:1
    })
  }

  return (
    <ScrollView style={styles.max}>
                <View style={styles.max}>
                    <View style={styles.buttonHolder}>
                        <TouchableOpacity
                            onPress={startCall}
                            style={styles.button}>
                            <Text style={styles.buttonText}> Start Call </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={endCall}
                            style={styles.button}>
                            <Text style={styles.buttonText}> End Call </Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            onPress={capturePhoto}
                            style={styles.button}>
                            <Text style={styles.buttonText}> Capture </Text>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity
                            onPress={startscreenShare}
                            style={styles.button}>
                            <Text style={styles.buttonText}> start Share </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={stopscreenShare}
                            style={styles.button}>
                            <Text style={styles.buttonText}> stop Share </Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={localnotification}
                            style={styles.button}>
                            <Text style={styles.buttonText}> Notify </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={schedulelocalnotification}
                            style={styles.button}>
                            <Text style={styles.buttonText}> 5sec </Text>
                        </TouchableOpacity>
                    </View>
                    {isjoined &&  renderVideos()}
                </View>
            </ScrollView>
  )
};



export default Trial;
