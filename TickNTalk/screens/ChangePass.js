import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,SafeAreaView, Alert
} from 'react-native';


import firebase from 'firebase';
import {connect} from 'react-redux';
import {ButtonMod,styles,colors,createOneButtonAlert} from '../components/Basic/Basic'

export class ChangePass extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      Repassword: '',
      showError: ' ',
      SignUpColor: 'red',
    };
  }

  reauthenticate = currentPassword => {
    var user = firebase.auth ().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential (
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential (cred);
  };

  Change_pass = () => {
    if (
      (this.state.newPassword != '') &&
      (this.state.currentPassword != '')&&
      (this.state.Repassword != '')
    ) {
      this.reauthenticate (this.state.currentPassword)
        .then (() => {
          if (
            this.state.newPassword.toString () !=
            this.state.Repassword.toString ()
          ) {
            createOneButtonAlert({ Text:'Mật khẩu nhập lại không khớp',TextAction:"Thử lại"})
            
          } else {
            this.setState ({showError: ' '});
            var user = firebase.auth ().currentUser;
            user
              .updatePassword (this.state.newPassword)
              .then (() => {
                Alert.alert(
                  'Thông báo',
                  'Đổi mật khẩu thành công',
                  [
                    {text: 'Tiếp tục',onPress:()=>this.Continue(), style: 'cancel'},
                  ],
                  { cancelable: false }
                );
              })
              .catch (error => {
                createOneButtonAlert({ Text:'Mật khẩu phải hơn 6 ký tự',TextAction:"Thử lại"})
              });
          }
          //console.log (this.state.Repassword, this.state.currentPassword);
        })
        .catch (error => {
          createOneButtonAlert({ Text:'Mật khẩu cũ không đúng',TextAction:"Thử lại"})
        });
    } else
    createOneButtonAlert({ Text:'Chưa nhập đủ thông tin',TextAction:"Thử lại"})
            
  };

  Continue=() =>
    {
      this.props.navigation.replace("PersonalInfo");
      this.setState({currentPassword: '',
      newPassword: '',
      Repassword: '',});
    }

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
            <Text style={styles.header}>Đổi mật khẩu</Text>
          </View>
          </View>
        <View
          style={{ marginTop: 16, flexDirection: 'column'}}
          justifyContent="space-between"
          alignItems="center"
        >
          
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Nhập mật khẩu cũ"
            onChangeText={currentPassword => {
              this.setState ({currentPassword});
              
            }}
            value={this.state.currentPassword}
          />

          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Nhập mật khẩu mới"
            onChangeText={newPassword => {
              this.setState ({newPassword});
            
            }}
            value={this.state.newPassword}
          />

          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Nhập lại mật khẩu"
            onChangeText={Repassword => {
              this.setState ({Repassword});
             
            }}
            value={this.state.Repassword}
          />
          <ButtonMod styleContainer={{marginTop:32}} onPress={this.Change_pass} Text="Xác nhận"/>
        </View>

        
      </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  return {
    linkedEmail: state.emailReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect (mapStateToProps, mapDispatchToProps) (ChangePass);
