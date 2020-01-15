import React, {Fragment, Component} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class imageThumbnail extends Component {
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
      storageOptions: {skipBackUp: true, path: 'images'},
    };
    ImagePicker.showImagePicker(options, response => {
      const source = {uri: response.uri};
      this.setState({
        filePath: response,
        fileData: response.data,
        fileUri: response.uri,
      });
    });
  };
  renderFileData() {
    if (this.state.fileData) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + this.state.fileData}}
          style={styles.imageCard}
        />
      );
    } else
      return (
        <Image
          source={require('../assets/gallery-placeholder.jpg')}
          style={styles.imageCard}
        />
      );
  }
  render() {
    return (
      <TouchableOpacity onPress={this.chooseImage}>
        {this.renderFileData()}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  images: {
    width: 200,
    height: 250,
    borderWidth: 1,
    borderRadius: 19,
    borderWidth: 1,
    marginHorizontal: 70,
  },
});
