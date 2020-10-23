import React from 'react';
import { View, Text, TouchableOpacity, Image,SafeAreaView } from 'react-native';
import styles from '../components/Login/Styles'

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