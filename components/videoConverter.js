import React, { Component } from 'react';
import { View, Image } from 'react-native'



export default class VideoConverter extends Component {
  render() {
    return (
      <View>
        <Image style={{ width: 50, height: 50 }} source={require('../assets/Images/avatar.png')}></Image>
        <Image style={{ width: 50, height: 50 }} source={require('../assets/Images/google.png')}></Image>
        <Image style={{ width: 50, height: 50 }} source={require('../assets/Images/rfu.jpg')}></Image>
      </View>
    );
  }
}
