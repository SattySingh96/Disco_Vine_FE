import React, {Component} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Sound from 'react-native-sound';
import ImageOverlay from 'react-native-image-overlay';
import ImageSequence from 'react-native-image-sequence';

Sound.setCategory('Playback');

export default class SoundPlaya extends Component {
  state = {
    images: [],
    loadedSounds: [],
    loadedVideo: {},
    playable: false,
    pressed: false,
    imageIndex: 0,
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

  playSound = n => {
    if (n < this.state.loadedSounds.length) {
      this.state.loadedSounds[n].play(() => {
        this.playSound();
      });
    } else this.setState({pressed: false});
  };

  // playImage = () => {
  //   const {images, imageIndex} = this.state;
  //   if (imageIndex < images.length) {
  //     setTimeout(() => {
  //       this.setState({imageIndex: imageIndex + 1});
  //       this.playImage();
  //     }, 1000);
  //   } else this.setState({pressed: false});
  // };

  renderAnimation = () => {
    console.log('rendering animation');
    if (this.state.pressed) {
      console.log(this.props.testImages, '333333');
      this.playImage(0);
      // return (
      //   <Image source={this.props.testImages[n]} />
      //   <ImageSequence
      //     images={this.props.testImages}
      //     framesPerSecond={1}
      //     startFrameIndex={0}
      //     style={{width: 300, height: 300}}
      //     loop={false}
      //   />
      // );
    } else {
      return (
        <View>
          <ImageOverlay
            source={require('../assets/Images/play-icon.png')}
            title="Play your disco vine"
            overlayColor="#ffffff"
            height={400}
            contentPosition="bottom">
            <Image source={this.state.images[0]}></Image>
          </ImageOverlay>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.screenBody}>
        <View style={styles.opacityContainer}>
          {/* <Image
            style={{width: 50, height: 50}}
            source={'content://com.google.android.apps.photos.contentpr…dia%2F29427/ORIGINAL/NONE/image%2Fjpeg/1223222563',
            }
          /> */}
          <Image
            style={{width: 50, height: 50}}
            source={{
              uri:
                'https://eu-image-bucket.s3.eu-west-2.amazonaws.com/images/06173317.jpg',
            }}
          />
          <Image
            style={{width: 50, height: 50}}
            source={require('../assets/Images/002.png')}
          />

          <TouchableOpacity
            onPress={this.clickHandler}
            style={styles.playButton}>
            {this.state.pressed && (
              <Image source={this.state.images[this.state.imageIndex]} />
            )}
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
