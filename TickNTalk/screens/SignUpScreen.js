import React, { Component } from 'react'
import { Image,SafeAreaView,Text,TextInput, View, Dimensions,StyleSheet, TouchableOpacity } from 'react-native'

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
          <SafeAreaView style={styles.container}>
          <View style={{alignItems:"center"}}>
            <Image style={styles.tinyLogo}
                        source={require('../assets/Logo.png')}/>
              <Text style={styles.hello}>Đăng ký tài khoản mới</Text>
              <View style={{alignItems:"center"}} justifyContent="center">
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
              <View style={{marginTop:32,alignItems:'center'}}>
                <TouchableOpacity style={styles.SignUpButton}  onPress={this.SignIn}>
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
          backgroundColor:"lightpink",
          alignItems:"center",
          justifyContent:"center",
          marginTop: 16
        },
        hello:{
          fontWeight:"800",
          fontSize:16,
          color:"#000000",
          marginTop:64,
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
