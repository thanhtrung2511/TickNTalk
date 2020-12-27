import {
        Dimensions,StyleSheet,
        View, Text, Image,
        TouchableOpacity, Platform
}
from 'react-native';
import React, { Component } from 'react';
import { MaterialIcons,Ionicons } from '@expo/vector-icons';
export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

//UNIVERSAL SIZE UNIT
export const sizeFactor = windowWidth / 25.7;

export const colors = {
    red: "#ff3b30",
    orange: "#ff9500",
    yellow: "#ffcc00",
    green: "#34c759",
    blue: "#007aff",
    indigo: "#5856d6",
    purple: "#af52de",
    pink: "#f29bd4",
    lightpink: "#f7e0f4",
    gray: "#8e8e93",
    dark: "#48484a",
    redDark: "#d70015",
    greenDark: "#32a852",
    gray2: "#aeaeb2",
    gray3: "#c7c7cc",
    gray5: "#e5e5ea",
    gray6: "#f2f2f7",
    white: "#ffffff",
    black: "#000000",
    skin:"#FFF5D8",
    fushia:"#FF00FF",
    cyan: "lightblue"
};
export const styles=StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        
        backgroundColor: colors.lightpink,
    },
    text: {
        fontSize: sizeFactor,
        marginBottom: sizeFactor * 0.75,
    },
    inputText: {
        fontSize: sizeFactor * 1.5,
        marginBottom: sizeFactor * 0.75,
    },
    header:{
        fontWeight:"800",
        fontSize:sizeFactor*2,
        color:colors.black,
      },
    hello:{
        fontWeight:"800",
        fontSize:16,
        color:colors.black,
        marginTop:sizeFactor,
        marginLeft:32,
        marginBottom:sizeFactor,
    },
    background: {
        flex: 1,
        backgroundColor: colors.gray6,
    },
    title: {
        fontSize: sizeFactor * 1.75,
        fontWeight: "bold",
        marginVertical: sizeFactor,
        marginHorizontal: sizeFactor * 1.25,
        color: "black",
    },
    image_icon:{
        width:50,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:70/3,
        backgroundColor:colors.black
    },
    input:{
        marginTop:sizeFactor,
        height:sizeFactor*3,
        width:sizeFactor*21.7,
        borderRadius:70/3,
        backgroundColor:colors.skin,
        fontWeight:"600",
        textAlign: "center",
        marginBottom:sizeFactor*0.5,
    },
    inputGroup:{
        marginTop:sizeFactor,
        height:sizeFactor*3,
        width:sizeFactor*19,
        borderRadius:70/3,
        backgroundColor:colors.skin,
        fontWeight:"600",
        textAlign: "center",
        marginBottom:sizeFactor * 0.5,
    },
    FogetPassword:{
        marginTop:sizeFactor,
        marginLeft:sizeFactor*14,
        color: colors.blue,
      },
    Login_button:{
        width:sizeFactor*20,
        height:sizeFactor*5,
        borderRadius:99,
        backgroundColor:colors.pink,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 16
      },
    MessageCard: {
        marginBottom:sizeFactor * 0.25,
        marginLeft:sizeFactor ,
        paddingTop: sizeFactor*0.25,
        paddingBottom: sizeFactor * 0.25,
        paddingHorizontal: sizeFactor,
        width: sizeFactor*20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.pink,
        flexDirection:'row',
        justifyContent:"space-between", 
        alignItems:'center',
        backgroundColor:colors.white
    },
    Login_text:{
        fontSize:30,
        fontWeight:'700',
        color:colors.black
    },
    Simple_button:{
        
        width:sizeFactor*17,
        height:sizeFactor*3,
            borderRadius:70/3,
            backgroundColor:colors.pink,
            alignItems:"center",
            justifyContent:"center",
            marginTop: 16
        
    },
    Simple_text:{
        fontWeight:"700", fontSize:16, color:colors.black
    },
    SignText:{
      
        color: colors.blue,
        marginLeft:10
      },
      Sign:{
        
        color: colors.black,
        
      },
      Extra:{
        marginTop:16,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
      },
      SmallButton:{
        alignItems:'center',
        marginTop:10,
        flexDirection:'row',
        justifyContent:"center",
        backgroundColor: 'rgba(0, 0, 0, 0)',
        width:50,
        borderRadius: 70/5
      },
      ChatBox:{
        width:sizeFactor*21.7,
        height:windowHeight*0.675,
        paddingHorizontal: sizeFactor,
        backgroundColor:colors.lightpink,
        borderRadius:70/5,
     },
     ChatScreen_Banner:{
        width:windowWidth,
        height:sizeFactor*3,
        flexDirection: 'row',
        alignItems:"center",
        justifyContent:"space-around"
     },
     ChatScreen_Bottom:{
        width:windowWidth,
        height:sizeFactor*3,
        flexDirection: 'row',
        alignItems:"center",
        justifyContent:"space-around",
     },
     ChatScreen_input:{
        
        height:sizeFactor*2.3,
        width:sizeFactor*17,
        borderRadius:70/3,
        backgroundColor:colors.skin,
        fontWeight:"600",
        textAlign:"left",
        marginLeft:sizeFactor*0.5,
     },
     ChatContainer:{
        height: windowHeight*0.7,
        width: windowWidth,
        paddingVertical:sizeFactor*0.5,
        paddingBottom: sizeFactor * 0.25,
        paddingHorizontal: sizeFactor,
        backgroundColor: colors.white,
     },
     ChatMessage:{
         width:windowWidth*0.8,
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent:"flex-start"
     },
})
export const MessageCard =(props)=>
{
    
    return (
      <TouchableOpacity style={styles.MessageCard} onPress={props.onPress}>
        <BasicImage icon="true"
        source={{uri:props.ImageSource}}></BasicImage>       
        <View style={{  paddingTop:5,
                        paddingLeft:5,
                        flexDirection:'column', 
                        justifyContent:"space-between"
                    }}>
          <Text 
              style={{fontWeight:"800",
              fontSize:sizeFactor,
              color:colors.black}}
          >  
              {props.Name}
          </Text>
          <Text style={{width:sizeFactor*15,
                        fontWeight:props.isRead == 'true'? '100': '600'}} 
                numberOfLines={1} 
                ellipsizeMode={'tail'}> 
                {props.LastestChat}
          </Text>
        </View>
      </TouchableOpacity>
    );
}
export const LoginButton=(props)=>{
    return(
        <TouchableOpacity style={styles.Login_button} onPress={props.onPress}>
                  <Text style={styles.Login_text}>{props.Text}
                </Text>
        </TouchableOpacity>
    )
}
export const ButtonMod=(props)=>{
    return(
        <TouchableOpacity style={styles.Simple_button} onPress={props.onPress}>
                  <Text style={styles.Simple_text}>{props.Text}
                </Text>
        </TouchableOpacity>
    )
}
export const ButtonIcon=(props)=>{
    return(
        <TouchableOpacity style={styles.SmallButton} onPress={props.onPress}>
        <MaterialIcons name={props.MaterialFamilyIconName} size={props.size} color={'black'}></MaterialIcons>
        </TouchableOpacity>
    )
}
export const BasicImage=(props)=>{
    return(
        <Image style={{width:props.icon=='false'?200: props.icon=="smaller"?30:50,
            height:props.icon=='false'?200:props.icon=="smaller"?30:50,
            alignItems:"center",
            justifyContent:"center",
            borderRadius:70/3,}}
            source={props.source}/>
    )
}
export const ChatMessage_Orther=(props)=>{
    return (
        <View style={{alignItems:"left",marginTop:16}}>
        <View style={styles.ChatMessage}>
            
            <BasicImage icon="smaller"
                source={{uri:props.ImageSource}}></BasicImage>
            <Text style={{backgroundColor:colors.lightpink,borderRadius:70/4,marginLeft:8,maxWidth:sizeFactor*18}}
                    wrapped={true}
            >
                {props.Content}
            </Text>
            </View>
        </View>
    );
}
export const ChatMessage_Mine=(props)=>{
    return (
        <View style={{alignItems:"flex-end",marginTop:16}}>
           
            <Text wrapped={true} style={{backgroundColor:colors.lightpink,maxWidth:sizeFactor*18}}>
                {props.Content}
            </Text>
            <Text style={{marginTop:10,fontSize:12, fontWeight:"100"}}>
                {props.Status===true? "Đã xem": "Đã gửi"}
            </Text>
        </View>
    );
}
export const ChatHeader=(props)=>{
    return (
        <View style={styles.ChatScreen_Banner}>
            <TouchableOpacity onPress={props.Backward}>
                {Platform.OS==='ios'?
                <Ionicons name="ios-arrow-back" size={30} color="black" /> :
                <Ionicons name="md-arrow-round-back" size={30} color="black" />
                }
            </TouchableOpacity>
            <TouchableOpacity style={{
                                     flexDirection: 'row',alignItems: 'center'}} 
                            onPress={props.goToInfo}
            >
                <BasicImage icon="true"
                    source={{uri:props.ImageSource}}></BasicImage>    
                 
                    <Text 
                        style={{marginLeft:16,fontWeight:"800",
                        width:sizeFactor*10,
                        fontSize:sizeFactor,
                        color:colors.black}}
                        numberOfLines={1} 
                        ellipsizeMode={'tail'}
                    >  
                        {props.Name}
                    </Text>
                
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:16}} onPress={props.Call}>
                <Ionicons name="ios-call" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:16}} onPress={props.Video}>
                <Ionicons name="ios-videocam" size={30} color="black" />
            </TouchableOpacity>
        </View>
    )
}
export const LoginBottom=(props) =>{
    return (
        <View>
        <View style={{marginLeft:16,marginTop:sizeFactor,alignItems:"center"}}>
                <ButtonMod onPress={props.OnPressNormal} Text={props.TextNormal}></ButtonMod>
                <View style={{flexDirection:'row',marginTop:32}}> 
                <View style={{width:30,height:1,backgroundColor:'black'}}>
                </View>
                <Text style={{marginTop:-10,fontWeight:"700", fontSize:15, color:'black'}}>Hoặc</Text>
                <View style={{width:30,height:1,backgroundColor:'black'}}>
                </View>
                </View>
                <ButtonMod OnPress={props.OnPressGoogle} Text={props.TextGoogle}></ButtonMod>
                
              </View>
              <View style={styles.Extra}>
              <Text style={styles.Sign}>{props.TextStatic}</Text>
              <Text style={styles.SignText} onPress={props.Sign}>{props.TextNav}</Text>
        </View>
        </View>
    )
}