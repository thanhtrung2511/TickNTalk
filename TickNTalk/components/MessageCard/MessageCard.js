import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

export default class MessageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ImageSource: "",
        Name:"",
        LastestChat:"",
    };
  }

  render() {
    return (
      <View>
        <Text> MessageCard </Text>
      </View>
    );
  }
}
