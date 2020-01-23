import React, {Component} from 'react';
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
import ImageOverlay from 'react-native-image-overlay';

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
    const {soundsToLoad} = this.props;
    const {testImages} = this.props;
    console.log(testImages);
    this.setState({loadedSounds: soundsToLoad, images: testImages}, () => {
      this.setState({playable: true}, () => {
        console.log('set state');
      });
    });
  };

  playSound = n => {
    if (n < this.state.loadedSounds.length) {
      this.state.loadedSounds[n].play(() => {
        this.playSound(n + 1);
      });
    } else this.setState({pressed: false});
  };

  clickHandler = () => {
    this.setState(
      currentState => {
        return {pressed: !currentState.pressed};
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
      console.log(this.props.testImages, '333333');
      return (
        <ImageSequence
          images={this.props.testImages}
          framesPerSecond={1}
          startFrameIndex={0}
          style={styles.imageSequence}
          loop={false}
        />
      );
    } else {
      return (
        <View style={styles.pausedImage}>
          <ImageOverlay
            overlayColor="white"
            contentPosition="center"
            overlayAlpha={0.4}
            height={320}
            source={this.props.testImages[0]}>
            <Image
              style={styles.playButton}
              source={require('../assets/Images/icon.png')}></Image>
          </ImageOverlay>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.opacityContainer}>
        <TouchableOpacity onPress={this.clickHandler} style={styles.playVideo}>
          {this.renderAnimation()}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // screenBody: {
  //   width: (Dimensions.get('screen').width * 4) / 5,
  //   height: Dimensions.get('screen').height / 2,
  //   backgroundColor: '#e0e0e0',
  // },
  imageSequence: {
    width: Dimensions.get('screen').width - 60,
    height: 320,
    borderColor: 'black',
    borderWidth: 5,
  },
  playButton: {
    width: Dimensions.get('screen').width - 60,
    height: 100,
    width: 100,
    //opacity: 0.75,
  },
  opacityContainer: {
    //position: 'absolute',
    width: Dimensions.get('screen').width - 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
    height: 320,
    borderColor: 'blue',
    borderWidth: 5,
  },
  pausedImage: {
    // maxWidth: Dimensions.get('screen').width - 60,
    height: 320,
    zIndex: 5,
    borderColor: 'white',
    borderWidth: 5,
    alignItems: 'center',
    // marginLeft: 30,
    marginRight: 30,
    paddingLeft: 30,
    // paddingRight: 30,
  },
  playVideo: {
    width: Dimensions.get('screen').width - 60,
    height: 320,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    //alignSelf: 'center',
    alignItems: 'center',
    // borderColor: 'yellow',
    // borderWidth: 5,
  },
});
