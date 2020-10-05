import React, { Component } from 'react'
import { Text,TextInput, View, Dimensions,StyleSheet, TouchableOpacity,FlatList, Image } from 'react-native'
import { SafeAreaView,NavigationContainer } from 'react-native-safe-area-context'
import { EvilIcons } from '@expo/vector-icons';

export default class ChatFeed extends React.Component {
    
    state={
        username:"Phương Vy",
        password:"",
        repassword:"",
        Email:""
    }
    EditInfo=()=>
    {
      
    }
    LogOut=()=>
    {
      this.props.navigation.navigate("Login")
    }
    render() {
        return (
          <SafeAreaView style={styles.container}>
              <Text style={styles.header}>Thông tin cá nhân</Text>                        
              <View style={{marginLeft:32,marginTop:16,flexDirection:'column'}} justifyContent="center">
                <View style={{flexDirection:'row',marginLeft:-32,padding:64,backgroundColor:'white', borderRadius:70/5}}>
                  <Image style={styles.tinyLogo}
                        source={require('../assets/a.png')}/>
                  <View style={{marginLeft:16, marginTop:16,flexDirection:'column'}}>
                    <Text style={{fontWeight:'800'}}>Phương Vy</Text>
                    <Text>test@gmail.com</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.input}>
                  <Text style={{marginLeft:16,fontWeight:'700'}}>Cập nhật ảnh đại diện</Text>  
                </TouchableOpacity>
                <TouchableOpacity style={styles.input}>
                  <Text style={{marginLeft:16,fontWeight:'700'}}>Đổi mật khẩu</Text>  
                </TouchableOpacity>
                <TouchableOpacity style={styles.input}>
                  <Text style={{marginLeft:16,fontWeight:'700'}}>Chỉnh sửa thông tin cá nhân</Text>  
                </TouchableOpacity>
                <TouchableOpacity style={styles.input} onPress={this.LogOut}>
                  <Text style={{marginLeft:16,fontWeight:'700'}}>Đăng xuất</Text>  
                </TouchableOpacity> 
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
            backgroundColor:"pink",
            alignItems: 'center'
        },
        ChatBox:{
            width:windowWidth/1.11,
            height:windowHeight/1.11,
            marginLeft:-32,
            backgroundColor: "#FFFF",
            borderRadius:70/5,
        },
        header:{
          fontWeight:"800",
          fontSize:30,
          color:"#FFFFFF",
          
        },
        input:{
            
            height:50,
            marginLeft:-32,
            width:windowWidth/1.11,
            borderColor:"#BAB7C3",
            borderRadius:70/5,
            backgroundColor:"#FFE5D8",
            color: "#514E5A",
            alignItems:"flex-start",
            justifyContent:"center",
            marginTop: 16
            
        },
        tinyLogo:{
          width:150,
          height:150,
          borderRadius:70/0.5,
          backgroundColor:"#9075E3",
          alignItems:"center",
          justifyContent:"center",
          marginTop: -32,
          marginLeft:-32,
        },
        hello:{
          fontWeight:"800",
          fontSize:16,
          color:"#9B9B9B",
          marginTop:windowHeight/8,
          marginLeft:32,
        },
        SignInText:{
          
          marginLeft:10,
          color: "#120C6E",
        },
        SignIn:{
          
          color: "#9B9B9B",
        },
        Extra:{
            marginTop:16,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }
    });
