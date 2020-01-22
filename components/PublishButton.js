import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ImageThumbnail extends Component {
  makeVideoShareable = async () => {
    //put in user_id
    const videoObject = this.props.videoObject;
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
