import React, { Component } from 'react';
import { View } from 'react-native';
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

const testImages = [
  require('/home/satty/Desktop/Disco_Vine_FE/assets/Images/img.png'),
  require('/home/satty/Desktop/Disco_Vine_FE/assets/Images/002.png'),
  require('/home/satty/Desktop/Disco_Vine_FE/assets/Images/003.png')
];

export default class SlideShow extends Component {

  render() {
    return (
      <View>
        <SoundPlaya testImages={testImages} soundsToLoad={testSounds} />
      </View >
    );
  }
}
