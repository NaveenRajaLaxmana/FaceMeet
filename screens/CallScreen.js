import React,{useEffect,useState} from 'react'
import { Text,SafeAreaView,ScrollView,View,Image,TouchableOpacity,ImageBackground,FlatList,Dimensions } from 'react-native'
import style from '../style'
import Iconicons from 'react-native-vector-icons/Ionicons'
import MAI from 'react-native-vector-icons/MaterialIcons'
import FA from 'react-native-vector-icons/FontAwesome'
import {useNavigation} from '@react-navigation/native'
import RtcEngine,{RtcLocalView,RtcRemoteView,VideoRenderMode} from 'react-native-agora';

const img10 = require('../assets/images/img10.jpg')

const img1 = require('../assets/images/img1.jpg')
const img2 = require('../assets/images/img6.jpg')
const img3 = require('../assets/images/img8.jpg')

const profilephoto = require('../assets/images/img3.jpg')
var uid = String(Math.floor(Math.random()  * 10000))
const APP_ID = "8fe2172f003741ebacf7f6d3ac87a5e7"
let rtcEngine

const dimensions = {
  width:Dimensions.get('window').width,
  height:Dimensions.get('window').height
}

const peers = []

const CallScreen = ({route}) => {
    const navigate = useNavigation()
    const CHANNELNAME = route.params?.channelname || 'channel'
    const [isjoined,setisJoined] = useState(false)
    const [audio,setAudio] = useState(true)
    const [video,setVideo] = useState(true)
    const [duration,setduration] = useState('')

    const createRtcEngine = async () => {
    //     if (Platform.OS === 'android') {
    //       requestCameraAndAudioPermission().then(() => {
    //           console.log('requested!')
    //       })
    //   }
         rtcEngine = await RtcEngine.create(APP_ID)
      await  rtcEngine.enableVideo()
      await rtcEngine.enableAudio()
      startCall()
      
    //    await startCall()
        rtcEngine.addListener('UserJoined',(uid,elapsed) => {
          setisJoined(true)
          console.log('remote User Joined',uid,elapsed)
          peers.push(uid)
        })
    
        rtcEngine.addListener('UserOffline',(uid,reason) => {
          console.log('User Offline',uid,reason)
          
        })
        rtcEngine.addListener('JoinChannelSuccess',(channel,uid,elapsed) => {
          console.log('local User Joined',channel,uid,elapsed)
          setisJoined(true)
        })
        rtcEngine.addListener('RtcStats',(RtcStats) => {
          setduration(RtcStats.duration)
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

     

const localview = () =>{
  return (
    <RtcLocalView.SurfaceView
                      style={{height:dimensions.height-10,width:dimensions.width}}
                      channelId={CHANNELNAME}
                      renderMode={VideoRenderMode.Hidden}
                      />
  )
}

const audiotoggle = async() =>{
  setAudio(!audio)
  await rtcEngine.enableLocalAudio(audio)
}

const videoToggle = async () => {
  setVideo(!video)
  await rtcEngine.enableLocalVideo(video)
}

    useEffect(() => {
        createRtcEngine()
    },[])
    const callEnd = async() => {
        // navigate.navigate('home')
      await endCall()
    }
  return (
    <SafeAreaView>
        <ScrollView style={style.callscreenscrollview}>
        <ImageBackground source={img3} style={[style.callscreenFullview,{height:dimensions.height}]}>
        {isjoined && !video && localview()}
                
                <TouchableOpacity style={style.callscreenvolume}>
                    <Iconicons name='volume-medium' size={20} color={'#67667b'}/>
                    <Iconicons name='volume-mute' style={{display:'none'}} size={20} color={'#67667b'}/>
                </TouchableOpacity>

                {/* channel name */}
                 <View style={style.callscreenchannelname}>
                     <Text style={style.fontMedium}>{CHANNELNAME}</Text>
                     {isjoined &&  <Text style={style.fontLight}>{duration}</Text>}
                 </View>

                 <View style={style.callscreenOptions}>
                     <TouchableOpacity style={style.callscreencallEnd} onPress={callEnd}>
                         <MAI name='call-end' size={20} color={'#ffffff'}/>
                     </TouchableOpacity>

                     <View style={style.callscreenflexbutton}>
                         <TouchableOpacity style={style.callscreenbuttonbg}>
                             <FA name='camera' size={20} color={'#ffffff'}/>
                         </TouchableOpacity>
                         <TouchableOpacity style={style.callscreenbuttonbg} onPress={videoToggle}>
                             {video &&  <FA name='video-camera' size={20} color={'#ffffff'}/>}
                             {!video && <MAI name='videocam-off' size={20} color={'#ffffff'}/>}
                         </TouchableOpacity>
                         <TouchableOpacity style={style.callscreenbuttonbg} onPress={audiotoggle}>
                             {audio && <FA name='microphone' size={20} color={'#ffffff'}/>}
                             {!audio && <FA name='microphone-slash' size={20} color={'#ffffff'}/>}
                         </TouchableOpacity>
                     </View>
                 </View>


               {/* remote viewers */}
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{justifyContent:'space-around'}} style={style.remoteviewersection}>
                {/* <RtcRemoteView.SurfaceView
                      style={{height:dimensions.height * 0.1,width:dimensions.width * 0.2}}
                      uid={uid}
                      channelId={CHANNELNAME}
                      renderMode={VideoRenderMode.Hidden}
                      zOrderMediaOverlay={true}/> */}
                      {peers.length > 0 && <RtcRemoteView.SurfaceView
                      style={{height:dimensions.height * 0.1,width:dimensions.width * 0.2}}
                      uid={peers[0]}
                      channelId={CHANNELNAME}
                      renderMode={VideoRenderMode.Hidden}
                      zOrderMediaOverlay={true}/>}
                       
         
                </ScrollView>
             </ImageBackground>
        </ScrollView>
    </SafeAreaView>
  )
}

// {/* <ImageBackground source={img3} style={[style.callscreenFullview]}>
                
// <TouchableOpacity style={style.callscreenvolume}>
//     <Iconicons name='volume-medium' size={20} color={'#67667b'}/>
//     <Iconicons name='volume-mute' style={{display:'none'}} size={20} color={'#67667b'}/>
// </TouchableOpacity>

// {/* channel name */}
  {/* <View style={style.callscreenchannelname}>
      <Text style={style.fontMedium}>{route.params?.channelname}</Text>
  </View>

  <View style={style.callscreenOptions}>
     <TouchableOpacity style={style.callscreencallEnd} onPress={callEnd}>
          <MAI name='call-end' size={20} color={'#ffffff'}/>
      </TouchableOpacity>

      <View style={style.callscreenflexbutton}>
          <TouchableOpacity style={style.callscreenbuttonbg}>
              <FA name='camera' size={20} color={'#ffffff'}/>
          </TouchableOpacity>
          <TouchableOpacity style={style.callscreenbuttonbg}>
              <FA name='video-camera' size={20} color={'#ffffff'}/>
          </TouchableOpacity>
          <TouchableOpacity style={style.callscreenbuttonbg}>
            <FA name='microphone' size={20} color={'#ffffff'}/>
         </TouchableOpacity>
      </View>
  </View> */}


 {/* remote viewers */}
{/* // <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{justifyContent:'space-around'}} style={style.remoteviewersection}>
        <ImageBackground source={img1} style={style.remoteviewbox}>
          <Text style={[style.remoteviewboxname]}>Krishna</Text>
      </ImageBackground>

      <ImageBackground source={img2} style={style.remoteviewbox}>
          <Text style={[style.remoteviewboxname]}>Krishna</Text>
      </ImageBackground>

      <ImageBackground source={img3} style={style.remoteviewbox}>
          <Text style={[style.remoteviewboxname]}>Krishna</Text>
     </ImageBackground>

      <ImageBackground source={profilephoto} style={style.remoteviewbox}>
          <Text style={[style.remoteviewboxname]}>Krishna</Text>
     </ImageBackground>
// </ScrollView>
// </ImageBackground>  */} 

export default CallScreen