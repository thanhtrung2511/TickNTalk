import React, {Component} from 'react';
import {Text,
TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  AntDesign,
} from 'react-native';
import {styles, ButtonIcon} from '../components/Basic/Basic';

export class UpdateAvaScreen extends React.Component {
  constructor (props) {
    super (props);
    this.unsubscriber = null;
  };
  render () {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Thông tin cá nhân</Text>
         <View
            style={{
              flexDirection: 'row',
              marginLeft: -32,
              padding: 64,
              backgroundColor: 'white',
              borderRadius: 70 / 5,
            }}
          >
         </View>
         <View>
         {/* <TouchableOpacity  onPress={addProfilePhoto}>
              //   <TouchableOpacity  onPress={addProfilePhoto}>
         {profilePhoto ? (
          <Image source={{ uri: profilePhoto }} />
        ) : (
          <View>
            <AntDesign name="plus" size={24} color={`${Colors.darkBlue}`} />
          </View>
        )}
         </TouchableOpacity> */}
         </View>
      </SafeAreaView>
    );
  }
}

export default UpdateAvaScreen;
