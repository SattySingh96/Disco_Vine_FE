import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import SoundPlaya from '../components/SoundPlaya';
import { Button } from 'react-native'

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
  // // require('/home/satty/Desktop/Disco_Vine_FE/assets/Images/img.png'),
  // require('/home/satty/Desktop/Disco_Vine_FE/assets/Images/002.png'),
  // require('/home/satty/Desktop/Disco_Vine_FE/assets/Images/003.png')
];


export default class SlideShow extends Component {


  renderVideo = () => {
    if (testImages.length === 0) {
      return (
        <View style={styles.background}>
          <View style={styles.textBox}>
            <Text style={{ fontSize: 20, textAlignVertical: 'center' }}>No Video?</Text>
          </View>
          <View>
            <Button title='Make one' onPress={() => {
              this.props.navigation.navigate('Gallery')
            }} />
          </View>
        </View>
      );
    }
    else {
      return (
        <SoundPlaya testImages={testImages} soundsToLoad={testSounds} />
      )
    }
  }


  render() {
    return (
      <View>
        {this.renderVideo()}
      </View >
    );
  }
}

const styles = StyleSheet.create({
  background: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textBox: {


  }
})
