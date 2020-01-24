import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import PublishButton from '../components/PublishButton';
import Icon from 'react-native-vector-icons/Ionicons';
import SoundPlaya from '../components/SoundPlaya';
import {RNS3} from 'react-native-aws3';
import {accessKey, secretKey} from '../AWSconfig';

export default class SlideShow extends Component {
  state = {
    images: [],
    videoObject: {},
    sounds: [],
    uris: [],
    hardcodedImages: [
      require('../assets/Images/002.png'),
      require('../assets/Images/003.png'),
      require('../assets/Images/img.png'),
    ],
  };

  componentDidMount() {
    this.getVideoObject();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.navigation.getParam('tiles', 'no tiles') !==
      this.props.navigation.getParam('tiles', 'no tiles')
    ) {
      this.getVideoObject();
    }
  }

  getVideoObject = () => {
    const galleryTiles = this.props.navigation.getParam('tiles', 'no tiles');
    const options = {
      keyPrefix: 'images/',
      bucket: 'eu-image-bucket',
      region: 'eu-west-2',
      accessKey: accessKey,
      secretKey: secretKey,
      successActionStatus: 201,
    };

    const validTiles = galleryTiles.filter(tile => {
      return tile.imgFile.uri != '';
    });

    const videoImageURIs = validTiles.map(tile => {
      return tile.imgFile.uri;
    });

    const videoSounds = validTiles.map(tile => {
      return tile.sound;
    });

    this.setState({uris: videoImageURIs, sounds: videoSounds}, () => {});

    const s3ImageURLS = [];

    videoImageURIs.forEach((uri, idx) => {
      const file = {
        uri: uri,
        //make the image name unique
        name: `${uri.substring(uri.length - 8)}.jpg`,
        //will it always by jpg? Probably, but could take response.uri.subString(-3) unless jpeg...
        type: 'image/jpg',
      };

      if (videoImageURIs.indexOf(uri) === idx) {
        RNS3.put(file, options)
          .then(s3response => {
            if (s3response.status !== 201) {
              throw new Error('Failed to upload image to S3');
            }
            s3ImageURLS[idx] = s3response.body.postResponse.location;
            return s3ImageURLS;
          })
          .then(s3ImageURLS => {
            videoImageURIs.forEach((uri, idx) => {
              if (videoImageURIs.indexOf(uri) !== idx) {
                s3ImageURLS[idx] = s3ImageURLS[videoImageURIs.indexOf(uri)];
              }
            });
            return s3ImageURLS;
          })
          .then(s3ImageURLS => {
            if (
              s3ImageURLS.length === validTiles.length &&
              !s3ImageURLS.includes(undefined)
            ) {
              const videoObject = {
                images: s3ImageURLS,
                sounds: videoSounds,
              };
              const stateImages = s3ImageURLS.map(url => {
                return {
                  uri: url,
                };
              });
              this.setState(
                {videoObject: videoObject, images: stateImages},
                () => {
                  console.log('got images back');
                },
              );
            }
          });
      }
    });
  };

  render() {
    return (
      <ScrollView style={styles.slideShowContainer}>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            style={styles.BackButton}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Icon
              style={styles.icon}
              color={'white'}
              size={20}
              name={'md-arrow-round-back'}></Icon>
            <Text style={styles.text}>GO BACK</Text>
          </TouchableOpacity>
          <PublishButton
            style={styles.ForwardButton}
            tiles={this.props.navigation.getParam('tiles', 'no tiles')}
            videoObject={this.state.videoObject}
          />
        </View>
        <View style={styles.playerSurround}>
          <SoundPlaya
            style={styles.soundPlayerContainer}
            testImages={this.state.images}
            soundsToLoad={this.state.sounds}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  BackButton: {
    width: 100,
    height: 50,
    backgroundColor: 'purple',
    color: 'white',
    borderStyle: 'solid',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },

  ButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: 'purple',
  },
  text: {
    color: 'white',
    // fontSize: 18,
    margin: 5,
  },
  icon: {
    margin: 10,
    color: 'white',
  },
  SoundPlayerContainer: {
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 5,
    height: 400,
    margin: 10,
    backgroundColor: '#d8e0f4',
  },
  playerSurround: {
    flex: 1,
    flexDirection: 'row',
    borderStyle: 'solid',
    backgroundColor: 'purple',
    borderWidth: 2,
    borderColor: 'purple',
    borderRadius: 5,
    margin: 50,
    height: 340,
    width: 320,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  SlideShowContainer: {
    flexDirection: 'column',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: '#E0E0E0',
    alignSelf: 'flex-start',
  },
});
