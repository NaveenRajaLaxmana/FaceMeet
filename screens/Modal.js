import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,TextInput } from "react-native";
import {useNavigation} from '@react-navigation/native'


const Modals = ({modalVisible,setModalVisible}) => {
    const navigation = useNavigation()
    const [channelname,setChannelName] = useState('')
  const onSubmit = () => {
    if(channelname == '')return
    setModalVisible(!modalVisible)
    navigation.navigate('call',{channelname})
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

export default Modals;