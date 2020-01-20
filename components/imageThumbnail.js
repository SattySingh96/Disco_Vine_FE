import React, {Fragment, Component} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
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
