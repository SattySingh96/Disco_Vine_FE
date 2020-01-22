import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RNS3} from 'react-native-aws3';
import {accessKey, secretKey} from '../AWSconfig';

export default class ImageThumbnail extends Component {
  makeVideoShareable = () => {
    const galleryTiles = this.props.tiles;
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
      }
    });
  };
  render() {
    return (
      <TouchableOpacity onPress={this.makeVideoShareable}>
        <Icon color={'#3b5998'} size={10} name={'md-cloud-upload'}></Icon>
        <Text>PUBLISH</Text>
      </TouchableOpacity>
    );
  }
}
