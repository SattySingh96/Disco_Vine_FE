import React, { Component } from 'react';
import { Text, View } from 'react-native';
import VideoConverter from '../components/videoConverter'

export default class home extends Component {
  render() {
    return (
      <View>
        <VideoConverter />
      </View>
    );
  }
}
