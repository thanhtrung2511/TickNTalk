import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import {UserRef} from '../Fire';
import styles from '../screens/components/signup/Styles';

export default class SignUpScreen extends React.Component {
  constructor(props)
  {
    super(props);
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
  }
  };

  SignIn = () => {
    this.ResetFields ();
    this.props.navigation.navigate ('SignIn');
  };
  ResetFields = () => {
    this.setState ({
      typedPassword: '',
      typedRepassword: '',
      typedEmail: '',
      typedPhone: '',
      typedName: '',
      user: null,
      showError: ' ',
      canCreateAccount: false,
      SignUpColor: 'red',
      //typedBirthday:'09/01/1997',
    });
  };

  AddUserToDatabase=()=>{
      UserRef.push({
        Name:this.state.typedName,
        Phone: this.state.typedPhone,
        Email:this.state.typedEmail,
        Gender:"",
        Birthday:"10/09/2988",
        urlAva:"",
    });
  }

  SignUpWithEmailAndPassword = () => {
    //   firebase.auth().createUserWithEmailAndPassword(
    //   this.state.typedEmail,this.state.typedPassword
    //   ).then(resp => {
    //   return usersRef.doc(resp.user.uid).set({
    //     Name:this.state.typedFullName,
    //     Phone: this.state.typedPhone,
    //     Email:this.state.typedEmail
    //   });
    // }).then(() => {
    //   this.setState({showError: 'Đã tạo tài khoản thành công',SignUpColor:'green',user: loggedInUser});
    // }).catch((err) => {
    //   this.setState({showError: `${error}`,SignUpColor:'red'})
    // });

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
        this.AddUserToDatabase();
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
      this.state.typedRepassword != '' &&
      this.state.typedPhone != '' &&
      this.state.typedName != ''
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
      <SafeAreaView style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <ScrollView>
            <View style={{alignItems: 'center'}} justifyContent="center">
              <Image
                style={styles.tinyLogo}
                source={require ('../assets/Logo.png')}
              />
              <Text style={styles.hello}>Đăng ký tài khoản mới</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={false}
                placeholder="Họ và Tên"
                onChangeText={typedName => {
                  this.setState ({typedName});
                }}
                value={this.state.typedName}
              />
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
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="Số điện thoại"
                onChangeText={typedPhone => {
                  this.setState ({typedPhone});
                  this.setState ({showError: ' '});
                }}
                value={this.state.typedPhone}
              />
              <Text style={{color: this.state.SignUpColor}}>
                {this.state.showError}
              </Text>
            </View>
            <View style={{marginTop: 32, alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.SignUpButton}
                onPress={this.CheckAccount}
              >
                <Text style={{fontWeight: '700', fontSize: 20, color: 'white'}}>
                  Đăng ký
                </Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', marginTop: 32}}>
                <View
                  style={{width: 30, height: 1, backgroundColor: 'black'}}
                />
                <Text
                  style={{
                    marginTop: -10,
                    fontWeight: '700',
                    fontSize: 15,
                    color: 'black',
                  }}
                >
                  Hoặc
                </Text>
                <View
                  style={{width: 30, height: 1, backgroundColor: 'black'}}
                />
              </View>
              <TouchableOpacity style={styles.SignUpButton}>
                <Text style={{fontWeight: '700', fontSize: 20, color: 'white'}}>
                  Đăng ký với Google
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.Extra}>
              <Text style={styles.SignIn}>Bạn đã có tài khoản?</Text>
              <Text style={styles.SignInText} onPress={this.SignIn}>
                Đăng nhập tại đây
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}