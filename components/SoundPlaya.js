import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Sound from 'react-native-sound';
import ImageSequence from 'react-native-image-sequence';
import { Icon } from '@iconify/react';
import PlayOutline from '@iconify/icons-ion/play-outline';

Sound.setCategory('Playback');

export default class SoundPlaya extends Component {
  state = {
    images: [],
    loadedSounds: [],
    loadedVideo: {},
    playable: false,
    pressed: false,
  };

  componentDidMount() {
    this.loadMedia();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.soundsToLoad !== this.props.soundsToLoad ||
      prevProps.testImages !== this.props.testImages
    )
      this.loadMedia();
  }

  loadMedia = () => {
    const { soundsToLoad } = this.props;
    const { testImages } = this.props;
    console.log(testImages);
    this.setState({ loadedSounds: soundsToLoad, images: testImages }, () => {
      this.setState({ playable: true }, () => {
        console.log('set state');
      });
    });
  };

  playSound = n => {
    if (n < this.state.loadedSounds.length) {
      this.state.loadedSounds[n].play(() => {
        this.playSound(n + 1);
      });
    } else this.setState({ pressed: false });
  };

  clickHandler = () => {
    this.setState(
      currentState => {
        return { pressed: !currentState.pressed };
      },
      () => {
        if (this.state.playable && this.state.pressed) {
          this.playSound(0);
        }
      },
    );
  };

  renderAnimation = () => {
    console.log('rendering animation');
    if (this.state.pressed) {
      return (
        <ImageSequence
          images={this.props.testImages}
          framesPerSecond={1}
          startFrameIndex={0}
          style={{ width: 300, height: 300 }}
          loop={false}
        />
      );
    } else {
      return (
        <Icon icon={PlayOutline} />

      );
    }
  };

  render() {
    return (
      <View style={styles.opacityContainer}>
        <TouchableOpacity onPress={this.clickHandler} style={styles.playButton}>
          {this.renderAnimation()}
        </TouchableOpacity>
      </View>
      //</View>
    );
  }
}

const styles = StyleSheet.create({
  // screenBody: {
  //   width: (Dimensions.get('screen').width * 4) / 5,
  //   height: Dimensions.get('screen').height / 2,
  //   backgroundColor: '#e0e0e0',
  // },
  playButton: {
    width: 300,
    height: 300,
  },
  opacityContainer: {
    //position: 'absolute',
    maxWidth: Dimensions.get('screen').width,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    // backgroundColor: 'white'

  },
  pausedImage: {
    maxWidth: Dimensions.get('screen').width - 60,
    marginTop: 40,
    height: 320,
  },
});