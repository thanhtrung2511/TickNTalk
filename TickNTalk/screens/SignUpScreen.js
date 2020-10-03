import React, { Component } from 'react'
import { Text,TextInput, View, Dimensions,StyleSheet, TouchableOpacity } from 'react-native'

export default class SignUpScreen extends React.Component {
    state={
        username:"",
        password:"",
        repassword:"",
        Email:""
    }
    SignIn=()=>
    {
      this.props.navigation.navigate("SignIn")

    }
    render() {
        return (
          <View style={styles.container}>
            <View style={styles.circle}></View>
            <View style={{marginHorizontal:32, marginVertical:32}}>
              <Text style={styles.header}>TickNTalk</Text>
              <Text style={styles.hello}>Đăng ký tài khoản mới</Text>
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
                <TextInput style={styles.input} 
                      secureTextEntry={true}
                      placeholder="Nhập lại mật khẩu"
                      onChangeText={repassword=>{
                        this.setState({repassword});
                      }}
                      value={this.state.repassword}/>
                <TextInput style={styles.input} 
                      secureTextEntry={false}
                      placeholder="Email"
                      onChangeText={Email=>{
                        this.setState({Email});
                      }}
                      value={this.state.Email}/>      
                
              </View>
              <View style={{marginLeft:32,marginTop:32}}>
                <TouchableOpacity style={styles.SignUpButton}  onPress={this.SignIn}>
                      <Text color="#000" fontFamily="SegeoUI">Đăng ký</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.SignUpButton}>
                      <Text color="#000" fontFamily="SegeoUI">Đăng ký với Google</Text>
                </TouchableOpacity>
                
              </View>
              <View style={styles.Extra}>
                <Text style={styles.SignIn}>Bạn đã có tài khoản?</Text>
                <Text style={styles.SignInText} onPress={this.SignIn}>Đăng nhập tại đây</Text>
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
        SignUpButton:{
          width:300,
          height:50,
          borderRadius:70/3,
          backgroundColor:"#9075E3",
          alignItems:"center",
          justifyContent:"center",
          marginTop: 16
        },
        hello:{
          fontWeight:"800",
          fontSize:16,
          color:"#9B9B9B",
          marginTop:windowHeight/8,
          marginLeft:32,
        },
        SignInText:{
          
          marginLeft:10,
          color: "#120C6E",
        },
        SignIn:{
          
          color: "#9B9B9B",
        },
        Extra:{
            marginTop:16,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }
    });
