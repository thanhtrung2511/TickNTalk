import {Dimensions, StyleSheet} from 'react-native';
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
          color:"#FFFFFF",
          
        },
  ProfilePhotoContainer: {
    backgroundColor: '#dfe6e9',
    width: 85,
    height: 85,
    borderRadius: 40,
    alignSelf: 'center',
    marginTop: 16,
    overflow: 'hidden',
  },

  DefaultProfilePhoto: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  ProfilePhoto: {
    flex: 1,
  },
});

export default styles;
