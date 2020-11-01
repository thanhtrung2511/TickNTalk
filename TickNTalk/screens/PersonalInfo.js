import React, { Component } from 'react'
import { Text,TextInput, View, Dimensions,StyleSheet, TouchableOpacity,FlatList, Image } from 'react-native'
import { SafeAreaView,NavigationContainer } from 'react-native-safe-area-context'
import { EvilIcons } from '@expo/vector-icons';
import styles from '../components/PersonalInFo/Styles'

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

    Change_pass=()=>
    {
      this.props.navigation.navigate("ChangePass")
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
                <TouchableOpacity style={styles.input}  onPress={this.Change_pass}>
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
    