import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

const MessageCard =(props)=>
{
    return (
      <View style={{width:300,flexDirection:'row',justifyContent:"space-between", backgroundColor:'gray', alignItems:'left'}}>
        <View styles={{flex:1}}></View>
        <Image style={{
                      
                      width:50,
                      height:50,
                      alignItems:"center",
                      justifyContent:"center",
                      borderRadius:70/3,
                      backgroundColor:'black'}}
        source={{uri:props.ImageSource}}></Image>       
        <View style={{marginTop:10,marginLeft:5,flexDirection:'column', justifyContent:"flex-start"}}>
          <Text 
              style={{width:200,fontWeight:'600'}}
          >  
              {props.Name}
          </Text>
          <Text style={{width:200,fontWeight:'100',fontStyle:'italic'}} numberOfLines={1} ellipsizeMode={'tail'}> {props.LastestChat} </Text>
        </View>
        <View></View>
      </View>
    );
}
export default MessageCard;