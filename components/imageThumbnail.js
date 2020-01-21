import React, {Fragment, Component} from 'react';
import {StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class ImageThumbnail extends Component {
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
        <Image
          source={require('../assets/Images/gallery-placeholder.jpg')}
          style={this.props.imageStyle}
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
  opacity: {
    // width: 120,
    margin: 8,
  },
});
