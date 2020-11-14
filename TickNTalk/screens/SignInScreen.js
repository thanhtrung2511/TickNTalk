import React, { Component } from 'react'
import {Text,TextInput, View,SafeAreaView } from 'react-native'
import {Button,styles,BasicImage,LoginBottom} from '../components/Basic/Basic'
import firebase from 'firebase'
import {ChangeEmailAction} from '../actions/index'
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
      this.props.navigation.navigate("Dashboard")
    }
    SignUp=()=>
    {
      this.props.navigation.navigate("SignUp")
    }
    render() {
        return (
          <SafeAreaView style={styles.container}>
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
              
              <LoginBottom OnPressNormal={this.SignInWithEmailAndPassword}
                           OnPressGoogle={this.SignInWithGoogle}
                           TextNormal="Đăng nhập"
                           TextGoogle="Đăng nhập với Google"
                           TextStatic="Bạn chưa có tài khoản?"
                           TextNav="Đăng ký tại đây"
                           Sign={this.SignUp}
              />
            </View>
          </SafeAreaView>
        );
      }
}
const mapStateToProps = (state) => {
  return{
      typedEmail: state.emailReducer,
      
  }
};

const mapDispatchToProps = (dispatch) =>{
  return {
      Update: (typedEmail) => {
        dispatch(ChangeEmailAction(typedEmail));
      }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

