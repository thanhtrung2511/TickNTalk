import React, { Component } from 'react'
import { Image,Text,TextInput, View, Dimensions,StyleSheet, TouchableOpacity,SafeAreaView } from 'react-native'

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
          <SafeAreaView style={styles.container}>
            <View style={{alignItems:"center"}}>
              <Image style={styles.tinyLogo}
                        source={require('../assets/Logo.png')}/>
              <Text style={styles.hello}>Đăng nhập tài khoản của bạn</Text>
              <View style={{alignItems:'center'}} justifyContent="center">
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
              <View style={{marginLeft:16,marginTop:32,alignItems:"center"}}>
                <TouchableOpacity style={styles.SignInButton} onPress={this.SignInContinue} >
                      <Text style={{fontWeight:"700", fontSize:20, color:'white'}}>Đăng nhập</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row',marginTop:32}}> 
                <View style={{width:windowWidth/2.5,height:1,backgroundColor:'black'}}>
                </View>
                <Text style={{marginTop:-10,fontWeight:"700", fontSize:15, color:'black'}}>Hoặc</Text>
                <View style={{width:windowWidth/2.5,height:1,backgroundColor:'black'}}>
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
          backgroundColor:"lightpink",
          alignItems:"center",
          justifyContent:"center",
          marginTop: 16
        },
        FogetPassword:{
          marginTop:32,
          marginLeft:200,
          color: "blue",
        },
        hello:{
          fontWeight:"800",
          fontSize:16,
          color:"#000000",
          marginTop:64
        },
        SignUpText:{
          
          color: "blue",
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
        },
        tinyLogo:{
          width:200,
          height:200,
          alignItems:"center",
          justifyContent:"center",
        },
    });
