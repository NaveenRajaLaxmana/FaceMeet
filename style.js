import {Dimensions,StyleSheet} from 'react-native'
import tw from 'twrnc';
const dimensions = {
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height
}

export default StyleSheet.create({
    fontRegular:{
        fontFamily:'Inter-SemiBold',
        fontSize:20,
        color:'white'
    },
    fontLight:{
        fontFamily:'Inter-Light',
        fontSize:14,
        color:'white'
    },
    fontMedium:{
        fontFamily:'Inter-Medium',
        fontSize:14,
        color:'white'
    },
    scrollview:tw`bg-[#191e28] h-full flex flex-col`,
    banner:tw `w-screen py-2 px-5 flex-row justify-between items-center`,
    profilePhoto: tw`h-[45px] w-[45px] rounded-full`,
    profileImage: tw`h-full w-full object-cover rounded-full`,
    linearcolorBorder:tw`p-0.5`,
    newconference: tw `mx-3 my-2 h-[150px] w-11/12 rounded-lg pl-2.1`,
    lineargradientconference:tw`h-full w-full rounded-2xl pl-4 py-6`,
    conferenceButton: tw `px-2 py-2 max-w-[150px] bg-[#37a7ff] rounded-md mt-4`,
    btntext:tw`text-white text-center`,
    profilePhotobig: tw`h-[60px] w-[60px] rounded-full`,
    twoflex: tw`flex flex-row justify-between mx-3 my-2 px-3`,
    boxes:tw`min-h-[100px] max-h-[120px] w-5/12 bg-[#37a7ff] rounded-xl px-4 py-4`,
    previouscallSection:tw`my-4 mx-3 px-3`,
    previouscallbox:tw`px-3 py-2 my-2 flex flex-row justify-between items-center bg-[#4d4344] rounded-xl`,
    profilePhotoSmall: tw`h-[40px] w-[40px] rounded-full`,
    upcomingNotifysection:tw`my-2 mx-3 px-3`,
    notifybox:tw`min-h-[110px] max-h-[120px] w-full rounded-xl bg-[#4d4344] my-2 px-5`,
    notifyboxflex:tw`flex flex-row justify-between`,
    callscreenscrollview: tw`h-full flex flex-col`,
    callscreenFullview:tw `w-full flex relative object-cover`,
    callscreenvolume:tw`absolute top-10 left-5 p-3 bg-[#eaf4ff] rounded-xl`,
    callscreenchannelname:tw`absolute top-10 left-30 p-3`,
    callscreenOptions:tw`absolute top-10 right-5 p-3`,
    callscreencallEnd:tw`absolute right-1 p-3 bg-[#ff644f] rounded-xl`,
    callscreenflexbutton:tw`relative mt-5 left-5 p-3 flex flex-col justify-between items-center`,
    callscreenbuttonbg:tw`mt-5 p-3 bg-[#c4afa5] rounded-xl`,
    remoteviewersection:tw`absolute w-full bottom-30 left-3 p-3 flex flex-row`,
    remoteviewbox:tw`relative min-h-[100px] mr-3 max-h-[120px] min-w-[100px] max-w-[120px] rounded-2xl`,
    remoteviewboxname:tw`absolute left-2 bottom-1 px-1 py-1 bg-[#c4afa5] text-black rounded-lg`
})