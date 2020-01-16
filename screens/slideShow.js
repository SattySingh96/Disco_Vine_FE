import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {LogLevel, RNFFmpeg} from 'react-native-ffmpeg';

RNFFmpeg.execute('-i file1.mp4 -c:v mpeg4 file2.mp4').then(result =>
  console.log('FFmpeg process exited with rc ' + result.rc),
);

export default class slideshow extends Component {
  render() {
    return (
      <View>
        <Video
          source={{
            uri:
              'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          }}
          style={styles.backgroundVideo}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    width: 400,
    height: 400,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
