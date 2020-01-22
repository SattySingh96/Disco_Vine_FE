import React, {Fragment, Component} from 'react';
import {StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-picker';

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
    console.log(this.props.highlighted);
    console.log(this.props.buttonKey);
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
          //name: 'userYimage.jpg',
          //will it always by jpg? Probably, but could take response.uri.subString(-3) unless jpeg...
          //type: 'image/jpg',
        };

        // const options = {
        //   keyPrefix: 'images/',
        //   bucket: 'eu-image-bucket',
        //   region: 'eu-west-2',
        //   accessKey: accessKey,
        //   secretKey: secretKey,
        //   successActionStatus: 201,
        // };

        // RNS3.put(file, options).then(s3response => {
        //   if (s3response.status !== 201)
        //     throw new Error('Failed to upload image to S3');
        //   //unnecessary setState, just need to move put request to s3 into video player 'publish' functionality before removing
        //   this.setState({
        //     filePath: response,
        //     fileData: response.data,
        //     fileUri: response.uri,
        //     filePublicURL: s3response.body.postResponse.location,
        //   });
        this.props.onSelected(file, this.props.buttonKey);
        // });
      });
    } else if (this.props.selected) {
      this.props.onSelected(null, this.props.buttonKey);
    }
  };
  renderFileData() {
    if (this.props.file.uri) {
      return (
        <Image
          source={{uri: this.props.file.uri}}
          style={this.props.imageStyle}
        />
      );
    } else
      return (
        <Image source={this.props.placeholder} style={this.props.imageStyle} />
      );
  }

  render() {
    let highlighted = {
      ...this.props.buttonStyle,
      borderWidth: 5,
      borderColor: 'red',
    };
    if (!this.props.highlighted) highlighted = {...this.props.buttonStyle};
    return (
      <TouchableOpacity style={highlighted} onPress={this.chooseImage}>
        {this.renderFileData()}
      </TouchableOpacity>
    );
  }
}
