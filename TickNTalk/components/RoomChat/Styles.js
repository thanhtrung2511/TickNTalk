import {Dimensions,StyleSheet} from 'react-native'

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
          color:"#FFFFFF",
          
        },
        input:{
            marginTop:10,
            height:50,
            marginLeft:-32,
            width:320,
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
          },
          createRoom:{
            alignItems:'center',
            marginTop:10,
            flexDirection:'row',
            justifyContent:"center",
            backgroundColor: 'rgba(0, 0, 0, 0)',
            width:50,
            borderRadius: 70/5
            
          }
    });


export default styles