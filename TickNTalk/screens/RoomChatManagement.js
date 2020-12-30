import React, { Component } from 'react'
import { Button,Text,TextInput, View, Dimensions,StyleSheet, TouchableOpacity,FlatList,KeyboardAvoidingView } from 'react-native'
import { SafeAreaView,NavigationContainer } from 'react-native-safe-area-context'
import { EvilIcons } from '@expo/vector-icons';
import {styles,ButtonIcon} from '../components/Basic/Basic'
import {SearchBar} from 'react-native-elements'

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
          <KeyboardAvoidingView style={styles.container} behavior="padding">
              <View style={{width:'90%'}} justifyContent="space-between" alignItems='center' flexDirection="row">
              <Text style={styles.header}>Nhóm</Text>                        
              <ButtonIcon MaterialFamilyIconName="group-add" size={33}/>
              </View>
              <View style={{marginTop:16,flexDirection:'column'}} justifyContent="stretch">
                
                {/* <TextInput style={styles.inputGroup}
                      placeholder="Tìm kiếm nhóm"
                      onChangeText={username=>{
                        this.setState({username});
                      }}
                      value={this.state.username}>
                </TextInput> */}
                <SearchBar
                    platform={Platform.OS}
                    placeholder="Tìm bạn bè..."
                    lightTheme="true"
                    containerStyle={{ marginHorizontal:8,backgroundColor: 'transparent' }}
                    inputContainerStyle={{ backgroundColor:'whitesmoke',borderRadius:24}}
                    leftIconContainerStyle={{marginLeft:16}}
                    inputStyle={{}}
                    placeholder="Tìm kiếm bạn bè.."
                    onChangeText={Text=>{
                      this.setState({toSearchText:Text})
                      this.onChangeSearchText(Text);
                    }}
                    value={this.state.toSearchText}
                />  
                <FlatList style={styles.ChatBox} onPress={this.ChatScreenNav}>
                </FlatList>
              </View>
          </KeyboardAvoidingView>
          </SafeAreaView>
        );
      }
}
        