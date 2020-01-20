import React, {Component} from 'react';
import {View} from 'react-native';
import SoundPlaya from '../components/SoundPlaya';

export default class SlideShow extends Component {
  state = {
    testSounds: [
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
    ],

    testImages: [
      require('../assets/Images/img.png'),
      require('../assets/Images/002.png'),
      require('../assets/Images/003.png'),
    ],
  };
  render() {
    return (
      <View>
        <SoundPlaya
          testImages={this.state.testImages}
          soundsToLoad={this.state.testSounds}
        />
      </View>
    );
  }
}
