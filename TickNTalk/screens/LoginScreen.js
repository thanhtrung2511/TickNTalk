import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions,SafeAreaView } from 'react-native';
import {Ionicons} from '@expo/vector-icons'


export default class ChatScreen extends React.Component {
  state={

  }
  SignIn=() =>
  {
    this.props.navigation.navigate("SignIn")
  }
  SignUp=()=>
  {
    this.props.navigation.navigate("SignUp")
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{alignItems:"center"}}>
          <Image style={styles.tinyLogo}
                        source={require('../assets/Logo.png')}/>
          <Text style={styles.header}>TICKnTALK</Text>
          <View style={{ alignItems:'center', paddingVertical:100 }}>
            <TouchableOpacity style={styles.SignInButton} onPress={this.SignIn}>
                  <Text style={{fontSize:30, fontWeight:'700',color:"#FFFFFF"}} >Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.SignUpButton} onPress={this.SignUp}>
                  <Text style={{fontSize:30, fontWeight:'700',color:"#FFFFFF"}}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const windowWidth=Dimensions.get('window').width;
const windowHeight=Dimensions.get('window').height;
const styles= StyleSheet.create({
    container:{ 
        flex:1,
        backgroundColor:"#FFFFFF"
    },
    header:{
      fontWeight:"800",
      fontSize:30,
      color:"#000",
      fontFamily:'Thonburi',
      fontStyle:"italic",
      marginHorizontal:windowWidth/4
    },
    input:{
        marginTop:15,
        height:50,
        borderStyle:StyleSheet.solid,
        borderColor:"#BAB7C3",
        borderRadius:30,
        paddingHorizontal: 16,
        color: "#514E5A",
        fontWeight:"600"
    },
    SignInButton:{
      width:300,
      height:70,
      borderRadius:70/2,
      backgroundColor:"lightpink",
      alignItems:"center",
      justifyContent:"center",
    },
    SignUpButton:{
      width:300,
      height:70,
      borderRadius:70/2,
      backgroundColor:"lightpink",
      alignItems:"center",
      justifyContent:"center",
      marginTop: 32,
    },
    tinyLogo:{
      width:300,
      height:300,
      alignItems:"center",
      justifyContent:"center",
    },
});