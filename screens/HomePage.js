import React,{useState,useEffect} from 'react'
import { Text,SafeAreaView,ScrollView,View,Image,TouchableOpacity,PermissionsAndroid } from 'react-native'
import tw  from 'twrnc';
import style from '../style'
import LinearGradient from 'react-native-linear-gradient';
import Iconicons from 'react-native-vector-icons/Ionicons'
import McI from 'react-native-vector-icons/MaterialCommunityIcons'
import Modals from './Modal';
import {useNavigation} from '@react-navigation/native'

const profilephoto = require('../assets/images/img3.jpg')
const img1 = require('../assets/images/img1.jpg')
const img2 = require('../assets/images/img6.jpg')
const img3 = require('../assets/images/img8.jpg')

const HomePage = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation()
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
    useEffect(() =>{
requestCameraAndAudioPermission()
    },[])
  return (
    <SafeAreaView>
        <Modals modalVisible={modalVisible} setModalVisible={setModalVisible}/>
    {!modalVisible && <ScrollView style={[style.scrollview,tw.style(modalVisible && 'bg-[#3f485a]')]}>
        {/* banner section */}
        <View style={style.banner}>
            <Text style={[style.fontRegular]}>Hi, <Text style={[style.fontRegular,tw`text-white`]}>Livia 👋</Text></Text>
            <View style={style.profilePhoto}>
                <LinearGradient colors={['#d0e0fd', '#b7cbef', '#4d4344','#9ca7bd']} start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}} style={[style.linearcolorBorder,style.profilePhoto]}>
                    <Image source={profilephoto} style={style.profileImage}/>
                </LinearGradient>
            </View>
        </View>
        {/* new conference */}
        <View style={[style.newconference,{overflow:'hidden'}]}>
           <LinearGradient colors={['#414a5d','#333b4a','#242b37',]} start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}} style={style.lineargradientconference}>
                <Text style={style.fontRegular}>New Conference</Text>
                <Text style={style.fontLight}>Create conference URL</Text>

                <TouchableOpacity style={style.conferenceButton}>
                    <Text style={style.btntext}>Start Meeting</Text>
                </TouchableOpacity>

                <View style={[style.profilePhoto,{position:'absolute',right:35,top:10}]}>
                <LinearGradient colors={['#d0e0fd', '#b7cbef', '#4d4344','#9ca7bd']} start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}} style={[style.linearcolorBorder,style.profilePhoto]}>
                    <Image source={img1} style={style.profileImage}/>
                </LinearGradient>
                 </View>

                 <View style={[style.profilePhoto,{position:'absolute',right:-10,top:55}]}>
                <LinearGradient colors={['#d0e0fd', '#b7cbef', '#4d4344','#9ca7bd']} start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}} style={[style.linearcolorBorder,style.profilePhoto]}>
                    <Image source={img2} style={style.profileImage}/>
                </LinearGradient>
                 </View>

                 <View style={[style.profilePhotobig,{position:'absolute',right:35,bottom:-15}]}>
                <LinearGradient colors={['#d0e0fd', '#b7cbef', '#4d4344','#9ca7bd']} start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}} style={[style.linearcolorBorder,style.profilePhoto]}>
                    <Image source={img3} style={style.profileImage}/>
                </LinearGradient>
                 </View>
           </LinearGradient>
        </View>

        {/* 2 flex schedule and channel enter */}
        <View style={style.twoflex}>
            <TouchableOpacity style={style.boxes} onPress={() => setModalVisible(true)}>
                <Iconicons name='videocam' size={26} color={'white'}/>
                <Text style={{ color:'white',marginVertical:4 }}>To come in</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.boxes}>
                <McI name='calendar-month' size={26} color={'white'}/>
                <Text style={{ color:'white',marginVertical:4,flexWrap:'wrap' }}>Schedule meeting</Text>
            </TouchableOpacity>
        </View>

        {/* previous call duration */}

        <View style={style.previouscallSection}>
            <Text style={style.fontRegular}>Previous Call</Text>

            <View style={style.previouscallbox}>
                 <View style={[style.profilePhotoSmall]}>
              
                    <Image source={img3} style={style.profileImage}/>
                
                 </View>
                    <Text style={style.fontLight}>Krishna balram</Text>
                    <McI name='chat-processing-outline' size={26} color={'white'}/>
            </View>

            <View style={style.previouscallbox}>
                 <View style={[style.profilePhotoSmall]}>
              
                    <Image source={img2} style={style.profileImage}/>
                
                 </View>
                    <Text style={style.fontLight}>Radha rukmani</Text>
                    <McI name='chat-processing-outline' size={26} color={'white'}/>
            </View>
        </View>

        {/* notification upcoming */}
        <View style={style.upcomingNotifysection}>
            <Text style={style.fontRegular}>Notification</Text>
            <View style={style.notifybox}>
                <Text style={style.fontRegular}>Team Meeting</Text>
                <Text style={style.fontLight}>Team Meeting</Text>

                <View style={style.notifyboxflex}>
                    <View style={{flexDirection:'row',marginTop:10}}>
                    <View style={[style.profilePhotoSmall]}>
                <LinearGradient colors={['#d0e0fd', '#b7cbef', '#4d4344','#9ca7bd']} start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}} style={[style.linearcolorBorder,style.profilePhoto]}>
                    <Image source={img1} style={style.profileImage}/>
                </LinearGradient>
                 </View>

                 <View style={[style.profilePhotoSmall]}>
                <LinearGradient colors={['#d0e0fd', '#b7cbef', '#4d4344','#9ca7bd']} start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}} style={[style.linearcolorBorder,style.profilePhoto]}>
                    <Image source={img2} style={style.profileImage}/>
                </LinearGradient>
                 </View>

                 <View style={[style.profilePhotoSmall]}>
                <LinearGradient colors={['#d0e0fd', '#b7cbef', '#4d4344','#9ca7bd']} start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}} style={[style.linearcolorBorder,style.profilePhoto]}>
                    <Image source={img3} style={style.profileImage}/>
                </LinearGradient>
                 </View>
                    </View>

                    <TouchableOpacity style={style.conferenceButton}>
                    <Text style={style.btntext}>Start Call</Text>
                </TouchableOpacity>
                </View>

               
            </View>
        </View>
    </ScrollView>}
   </SafeAreaView>
  )
}

export default HomePage