import {Dimensions,StyleSheet} from 'react-native'

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
    fontStyle:"italic",
    marginHorizontal:windowWidth/4
  },
  input:{
      marginTop:15,
      height:50,
      borderStyle:StyleSheet.solid,
      borderColor:"#BAB7C3",
      borderRadius:30,
      paddingHorizontal: 16,
      color: "#514E5A",
      fontWeight:"600"
  },
  SignInButton:{
    width:300,
    height:70,
    borderRadius:70/2,
    backgroundColor:"lightpink",
    alignItems:"center",
    justifyContent:"center",
  },
  SignUpButton:{
    width:300,
    height:70,
    borderRadius:70/2,
    backgroundColor:"lightpink",
    alignItems:"center",
    justifyContent:"center",
    marginTop: 32,
  },
  tinyLogo:{
    width:300,
    height:300,
    alignItems:"center",
    justifyContent:"center",
  },
});
export default styles