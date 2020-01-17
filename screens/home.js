import React, {Component} from 'react';
import {Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default class home extends Component {
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }

  render() {
    return (
      <View>
        <Text> Hpmmffm </Text>
      </View>
    );
  }
}
