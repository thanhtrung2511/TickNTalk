import React, { Component } from 'react'
import { Image,Text,TextInput, View,TouchableOpacity,SafeAreaView } from 'react-native'
import styles from '../components/SignIn/Styles'
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
        user:null,
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
              <Image style={styles.tinyLogo}
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
              
              <View style={{marginLeft:16,marginTop:32,alignItems:"center"}}>
                <TouchableOpacity style={styles.SignInButton} onPress={this.SignInWithEmailAndPassword} >
                      <Text style={{fontWeight:"700", fontSize:20, color:'white'}}>Đăng nhập</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row',marginTop:32}}> 
                <View style={{width:30,height:1,backgroundColor:'black'}}>
                </View>
                <Text style={{marginTop:-10,fontWeight:"700", fontSize:15, color:'black'}}>Hoặc</Text>
                <View style={{width:30,height:1,backgroundColor:'black'}}>
                </View>
                </View>
                <TouchableOpacity style={styles.SignInButton}>
                      <Text style={{fontWeight:"700", fontSize:20, color:'white'}}>Đăng nhập với Google</Text>
                </TouchableOpacity>
                
              </View>
              <View style={styles.Extra}>
              <Text style={styles.SignUp}>Bạn chưa có tài khoản?</Text>
              <Text style={styles.SignUpText} onPress={this.SignUp}>Đăng ký tại đây</Text>
              </View>
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

