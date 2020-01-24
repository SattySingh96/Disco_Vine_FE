import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
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
          video: 'my video',
          // videoObject,
        }),
      },
    ).then(fetchedResponse => {
      console.log(fetchedResponse);
    });
  };
  render() {
    return (
      <TouchableOpacity
        style={styles.publishButton}
        onPress={this.makeVideoShareable}>
        <Text style={styles.text}>PUBLISH</Text>
        <Icon
          style={styles.icon}
          color={'#3b5998'}
          size={20}
          name={'md-cloud-upload'}></Icon>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  publishButton: {
    width: 100,
    height: 50,
    backgroundColor: 'purple',
    borderStyle: 'solid',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  icon: {
    color: 'white',
    margin: 5,
  },
  text: {
    color: 'white',
    margin: 5,
  },
});
