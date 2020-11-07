import React, { Component }from 'react';
import { View, Text, TouchableOpacity, Image,SafeAreaView } from 'react-native';
import styles from '../components/Login/Styles'
import MessageCard from '../components/MessageCard/MessageCard'
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
          <MessageCard 
            ImageSource='https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8'
            Name='Trung'
            LastestChat='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
            >
          </MessageCard>
        </View>
      </SafeAreaView>
    );
  }
}