import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Button } from 'react-native';
import ImageSequence from 'react-native-image-sequence'
import Icon from 'react-native-vector-icons/Ionicons'
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

const images = [
  require('/home/satty/Desktop/Disco_Vine_FE/assets/Images/002.png'),
  require('/home/satty/Desktop/Disco_Vine_FE/assets/Images/003.png'),
  require('/home/satty/Desktop/Disco_Vine_FE/assets/Images/img.png'),
];

const centerIndex = Math.round(images.length / 2)

export default class SlideShow extends Component {

  state = {
    pressed: 0
  }

  handlePlay = () => {
    this.setState(({ pressed }) => {
      const newPress = pressed + 1;
      return { pressed: newPress }
    }, () => {
      this.forceUpdate;
      console.log(this.state.pressed)
    })
  }
  componentDidUpdate = () => {

  }




  renderAnimation = () => {
    if (this.state.pressed > 0) {
      return (
        <ImageSequence
          images={images}
          framesPerSecond={1}
          startFrameIndex={centerIndex}
          style={{ width: Dimensions.get('screen').width, height: 400 }}
          loop={false}
        />
      )
    }
    else {
      return (
        <View>
          <Icon style={{ color: '#000000' }} size={80} name={'md-play'}></Icon>
        </View>
      )
    }
  }

  render() {
    return (

      <View style={{}}>
      <SoundPlaya soundsToLoad={testSounds} />
        <TouchableOpacity style={styles.opacity} onPress={this.handlePlay} onPressIn={this.handleReplay}>
          {this.renderAnimation()}
        </TouchableOpacity>
      </View >

    );
  }
}

const styles = StyleSheet.create({
  container: {
    // width: Dimensions.get('screen').width,
    // height: Dimensions.get('screen').height,
  },
  opacity: {
    position: 'absolute', display: 'flex', flexDirection: 'column', alignSelf: 'center'
  }

})

