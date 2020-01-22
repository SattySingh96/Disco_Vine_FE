import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import PublishButton from '../components/PublishButton';
import Icon from 'react-native-vector-icons/Ionicons';
import SoundPlaya from '../components/SoundPlaya';
import {RNS3} from 'react-native-aws3';
import {accessKey, secretKey} from '../AWSconfig';
// import * as fs from 'fs';

export default class SlideShow extends Component {
  state = {
    images: [],
    videoObject: {},
    //put in sound objects
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

  componentDidMount() {
    this.getVideoObject();
  }

  componentDidUpdate(prevProps) {
    if (
      //how can this be different
      prevProps.navigation.getParam('tiles', 'no tiles') !==
      this.props.navigation.getParam('tiles', 'no tiles')
    ) {
      this.getVideoObject();
    }
  }

  getVideoObject = () => {
    console.log('get video object');
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
      return tile.imgFile.uri !== '';
    });

    const videoImageURIs = validTiles.map(tile => {
      return tile.imgFile.uri;
    });

    const videoSounds = validTiles.map(tile => {
      return tile.sound.url;
    });

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
          .then(async s3ImageURLS => {
            if (
              s3ImageURLS.length === validTiles.length &&
              !s3ImageURLS.includes(undefined)
            ) {
              const videoObject = {
                images: s3ImageURLS,
                sounds: videoSounds,
              };
              console.log(s3ImageURLS);
              const stateImages = s3ImageURLS.map(url => {
                return {
                  uri: url,
                };
              });
              this.setState(
                {videoObject: videoObject, images: stateImages},
                () => {
                  console.log(this.state.images);
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Icon color={'#3b5998'} size={10} name={'md-arrow-round-back'}></Icon>
          <Text>GO BACK</Text>
        </TouchableOpacity>
        <PublishButton
          style={styles.button}
          tiles={this.props.navigation.getParam('tiles', 'no tiles')}
          videoObject={this.state.videoObject}
        />
        <SoundPlaya
          style={styles.soundPlayerContainer}
          testImages={this.state.images}
          soundsToLoad={this.state.testSounds}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  soundPlayerContainer: {
    flex: 4,
    height: Dimensions.get('screen').height / 2,
  },
  slideShowContainer: {
    flexDirection: 'column',
  },
});
