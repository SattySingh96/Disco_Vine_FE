import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import SoundPlaya from '../components/SoundPlaya';
import { RNS3 } from 'react-native-aws3';
import { accessKey, secretKey } from '../AWSconfig';
import { Icon } from '@iconify/react';



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
      <View style={styles.SlideShowContainer}>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            style={styles.BackButton}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Icon size={15} name={'md-arrow-round-back'} style={styles.Icons}></Icon>
            <Text style={styles.Text}>GO BACK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ForwardButton}
            onPress={this.makeVideoShareable}>
            <Text style={styles.Text}>PUBLISH</Text>
            <Icon size={15} name={'md-arrow-round-forward'} style={styles.Icons}></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.SoundPlayerContainer}>
          <SoundPlaya
            style={styles.Video}
            testImages={this.state.testImages}
            soundsToLoad={this.state.testSounds}
            size={150}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  BackButton: {
    width: 100,
    height: 50,
    backgroundColor: 'red',
    borderStyle: 'solid',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2


  },
  ForwardButton: {
    width: 100,
    height: 50,
    backgroundColor: '#22B573',
    borderStyle: 'solid',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2

  },
  ButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#404040'
  },
  Text: {
    color: 'white',
    fontSize: 18,
    margin: 5
  },
  Icons: {
    color: 'white'
  },
  SoundPlayerContainer: {
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 5,
    height: 400,
    margin: 10,

  },

  SlideShowContainer: {
    flexDirection: 'column',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: "#E0E0E0"
  },
});
