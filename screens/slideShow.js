import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SoundPlaya from '../components/SoundPlaya';
import {RNS3} from 'react-native-aws3';
import {accessKey, secretKey} from '../AWSconfig';

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

  makeVideoShareable = () => {
    console.log(this.props.navigation.getParam('tiles', 'no tiles')[0].key);
    const options = {
      keyPrefix: 'images/',
      bucket: 'eu-image-bucket',
      region: 'eu-west-2',
      accessKey: accessKey,
      secretKey: secretKey,
      successActionStatus: 201,
    };

    const validTiles = this.props.navigation
      .getParam('tiles', 'no tiles')
      .filter(tile => {
        console.log(tile.uri);
        return tile.uri !== '';
      });

    console.log(validTiles.length);

    const videoSounds = validTiles.map(tile => {
      return tile.sound.url;
    });

    const s3ImageURLS = [];

    validTiles.forEach((tile, idx) => {
      const file = {
        uri: tile.imgFile.uri,
        //should make the image name unique- i.e. make username part of image name, maybe take some of response.uri?
        name: 'userYimage.jpg',
        //will it always by jpg? Probably, but could take response.uri.subString(-3) unless jpeg...
        type: 'image/jpg',
      };

      RNS3.put(file, options)
        .then(s3response => {
          if (s3response.status !== 201) {
            throw new Error('Failed to upload image to S3');
          }
          s3ImageURLS[idx] = s3response.body.postResponse.location;
          console.log(s3ImageURLS);
        })
        .then(async () => {
          if (s3ImageURLS.length === validTiles.length) {
            console.log(s3ImageURLS);

            const videoObject = {
              images: s3ImageURLS,
              sounds: videoSounds,
            };
            console.log(videoObject);
            //put in user_id
            await fetch(
              'https://0i43ly7yni.execute-api.eu-west-2.amazonaws.com/latest/videos/1',
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  videoObject,
                }),
              },
            ).then(fetchedResponse => {
              console.log(fetchedResponse);
            });
          }
        });
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
        <TouchableOpacity
          style={styles.button}
          onPress={this.makeVideoShareable}>
          <Icon color={'#3b5998'} size={10} name={'md-cloud-upload'}></Icon>
          <Text>PUBLISH</Text>
        </TouchableOpacity>
        <SoundPlaya
          style={styles.soundPlayerContainer}
          testImages={this.state.testImages}
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
