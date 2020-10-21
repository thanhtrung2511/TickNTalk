import React, { Component } from 'react'
import { Image,SafeAreaView,Text,TextInput, View,ScrollView, Dimensions,StyleSheet, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
export default class SignUpScreen extends React.Component {
    state={
        typedPassword:"",
        typedRepassword:"",
        typedEmail:"",
        typedPhone:"",
        user:null,
        showError:' ',
        canCreateAccount:false,
        SignUpColor:'red',
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
      })
      .catch((error)=>{
        if (error !=null)
        this.setState({showError: `${error}`,SignUpColor:'red'})
      })
      
    }
    CheckAccount=()=>
    {
      if (this.state.typedEmail != "" && this.state.typedPassword != "" && this.state.typedRepassword!="" && this.state.typedPhone!="")
      {
        console.log(this.state.typedRepassword,this.state.typedPassword);
        this.state.typedPassword != this.state.typedRepassword ?             
          this.setState(
            {showError: "Mật khẩu nhập lại không khớp",SignUpColor:'red'}
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
                 { this.state.showError 
                 }
                </Text>
              </View>
              <View style={{marginTop:32,alignItems:'center'}}>
                <TouchableOpacity style={styles.SignUpButton}  onPress={this.CheckAccount}>
                      <Text style={{fontWeight:"700", fontSize:20, color:'white'}}>Đăng ký</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row',marginTop:32}}> 
                <View style={{width:windowWidth/2.5,height:1,backgroundColor:'black'}}>
                </View>
                <Text style={{marginTop:-10,fontWeight:"700", fontSize:15, color:'black'}}>Hoặc</Text>
                <View style={{width:windowWidth/2.5,height:1,backgroundColor:'black'}}>
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
    const windowWidth=Dimensions.get('window').width;
    const windowHeight=Dimensions.get('window').height;
    const styles= StyleSheet.create({
        container:{ 
            flex:1,
            backgroundColor:"#FFFFFF"
        },
        header:{
          fontWeight:"800",
          fontSize:30,
          color:"#000",
          marginTop:32,
        },
        input:{
            marginTop:16,
            height:50,
            width:300,
            borderColor:"#BAB7C3",
            borderRadius:70/3,
            backgroundColor:"#FFE5D8",
            color: "#514E5A",
            fontWeight:"600",
            textAlign: "center"
        },
        SignUpButton:{
          width:300,
          height:50,
          borderRadius:70/3,
          backgroundColor:"lightpink",
          alignItems:"center",
          justifyContent:"center",
          marginTop: 16
        },
        hello:{
          fontWeight:"800",
          fontSize:16,
          color:"#000000",
          marginTop:16,
        },
        SignInText:{
          
          marginLeft:10,
          color: "blue",
        },
        SignIn:{
          
          color: "#9B9B9B",
        },
        Extra:{
            marginTop:16,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        tinyLogo:{
          width:200,
          height:200,
          alignItems:"center",
          justifyContent:"center",
        },
    });
