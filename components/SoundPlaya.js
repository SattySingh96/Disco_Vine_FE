import React, {Component} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Sound from 'react-native-sound';
import ImageSequence from 'react-native-image-sequence';

Sound.setCategory('Playback');

export default class SoundPlaya extends Component {
  state = {
    loadedSounds: [],
    loadedVideo: {},
    ready: 0,
    playable: false,
    pressed: false,
  };

  componentDidMount() {
    this.props.soundsToLoad.forEach((file, index) => {
      const newSound = new Sound(file.url, undefined, error => {
        if (error) {
          console.log('failed to load the sound', error);
          alert('problem loading sounds');
        }
      });
      this.setState(
        ({loadedSounds, ready}) => {
          const newSounds = [...loadedSounds];
          let newReady = ready;
          newReady++;
          newSounds[index] = newSound;
          return {loadedSounds: newSounds, ready: newReady};
        },
        () => {
          if (this.state.ready === this.props.soundsToLoad.length)
            this.setState({playable: true});
        },
      );

      return newSound;
    });
  }

  renderAnimation = () => {
    if (this.state.pressed) {
      return (
        <ImageSequence
          images={this.props.testImages}
          framesPerSecond={1}
          startFrameIndex={0}
          style={{width: 300, height: 300}}
          loop={false}
        />
      );
    } else {
      return <Image source={this.props.testImages[0]}></Image>;
    }
  };

  clickHandler = () => {
    if (this.state.playable) {
      this.state.loadedSounds[0].play(() => {
        // this.state.loadedSounds[0].release();
        this.state.loadedSounds[1].play(() => {
          // this.state.loadedSounds[1].release();
          this.setState({pressed: false});
        });
      });
      this.setState({
        pressed: true,
      });
    }
  };

  render() {
    return (
      <View style={styles.screenBody}>
        <View style={styles.opacityContainer}>
          <TouchableOpacity
            onPress={this.clickHandler}
            style={styles.playButton}>
            {this.renderAnimation()}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenBody: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: '#e0e0e0',
  },
  playButton: {
    width: 300,
    height: 300,
  },
  opacityContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: '#ffffff',
  },
});
