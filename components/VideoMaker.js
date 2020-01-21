import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ToggleButton from './ToggleButton';

export default class VideoMaker extends Component {
  state = {hidden: true};
  setHidden = () => {
    this.setState(currentState => {
      return {hidden: !currentState.hidden};
    });
  };
  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <ToggleButton showHide={this.setHidden} hidden={this.state.hidden} />
        {!this.state.hidden && <Text>Hello</Text>}
      </View>
    );
  }
}
