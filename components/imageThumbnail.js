import React, {Component} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class ImageThumbnail extends Component {
  chooseImage = () => {
    const options = {
      title: '',
      storageOptions: {skipBackUp: true, path: 'images'},
    };
    if (!this.props.selected) {
      ImagePicker.showImagePicker(options, response => {
        const localTime = new Date().getTime();
        const file = {
          data: response.data,
          uri: response.uri,
        };
        this.props.onSelected(file, this.props.buttonKey);
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
