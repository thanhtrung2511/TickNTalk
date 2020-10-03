import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
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
      <View style={styles.container}>
        <View style={styles.circle}></View>
        <View style={{marginHorizontal:32, marginVertical:32}}>
          <Text style={styles.header}>TickNTalk</Text>
          <View style={{marginLeft:32,marginTop:64}}>
            <TouchableOpacity style={styles.SignInButton} onPress={this.SignIn}>
                  <Text color="#000" fontFamily="SegeoUI">Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.SignUpButton} onPress={this.SignUp}>
                  <Text color="#000" fontFamily="SegeoUI">Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const windowWidth=Dimensions.get('window').width;
const windowHeight=Dimensions.get('window').height;
const styles= StyleSheet.create({
    container:{ 
        flex:1,
        backgroundColor:"#Dddddd"
    },
    circle:{
        width:500,
        height:500,
        borderRadius: 500/2,
        backgroundColor: "#99FFFF",
        position: "absolute",
        left:-120,
        top:-20,
    },
    header:{
      fontWeight:"800",
      fontSize:30,
      color:"#000",
      marginTop:windowHeight/8,
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
      height:100,
      borderRadius:70/3,
      backgroundColor:"#9075E3",
      alignItems:"center",
      justifyContent:"center",
      marginTop: 32
    },
    SignUpButton:{
      width:300,
      height:100,
      borderRadius:70/3,
      backgroundColor:"#9075E3",
      alignItems:"center",
      justifyContent:"center",
      marginTop: 32,
    },
});