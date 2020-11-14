import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import {
  SafeAreaView,
  NavigationContainer,
} from 'react-native-safe-area-context';
import {EvilIcons} from '@expo/vector-icons';
import firebase from 'firebase';
import {UserRef} from '../Fire';
import {connect} from 'react-redux';
import {Button,styles} from '../components/Basic/Basic'

export class ChangePass extends React.Component {
  static navigationOptions = {
    header: null,
  };

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
      this.state.newPassword != '' &&
      this.state.currentPassword != '' &&
      this.state.Repassword != ''
    ) {
      this.reauthenticate (this.state.currentPassword)
        .then (() => {
          if (
            this.state.newPassword.toString () !=
            this.state.Repassword.toString ()
          ) {
            this.setState ({
              showError: 'Mật khẩu nhập lại không khớp',
              SignUpColor: 'red',
            });
          } else {
            this.setState ({showError: ' '});
            var user = firebase.auth ().currentUser;
            user
              .updatePassword (this.state.newPassword)
              .then (() => {
                this.setState ({showError: 'Đổi mật khẩu thành công'});
                this.setState ({SignUpColor: 'green'});
                this.Continue();
              })
              .catch (error => {
                this.setState ({
                  showError: 'Mật khẩu phải hơn 6 ký tự',
                  SignUpColor: 'red',
                });
              });
          }
          console.log (this.state.Repassword, this.state.currentPassword);
        })
        .catch (error => {
          this.setState ({
            showError: 'Mật khẩu cũ không đúng',
            SignUpColor: 'red',
          });
        });
    } else
      this.setState ({
        showError: 'Lỗi! Chưa điền thông tin đầy đủ',
        SignUpColor: 'red',
      });
  };

  Continue=() =>
    {
      this.props.navigation.navigate("MyInfo")
    }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Đổi mật khẩu</Text>
        <View
          style={{marginLeft: 32, marginTop: 16, flexDirection: 'column'}}
          justifyContent="center"
        >
          <View
            style={{
              flexDirection: 'row',
              marginLeft: -32,
              padding: 64,
              backgroundColor: 'white',
              borderRadius: 70 / 5,
            }}
          >

            <View
              style={{marginLeft: 16, marginTop: 16, flexDirection: 'column'}}
            >
              <Text style={{fontWeight: '800'}}>Phương Vy</Text>
              <Text>test@gmail.com</Text>
            </View>
          </View>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Nhập mật khẩu cũ"
            onChangeText={currentPassword => {
              this.setState ({currentPassword});
              this.setState ({showError: ' '});
            }}
            value={this.state.currentPassword}
          />

          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Nhập mật khẩu mới"
            onChangeText={newPassword => {
              this.setState ({newPassword});
              this.setState ({showError: ' '});
            }}
            value={this.state.newPassword}
          />

          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Nhập lại mật khẩu"
            onChangeText={Repassword => {
              this.setState ({Repassword});
              this.setState ({showError: ' '});
            }}
            value={this.state.Repassword}
          />
          <Text style={{color: this.state.SignUpColor}}>
            {this.state.showError}
          </Text>
        </View>

        <Button onPress={this.Change_pass} Text="Xác nhận"/>
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
