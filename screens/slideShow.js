import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import PublishButton from '../components/PublishButton';
import Icon from 'react-native-vector-icons/Ionicons';
import SoundPlaya from '../components/SoundPlaya';

export default class SlideShow extends Component {
  state = {
    testSounds: [
      {
        url:
          'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/191478__urupin__ping-ping.wav',
        pose: 'TPose',
      },
      {
        url:
          'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/376523__djfroyd__mystical-sound-sample.wav',
        pose: 'Dab',
      },
    ],

    testImages: [
      require('../assets/Images/img.png'),
      require('../assets/Images/002.png'),
      require('../assets/Images/003.png'),
    ],
  };

  render() {
    return (
      <ScrollView style={styles.slideShowContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Icon color={'#3b5998'} size={10} name={'md-arrow-round-back'}></Icon>
          <Text>GO BACK</Text>
        </TouchableOpacity>
        <PublishButton
          style={styles.button}
          tiles={this.props.navigation.getParam('tiles', 'no tiles')}
        />
        <SoundPlaya
          style={styles.soundPlayerContainer}
          testImages={this.state.testImages}
          soundsToLoad={this.state.testSounds}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  soundPlayerContainer: {
    flex: 4,
    height: Dimensions.get('screen').height / 2,
  },
  slideShowContainer: {
    flexDirection: 'column',
  },
});
