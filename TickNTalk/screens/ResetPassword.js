import React from 'react';
import {
  Text,
  TextInput,
  View,Alert,
  KeyboardAvoidingView,SafeAreaView, 
} from 'react-native';


import firebase from 'firebase';
import {ButtonMod,styles,colors,createOneButtonAlert} from '../components/Basic/Basic'

export default class ResetPassword extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor (props) {
    super (props);
    this.state = {
        currentEmail: '',
    };
  }


  Change_pass = () => {
    if (!this.state.currentEmail) {
        Alert.alert('Thông báo','Vui lòng điền đầy đủ thông tin',{text:'Đồng ý', style: 'cancel'})
    }
    firebase.auth().sendPasswordResetEmail(this.state.currentEmail)
      .then(function (user) {
        Alert.alert('Thông báo','Kiểm tra email đã đăng ký',{text:'Đồng ý', style: 'cancel',onPress:()=> this.props.navigation.goBack()})
      }).catch(function (e) {
        //console.log(e)
      })
  };

  render () {
    return (
      <SafeAreaView style={styles.containerLI}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={{ backgroundColor: colors.lightpink,width:"100%",alignItems:"center" }}>
          <View
            style={{ width: "90%" }}
            justifyContent="space-between"
            flexDirection="row"
          >
            <Text style={styles.header}>Khôi phục mật khẩu</Text>
          </View>
          </View>
        <View
          style={{ marginTop: 16, flexDirection: 'column'}}
          justifyContent="space-between"
          alignItems="center"
        >
          
          <TextInput
            style={styles.input}
            textAlign="left"
            keyboardType="email-address"
            placeholder="Nhập email khôi phục (email đăng nhập)"
            onChangeText={currentEmail => {
              this.setState ({currentEmail});
              
            }}
            value={this.state.currentEmail}
          />
          <ButtonMod styleContainer={{marginTop:32}} onPress={this.Change_pass} Text="Xác nhận"/>
        </View>

        
      </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
