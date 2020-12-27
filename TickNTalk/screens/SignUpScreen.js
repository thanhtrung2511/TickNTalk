import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import {UserRef} from '../Fire';
import {styles, BasicImage, LoginBottom} from '../components/Basic/Basic';

export default class SignUpScreen extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      typedPassword: '',
      typedRepassword: '',
      typedEmail: '',
      typedPhone: '',
      typedName: '',
      user: null,
      showError: ' ',
      canCreateAccount: false,
      SignUpColor: 'red',
    };
  }

  SignIn = () => {
    //this.ResetFields ();
    this.props.navigation.navigate ('SignUpCont');
  };

  ResetFields = () => {
    this.setState ({
      typedPassword: '',
      typedRepassword: '',
      typedEmail: '',
      user: null,
      showError: ' ',
      canCreateAccount: false,
      SignUpColor: 'red',
      //typedBirthday:'09/01/1997',
    });
  };

  AddUserToDatabase = () => {
    UserRef.push ({
      Name: '',
      Phone: '',
      Email: this.state.typedEmail,
      Gender: '',
      Birthday: '',
      urlAva: '',
    });
    this.SignIn ();
  };

  SignUpWithEmailAndPassword = () => {
    firebase
      .auth ()
      .createUserWithEmailAndPassword (
        this.state.typedEmail,
        this.state.typedPassword
      )
      .then (resp => {
        this.setState ({
          showError: 'Đã tạo tài khoản thành công',
          SignUpColor: 'green',
          user: resp,
        });

        this.AddUserToDatabase ();
      })
      .catch (error => {
        if (error != null)
          this.setState ({showError: `${error}`, SignUpColor: 'red'});
      });
  };
  CheckAccount = () => {
    if (
      this.state.typedEmail != '' &&
      this.state.typedPassword != '' &&
      this.state.typedRepassword != ''
    ) {
      this.state.typedPassword.toString () !==
        this.state.typedRepassword.toString ()
        ? this.setState ({
            showError: 'Mật khẩu nhập lại không khớp',
            SignUpColor: 'red',
            canCreateAccount: false,
          })
        : this.setState ({showError: ' ', canCreateAccount: true});
      console.log (this.state.typedRepassword, this.state.typedPassword);
    } else
      this.setState ({
        showError: 'Lỗi! Chưa điền thông tin đầy đủ',
        SignUpColor: 'red',
      });
    console.log (this.state.canCreateAccount);
    if (this.state.canCreateAccount) {
      this.SignUpWithEmailAndPassword ();
    }
  };
  render () {
    return (
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-40}>
        <SafeAreaView style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <ScrollView>
              <View style={{alignItems: 'center'}} justifyContent="center">
              <BasicImage icon='false'
                        source={require('../assets/Logo.png')}/>
                <Text style={styles.hello}>Đăng ký tài khoản mới</Text>

                <TextInput
                  style={styles.input}
                  secureTextEntry={false}
                  keyboardType="email-address"
                  placeholder="Email"
                  onChangeText={typedEmail => {
                    this.setState ({typedEmail});
                  }}
                  value={this.state.typedEmail}
                />
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="Mật khẩu"
                  onChangeText={typedPassword => {
                    this.setState ({typedPassword});
                    this.setState ({showError: ' '});
                  }}
                  value={this.state.typedPassword}
                />

                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="Nhập lại mật khẩu"
                  onChangeText={typedRepassword => {
                    this.setState ({typedRepassword});
                    this.setState ({showError: ' '});
                  }}
                  value={this.state.typedRepassword}
                />

                <Text style={{color: this.state.SignUpColor}}>
                  {this.state.showError}
                </Text>
              </View>
              <View style={{marginTop: 32, alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.SignUpButton}
                  onPress={this.CheckAccount}
                />

                <LoginBottom
                  OnPressNormal={this.SignUpWithEmailAndPassword}
                  OnPressGoogle={this.SignUpWithGoogle}
                  TextNormal="Tiếp tục"
                  TextGoogle="Đăng ký với Google"
                  TextStatic="Bạn đã có tài khoản?"
                  TextNav="Đăng nhập tại đây"
                  Sign={this.SignIn}
                />
              </View>
            </ScrollView>
          </View>

        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
