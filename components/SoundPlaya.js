import React, {Component} from 'react';
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import Sound from 'react-native-sound';

// Load component - button is deactivated
// Once component has mounted start loading sound files from URL
// once URLs have been loaded button is activated
Sound.setCategory('Playback');

export default class SoundPlaya extends Component {
  state = {loadedSounds: [], loadedVideo: {}, ready: 0, playable: false};
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
  clickHandler = () => {
    if (this.state.playable) {
      this.state.loadedSounds[0].play(() => {
        this.state.loadedSounds[0].release();
        this.state.loadedSounds[1].play(() => {
          this.state.loadedSounds[1].release();
        });
      });
    }
  };
  render() {
    return (
      <TouchableOpacity style={styles.playButton} onPress={this.clickHandler}>
        <Image
          source={require('../assets/gallery-placeholder.jpg')}
          style={styles.playButton}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  playContainer: {width: 100, height: 100, flex: 1, backgroundColor: 'blue'},
  playButton: {width: 40, height: 40, backgroundColor: 'black'},
});
