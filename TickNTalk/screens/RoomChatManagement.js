import React, { Component } from 'react'
import { Button,Text,TextInput, View, Dimensions,StyleSheet, TouchableOpacity,FlatList } from 'react-native'
import { SafeAreaView,NavigationContainer } from 'react-native-safe-area-context'
import { EvilIcons } from '@expo/vector-icons';

export default class RoomChatManagements extends React.Component {
    
    state={
        username:"",
        password:"",
        repassword:"",
        Email:""
    }
    ChatScreenNav=()=>
    {
      this.props.navigation.navigate("Chat")
    }
    render() {
        return (
          <SafeAreaView style={styles.container}>
              <Text style={styles.header}>Nhóm</Text>                        
              <View style={{marginLeft:32,marginTop:16,flexDirection:'column'}} justifyContent="center">
                <View style={{flexDirection:'row'}}>
                <TextInput style={styles.input}
                      placeholder="Tìm kiếm nhóm"
                      onChangeText={username=>{
                        this.setState({username});
                      }}
                      value={this.state.username}>
                </TextInput>
                <Button
                    style={{fontSize: 10, color: 'green',backgroundColor:'red', borderColor:"#BAB7C3",marginTop:32}}
                    styleDisabled={{color: 'red'}}
                    title="Tạo nhóm">
                </Button>
                </View>
                <FlatList style={styles.ChatBox} onPress={this.ChatScreenNav}>
                </FlatList>
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
            backgroundColor:"pink",
            alignItems: 'center'
        },
        ChatBox:{
            width:windowWidth/1.11,
            height:windowHeight/1.11,
            marginLeft:-32,
            backgroundColor: "#FFFF",
            borderRadius:70/5,
        },
        header:{
          fontWeight:"800",
          fontSize:30,
          color:"#E5E5E5",
          
        },
        input:{
            marginTop:10,
            height:50,
            marginLeft:-32,
            width:windowWidth/1.5,
            borderColor:"#BAB7C3",
            borderRadius:70/5,
            backgroundColor:"#FFE5D8",
            color: "#514E5A",
            fontWeight:"600",
            textAlign: "left"
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
