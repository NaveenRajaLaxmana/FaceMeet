import React,{useState,useEffect} from 'react'
import RtcEngine,{RtcLocalView,RtcRemoteView,VideoRenderMode} from 'react-native-agora';
import { Text,SafeAreaView,ScrollView,View,Image,TouchableOpacity,ImageBackground,FlatList,Dimensions,StyleSheet,TextInput,Button } from 'react-native'
const appId = "8fe2172f003741ebacf7f6d3ac87a5e7"
const voicecall = () => {
    let rtcEngine
    const leavechannel = async() => {
        await rtcEngine.leaveChannel()
        setjoin(false)
    }
    const init = async() => {
        rtcEngine  = await RtcEngine.create(appId)
        await rtcEngine.enableAudio()

        rtcEngine.addListener('JoinChannelSuccess',(ch,uid,elap) => {
            setjoin(true)
            rtcEngine.setEnableSpeakerphone(true)
        })
    }
   useEffect(() =>{
    init()
   },[])

   

    const joinChannel = async() => {
        await rtcEngine.joinChannel(null,channel,null,0)
        
        
    }
    const [joinSucceed,setjoin] = useState(false)
    const [channel,settext] = useState('')
  return (
    <View style={styles.container}>
              <View style={styles.top}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => settext(text)}
                  placeholder={'Channel Name'}
                  value={channel}
                />
                <Button
                  onPress={joinSucceed ? leavechannel : joinChannel}
                  title={`${joinSucceed ? 'Leave' : 'Join'} channel`}
                />
              </View>
             
            </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    float: {
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    top: {
      width: '100%',
    },
    input: {
      borderColor: 'gray',
      borderWidth: 1,
    },
  })

export default voicecall