import React, { Fragment, Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class ImageThumbnail extends Component {

  state = {
    filePath: {
      data: '',
      uri: '',
    },
    fileData: '',
    fileUri: '',
  };



  chooseImage = () => {
    const options = {
      title: '',
      storageOptions: { skipBackUp: true, path: 'images' },
    };
    ImagePicker.showImagePicker(options, response => {
      const source = { uri: response.uri };
      this.setState({
        filePath: response,
        fileData: response.data,
        fileUri: response.uri,
      });
      console.log(this.state.fileData)
    });
  };


  renderFileData() {
    if (this.state.fileData) {
      return (
        <Image
          source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
          style={styles.imageCard}
        />
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
      <TouchableOpacity style={styles.opacity} onPress={this.chooseImage} disabled={this.state.pressed}>
        {this.renderFileData()}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  imageCard: {
    width: 150,
    height: 150,
    borderRadius: 19,
  },
  opacity: {
    width: 150,
    marginLeft: 80,
    margin: 15
  }
});
