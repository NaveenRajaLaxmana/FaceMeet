import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,TextInput,ToastAndroid } from "react-native";
import {useNavigation} from '@react-navigation/native'
import DatePicker from 'react-native-date-picker';
import PushNotification from "react-native-push-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ScheduleMeeting = ({modalVisible,setModalVisible,setUpComing,getAysncStoreNotification}) => {
    const navigation = useNavigation()
    const [channelname,setChannelName] = useState('')
    const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const scheduleNotification = (channelname,date) => {
    console.log(date)
    // console.log(new Date(date-Date.now()).toLocaleTimeString())
    PushNotification.localNotificationSchedule({
      channelId:"Vcall",
      title: "Meeting Notification",
      message: String(channelname+" meeting is started"),
      allowWhileIdle:true,
      repeatTime:1,
      date: date
    })
  }

  const setstoreAsyncnotification = async(channel,value) => {
    try {
      const jsonvalue = JSON.stringify(value);
      await AsyncStorage.setItem(channel.toString(),jsonvalue)
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = async() => {
    if(channelname == '')return
    // setUpComing(upcoming => [...upcoming,{meetingname:channelname,date:date.toLocaleDateString(),time:date.toLocaleTimeString()}])
    scheduleNotification(channelname,date)
    const val = {
      meetingname:channelname,
      date:date.toLocaleDateString(),
      time:date.toLocaleTimeString()
    }
    
    await setstoreAsyncnotification(channelname,val)
    await getAysncStoreNotification()
    ToastAndroid.show("Meeting Scheduled",ToastAndroid.SHORT)
    
   
    setModalVisible(!modalVisible)
    navigation.navigate('home')
    setChannelName('')
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Meeting Name</Text>
            <TextInput 
                keyboardType='default'
                style={styles.textinput}
                placeholder="Enter Meeting Name"
                placeholderTextColor={'#646a75'}
                onChangeText={text => setChannelName(text)}
                value={channelname}
            />
            <Pressable
              style={[styles.button, styles.buttonClose,{marginBottom:10}]}
              onPress={() => setOpen(true)}
            >
              <Text style={styles.textStyle}>Date Time</Text>
            </Pressable>
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
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => onSubmit()}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'transparent'
    // marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  textinput:{
    maxHeight:45,
    minWidth:180,
    maxWidth:200,
    paddingLeft:15,
    borderWidth:1,
    borderColor:'black',
    marginBottom:20,
    borderRadius:10
  }
});

export default ScheduleMeeting;