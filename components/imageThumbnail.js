import React, {Fragment, Component} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {RNS3} from 'react-native-aws3';
import {accessKey, secretKey} from '../AWSconfig';

export default class ImageThumbnail extends Component {
  state = {
    filePath: {
      data: '',
      uri: '',
    },
    fileData: '',
    fileUri: '',
    filePublicURL: '',
  };
  chooseImage = () => {
    const options = {
      title: '',
      storageOptions: {skipBackUp: true, path: 'images'},
    };
    if (!this.props.selected) {
      ImagePicker.showImagePicker(options, response => {
        const file = {
          data: response.data,
          uri: response.uri,
          //should make the image name unique- i.e. make username part of image name, maybe take some of response.uri?
          name: 'userYimage.jpg',
          //will it always by jpg? Probably, but could take response.uri.subString(-3) unless jpeg...
          type: 'image/jpg',
        };

        const options = {
          keyPrefix: 'images/',
          bucket: 'eu-image-bucket',
          region: 'eu-west-2',
          accessKey: accessKey,
          secretKey: secretKey,
          successActionStatus: 201,
        };

        RNS3.put(file, options).then(s3response => {
          if (s3response.status !== 201)
            throw new Error('Failed to upload image to S3');
          //unnecessary setState, just need to move put request to s3 into video player 'publish' functionality before removing
          this.setState({
            filePath: response,
            fileData: response.data,
            fileUri: response.uri,
            filePublicURL: s3response.body.postResponse.location,
          });
          this.props.onSelected(file, this.props.buttonKey);
        });
      });
    }
  };
  renderFileData() {
    if (this.props.file.data) {
      return (
        <Image source={{uri: this.props.file.uri}} style={styles.imageCard} />
      );
    } else
      return (
        <Image
          source={require('../assets/Images/gallery-placeholder.jpg')}
          style={styles.imageCard}
        />
      );
  }

  render() {
    return (
      <TouchableOpacity style={styles.opacity} onPress={this.chooseImage}>
        {this.renderFileData()}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  imageCard: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  opacity: {
    width: 100,
    marginLeft: 10,
    margin: 15,
  },
});
