import React, {Component} from 'react';
import Navigator from './routes/screenStack';
import {View, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default class App extends Component {
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }

  render() {
    return <Navigator style={styles.Navigator} />;
  }
}

const styles = StyleSheet.create({
  Navigator: {
    flex: 1,
  },
});
