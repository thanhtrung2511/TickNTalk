import React, { Component }from 'react';
import { View, Text,SafeAreaView } from 'react-native';
import 
  {MessageCard,LoginButton,BasicImage,styles}
from '../components/Basic/Basic'
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
          <BasicImage icon="false"
                      source={require('../assets/Logo.png')}/>
          <Text style={styles.header}>TICKnTALK</Text>
          <View style={{ alignItems:'center', paddingVertical:100 }}>
            <LoginButton styleOut={styles.Login_button}
                    styleIn={styles.Login_text}
                    onPress={this.SignIn}
                    Text="Đăng nhập"/>
            <LoginButton onPress={this.SignUp}
                    Text="Đăng ký"/>
          </View>
          <MessageCard 
            ImageSource='https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8'
            Name='Trung'
            LastestChat='aaaaaaaaaaasjdhasjdhasdaaaaaaaaaaaaaaa'
            isRead='false'
            >
          </MessageCard>
        </View>
      </SafeAreaView>
    );
  }
}