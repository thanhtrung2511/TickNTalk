import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EvilIcons } from '@expo/vector-icons';
import {Button,styles,MessageCard,BasicImage} from "../components/Basic/Basic"

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
    EditAva=()=>
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
                  <BasicImage style={styles.tinyLogo}
                        source={require('../assets/a.png')}/>
                  <View style={{marginLeft:16, marginTop:16,flexDirection:'column'}}>
                    <Text style={{fontWeight:'800'}}>Phương Vy</Text>
                    <Text>test@gmail.com</Text>
                  </View>
                </View>
                <Button Text="Cập nhật ảnh đại diện"></Button>
                <Button Text="Đổi mật khẩu" onPress={this.Change_pass}></Button>
                <Button Text="Chỉnh sửa thông tin cá nhân" onPress={this.EditInfo}></Button>
                <Button Text="Đăng xuất" onPress={this.LogOut}></Button>
              </View>
          </SafeAreaView>
        );
      }
}
    