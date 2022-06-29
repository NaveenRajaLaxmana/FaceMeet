import React,{useState,useEffect} from 'react'
import { Text,SafeAreaView,ScrollView,View,Image,TouchableOpacity,PermissionsAndroid } from 'react-native'
import tw  from 'twrnc';
import style from '../style'
import LinearGradient from 'react-native-linear-gradient';
import Iconicons from 'react-native-vector-icons/Ionicons'
import McI from 'react-native-vector-icons/MaterialCommunityIcons'
import Modals from './Modal';
import {useNavigation} from '@react-navigation/native'
import ScheduleMeeting from './ScheduleMeeting';
import PushNotification  from 'react-native-push-notification';
import GetnameModal from './GetnameModal';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


const profilephoto = require('../assets/images/img3.jpg')
const img1 = require('../assets/images/img1.jpg')
// const profilephoto = {uri:'file:///data/user/0/com.vcall/cache/rn_image_picker_lib_temp_928ffad4-7c9e-4ea6-8ec7-82331b99c858.jpg'}
const img2 = require('../assets/images/img6.jpg')
const img3 = require('../assets/images/img8.jpg')

const HomePage = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [schedulemodalVisible, setscheduleModalVisible] = useState(false);
    const [namemodalVisible, setnameModalVisible] = useState(false);
    const [username,setUsername] = useState('Livia')
    const [isprofile,setisprofile] = useState(false)
    const [profile,setprofile]= useState('')
    const [upcoming,setUpComing] = useState([]);
    const navigation = useNavigation()
    const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
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
      const localnotifyChannel = () =>{
        PushNotification.createChannel({
          channelId:"Vcall",
          channelName:"VcallApp"
        })
      }
      const check = () => {
        PushNotification.localNotification({
            channelId:"Vcall",
            title:"hello",
            message:"hello123",
            allowWhileIdle:true,
        })
      }

      const checkUserDetails = async() => {
        try {
           const val = await AsyncStorage.getItem('username')
           if(val!=null){
            setUsername(val)
            setnameModalVisible(false)
           }else setnameModalVisible(true)
        } catch (error) {
            console.log(error)
        }
      }

      const onProfilePhoto = async() => {
        const result = await launchImageLibrary({
            mediaType:'photo'
        })
       
        if(result.didCancel==undefined){
           try {
            await AsyncStorage.setItem('profile',result.assets[0].uri)
            const val = await AsyncStorage.getItem('profile')
            
            setprofile(val)
           } catch (error) {
            console.log(error)
           }
            setisprofile(true)
        }
        // console.log(result.assets[0].uri)
        
      }

      const checkProfile = async() => {
        try {
            const val = await AsyncStorage.getItem('profile')
            if(val!=null){
                setisprofile(true)
                setprofile(val)
            }else setisprofile(false)
        } catch (error) {
            console.log(error)
        }
      }

      const getAysncStoreNotification = async() => {
        try {
            const keys = await AsyncStorage.getAllKeys()
            if(keys!==null){
                console.log('keys are',keys)
              let news = keys.filter(k => k!=="username")
                if(news.length>0){
                    try {
                        console.log('keys values are ',...news)
                        let val = await AsyncStorage.multiGet([...news])
                        console.log('values are ',...val)
                        let arr=[]
                        for(let i of val){
                            let second = JSON.parse(i[1])
                            arr.push(second)
                        }
                        console.log('arr are',arr)
                        setUpComing(arr)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
      }

    useEffect(() =>{
requestCameraAndAudioPermission()
localnotifyChannel()
// check()
checkUserDetails()
checkProfile()
getAysncStoreNotification()
    },[])

    

    const datetimepick = () => {
        console.log(date.toLocaleDateString())
        return (
            <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          console.log(date.toLocaleDateString())
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
        )
    }
    const upcomingNotification = () => {
       const startAndremoveNotification = async (channelname) => {
            try {
                await AsyncStorage.removeItem(channelname.toString())
            } catch (error) {
                console.log(error)
            }
            const newlist = upcoming.filter(up => up.meetingname != channelname)
            setUpComing(newlist);
            setUpComing([])
            navigation.navigate('call',{channelname})
       }
        return  upcoming.map(notify => {
            return (
                <View style={style.notifybox} key={notify.meetingname}>
                <Text style={style.fontRegular}>{notify.meetingname}</Text>
                <Text style={style.fontLight}>{notify.date}  {notify.time}</Text>

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

                    <TouchableOpacity style={style.conferenceButton} onPress={() => startAndremoveNotification(notify.meetingname)}>
                    <Text style={style.btntext}>Start Call</Text>
                </TouchableOpacity>
                </View>

               
            </View>
            )
        })
        
    }
  return (
    <SafeAreaView>
        <Modals modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        <ScheduleMeeting modalVisible={schedulemodalVisible} setModalVisible={setscheduleModalVisible} setUpComing={setUpComing} getAysncStoreNotification={getAysncStoreNotification}/>
        <GetnameModal namemodalVisible={namemodalVisible} setnameModalVisible={setnameModalVisible} setUsername={setUsername}/>
    {!modalVisible && !schedulemodalVisible &&  !namemodalVisible && <ScrollView style={[style.scrollview,tw.style(modalVisible && 'bg-[#3f485a]')]}>
        {/* banner section */}
        <View style={style.banner}>
            <Text style={[style.fontRegular]}>Hi, <Text style={[style.fontRegular,tw`text-white`]}>{username} 👋</Text></Text>
            <TouchableOpacity style={style.profilePhoto} onPress={() => onProfilePhoto()}>
                <LinearGradient colors={['#d0e0fd', '#b7cbef', '#4d4344','#9ca7bd']} start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}} style={[style.linearcolorBorder,style.profilePhoto]}>
                    <Image source={!isprofile ? profilephoto : {uri:profile}} style={style.profileImage}/>
                </LinearGradient>
            </TouchableOpacity>
        </View>
        {/* new conference */}
        <View style={[style.newconference,{overflow:'hidden'}]}>
           <LinearGradient colors={['#414a5d','#333b4a','#242b37',]} start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}} style={style.lineargradientconference}>
                <Text style={style.fontRegular}>New Conference</Text>
                <Text style={style.fontLight}>Create conference URL</Text>

                <TouchableOpacity style={style.conferenceButton} onPress={() => setModalVisible(true)}>
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
            {/* {datetimepick()} */}
        {/* 2 flex schedule and channel enter */}
        <View style={style.twoflex}>
            <TouchableOpacity style={style.boxes} onPress={() => setModalVisible(true)}>
                <Iconicons name='videocam' size={26} color={'white'}/>
                <Text style={{ color:'white',marginVertical:4 }}>To come in</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.boxes} onPress={() => setscheduleModalVisible(true)}>
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
            {/* added upcoming */}
            {upcoming.length > 0 && upcomingNotification()}
        </View>
    </ScrollView>}
   </SafeAreaView>
  )
}

export default HomePage