import React, { Component } from 'react'
import {Text,TextInput, View,SafeAreaView,KeyboardAvoidingView,ScrollView } from 'react-native'
import {Button,styles,BasicImage,LoginBottom,sizeFactor} from '../components/Basic/Basic'
import firebase from 'firebase'
import {ChangeEmailAction, ChangeLoginStatus} from '../actions/index'
import {connect} from 'react-redux'
 
export class SignInScreen extends React.Component {
    constructor(props){
      super(props);
      this.unsubscriber=null;
      this.state={
        //isAuthenticated:false,
        typedPassword:'',
        //user:null,
        showError: false
      };
    }
    SignInWithEmailAndPassword=()=>{
      firebase.auth().signInWithEmailAndPassword(this.props.typedEmail,this.state.typedPassword)
      .then((loggedInUser)=>
      {
          this.SignInContinue();
      })
      .catch((error)=>{
        this.setState({showError: true})
      })
    }
    SignInWithGoogle=()=>{}
    SignInContinue=() =>
    {
      this.props.UpdateIsLogin(true);
      this.props.navigation.replace('Dashboard');
    }
    SignUp=()=>
    {
      this.props.navigation.replace("SignUp")
    }
    componentDidMount=()=>{
      this.props.UpdateIsLogin(false);
    }
    render() {
        return (
          <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={{alignItems:"center"}}>
                
                <BasicImage icon='false'
                        source={require('../assets/Logo.png')}/>
                <Text style={styles.hello}>Đăng nhập tài khoản của bạn</Text>
                <View style={{alignItems:'center'}} justifyContent="center">
                <TextInput style={styles.input}
                      placeholder="Tên tài khoản"
                      keyboardType="email-address"
                      onChangeText={(Email)=>{
                        this.props.Update(Email);
                        this.setState({showError:false, typedPassword:''})
                      }}
                      value={this.props.typedEmail}/>
                <TextInput style={styles.input} 
                      secureTextEntry={true}
                      placeholder="Mật khẩu"
                      onChangeText={(typedPassword)=>{
                        this.setState({typedPassword});
                        this.setState({showError:false})
                      }}
                      value={this.state.password}/>
                <Text style={{color:'red'}} >
                 { this.state.showError ?
                  "Tên tài khoản hoặc mật khẩu không đúng.": " "
                 }
                </Text>
                <Text style={styles.FogetPassword}>Quên mật khẩu?</Text>
                
              </View>
              <View style={{marginTop: sizeFactor*5.1}}>
              <LoginBottom OnPressNormal={this.SignInWithEmailAndPassword}
                           OnPressGoogle={this.SignInWithGoogle}
                           TextNormal="Đăng nhập"
                           TextGoogle="Đăng nhập với Google"
                           TextStatic="Bạn chưa có tài khoản?"
                           TextNav="Đăng ký tại đây"
                           Sign={this.SignUp}
              />
              </View>
            </View>
          </KeyboardAvoidingView>
          </SafeAreaView>
        );
      }
}
const mapStateToProps = (state) => {
  return{
      typedEmail: state.emailReducer,
      isLogin: state.isLogin
  }
};

const mapDispatchToProps = (dispatch) =>{
  return {
      Update: (typedEmail) => {
        dispatch(ChangeEmailAction(typedEmail));
      },
      UpdateIsLogin: (login) => {
        dispatch(ChangeLoginStatus(login));
      }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

