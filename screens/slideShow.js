import React, {Component} from 'react';
import {Text, View} from 'react-native';
import SoundPlaya from '../components/SoundPlaya';
const testSounds = [
  {
    url:
      'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/191478__urupin__ping-ping.wav',
    pose: 'TPose',
  },
  {
    url:
      'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/376523__djfroyd__mystical-sound-sample.wav',
    pose: 'Dab',
  },
];

export default class home extends Component {
  render() {
    return (
      <View>
        <Text> SlideShow </Text>
        <SoundPlaya soundsToLoad={testSounds} />
      </View>
    );
  }
}
