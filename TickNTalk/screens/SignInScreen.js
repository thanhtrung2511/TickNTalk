import React, { Component } from 'react'
import { Text,TextInput, View, Dimensions,StyleSheet, TouchableOpacity } from 'react-native'

export default class SignInScreen extends React.Component {
    state={
        username:"",
        password:""
    }
    SignInContinue=() =>
    {
      this.props.navigation.navigate("Dashboard",{username:this.state.username},{password:this.state.password})
    }
    SignUp=()=>
    {
      this.props.navigation.navigate("SignUp")
    }
    render() {
        return (
          <View style={styles.container}>
            <View style={styles.circle}></View>
            <View style={{marginHorizontal:32, marginVertical:32}}>
              <Text style={styles.header}>TickNTalk</Text>
              <Text style={styles.hello}>Đăng nhập tài khoản của bạn</Text>
              <View style={{marginLeft:32,marginTop:32}} justifyContent="center">
                <TextInput style={styles.input}
                      placeholder="Tên đăng nhập"
                      onChangeText={username=>{
                        this.setState({username});
                      }}
                      value={this.state.username}/>
                <TextInput style={styles.input} 
                      secureTextEntry={true}
                      placeholder="Mật khẩu"
                      onChangeText={password=>{
                        this.setState({password});
                      }}
                      value={this.state.password}/>
                <Text style={styles.FogetPassword}>Quên mật khẩu?</Text>
                
              </View>
              <View style={{marginLeft:32,marginTop:32}}>
                <TouchableOpacity style={styles.SignInButton} onPress={this.SignInContinue} >
                      <Text color="#000" fontFamily="SegeoUI">Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.SignInButton}>
                      <Text color="#000" fontFamily="SegeoUI">Đăng nhập với Google</Text>
                </TouchableOpacity>
                
              </View>
              <View style={styles.Extra}>
              <Text style={styles.SignUp}>Bạn chưa có tài khoản?</Text>
              <Text style={styles.SignUpText} onPress={this.SignUp}>Đăng ký tại đây</Text>
              </View>
            </View>
          </View>
        );
      }
}
    const windowWidth=Dimensions.get('window').width;
    const windowHeight=Dimensions.get('window').height;
    const styles= StyleSheet.create({
        container:{ 
            flex:1,
            backgroundColor:"#Dddddd"
        },
        circle:{
            width:500,
            height:500,
            borderRadius: 500/2,
            backgroundColor: "#99FFFF",
            position: "absolute",
            left:-120,
            top:-20,
        },
        header:{
          fontWeight:"800",
          fontSize:30,
          color:"#000",
          marginTop:windowHeight/8,
          marginHorizontal:windowWidth/4
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
        SignInButton:{
          width:300,
          height:50,
          borderRadius:70/3,
          backgroundColor:"#9075E3",
          alignItems:"center",
          justifyContent:"center",
          marginTop: 16
        },
        FogetPassword:{
          marginTop:32,
          marginLeft:200,
          color: "#120C6E",
        },
        hello:{
          fontWeight:"800",
          fontSize:16,
          color:"#9B9B9B",
          marginTop:windowHeight/8,
          marginLeft:32,
        },
        SignUpText:{
          
          color: "#120C6E",
          marginLeft:10
        },
        SignUp:{
          
          color: "#9B9B9B",
          
        },
        Extra:{
          marginTop:16,
          flexDirection: "row",
          justifyContent: 'center',
          alignItems: 'center',
        }
    });
