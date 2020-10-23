import React, { Component } from 'react'
import { Image,SafeAreaView,Text,TextInput, View,ScrollView, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import {UserRef} from '../Fire'
import styles from '../components/SignUp/Styles'

export default class SignUpScreen extends React.Component {
    state={
        typedPassword:"",
        typedRepassword:"",
        typedEmail:"",
        typedPhone:"",
        typedFullName:"",
        user:null,
        showError:' ',
        canCreateAccount:false,
        SignUpColor:'red',
    }
    AddUserToDatabase=()=>{
        var UserName
    }
    SignIn=()=>
    {
      this.props.navigation.navigate("SignIn")
    }
  
   
    SignUpWithEmailAndPassword=()=>{
      
      firebase.auth().createUserWithEmailAndPassword(this.state.typedEmail,this.state.typedPassword)
      .then((loggedInUser)=>
      {
        this.setState({showError: 'Đã tạo tài khoản thành công'});
        this.setState({SignUpColor:'green'})
        this.setState({user: loggedInUser});
        UserRef.push({
          fullName:this.state.typedFullName,
          Phone: this.state.typedPhone,
          Email:this.state.typedEmail,
      });
      })
      .catch((error)=>{
        if (error !=null)
        this.setState({showError: `${error}`,SignUpColor:'red'})
      })
      
    }
    CheckAccount=()=>
    {
      if (this.state.typedEmail != "" && this.state.typedPassword != "" && 
          this.state.typedRepassword!="" && this.state.typedPhone!="" && this.state.typedFullName!="")
      {
        this.state.typedPassword.toString() != this.state.typedRepassword.toString() ?             
          this.setState(
            {showError: "Mật khẩu nhập lại không khớp",SignUpColor:'red',canCreateAccount:false}
          )
        : this.setState({showError : ' ',canCreateAccount:true});
        console.log(this.state.typedRepassword, this.state.typedPassword);
      }
      else  this.setState({showError: 'Lỗi! Chưa điền thông tin đầy đủ',SignUpColor:'red'})
      console.log(this.state.canCreateAccount)
      if (this.state.canCreateAccount)
        {
          this.SignUpWithEmailAndPassword();
        }
    }
    render() {
        return (
          <SafeAreaView style={styles.container}>
          <View style={{alignItems:'center'}}>
              <ScrollView>
              <View style={{alignItems:"center"}} justifyContent="center">
              <Image style={styles.tinyLogo}
                        source={require('../assets/Logo.png')}/>
              <Text style={styles.hello}>Đăng ký tài khoản mới</Text>
                  <TextInput style={styles.input} 
                        secureTextEntry={false}
                        placeholder="Họ và Tên"
                        onChangeText={typedFullName=>{
                          this.setState({typedFullName});
                        }}
                        value={this.state.typedFullName}/>
                  <TextInput style={styles.input} 
                        secureTextEntry={false}
                        keyboardType='email-address'
                        placeholder="Email"
                        onChangeText={typedEmail=>{
                          this.setState({typedEmail});
                        }}
                        value={this.state.typedEmail}/>  
                  <TextInput style={styles.input} 
                        secureTextEntry={true}
                        placeholder="Mật khẩu"
                        
                        onChangeText={typedPassword=>{
                          this.setState({typedPassword});
                          this.setState({showError: ' '})
                        }}
                        value={this.state.typedPassword}/>
                        
                  <TextInput style={styles.input} 
                        secureTextEntry={true}
                      placeholder="Nhập lại mật khẩu"               
                      onChangeText={typedRepassword=>{
                        this.setState({typedRepassword});
                        this.setState({showError: ' '})
                      }}

                      value={this.state.typedRepassword}/>
                  <TextInput style={styles.input} 
                        
                        keyboardType="phone-pad"
                      placeholder="Số điện thoại"
                      onChangeText={typedPhone=>{
                        this.setState({typedPhone});
                        this.setState({showError: ' '})
                      }}
                      value={this.state.typedPhone}/>
                <Text style={{color:this.state.SignUpColor}} >
                 { this.state.showError }
                </Text>
              </View>
              <View style={{marginTop:32,alignItems:'center'}}>
                <TouchableOpacity style={styles.SignUpButton}  onPress={this.CheckAccount}>
                      <Text style={{fontWeight:"700", fontSize:20, color:'white'}}>Đăng ký</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row',marginTop:32}}> 
                <View style={{width:30,height:1,backgroundColor:'black'}}>
                </View>
                <Text style={{marginTop:-10,fontWeight:"700", fontSize:15, color:'black'}}>Hoặc</Text>
                <View style={{width:30,height:1,backgroundColor:'black'}}>
                </View>
                </View>
                <TouchableOpacity style={styles.SignUpButton}>
                      <Text style={{fontWeight:"700", fontSize:20, color:'white'}}>Đăng ký với Google</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.Extra}>
                <Text style={styles.SignIn}>Bạn đã có tài khoản?</Text>
                <Text style={styles.SignInText} onPress={this.SignIn}>Đăng nhập tại đây</Text>
              </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        );
      }
}
    