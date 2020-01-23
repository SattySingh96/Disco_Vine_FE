import {FlatList} from 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  View,
  Dimensions,
} from 'react-native';
import SoundPlaya from '../components/SoundPlaya';
import Icon from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';

//hardcode sounds
//hardcode image
const soundLinks = {
  'T-Pose': 'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/boing.mp3',
  'Left Dab': 'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/wobble.mp3',
  'Right Dab':
    'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/reverse_chime.mp3',
  Squat: 'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/squeak.mp3',
  'Power Stance':
    'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/splash.mp3',
  Pencil: 'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/snare2.mp3',
  Tree: 'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/snare1.mp3',
  'Special-K': 'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/boop.mp3',
  Rock: 'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/rattle.mp3',
};

export default class Feed extends Component {
  state = {
    videos: [],
    images1: [
      {
        uri:
          'https://eu-image-bucket.s3.eu-west-2.amazonaws.com/images/06173317.jpg',
      },
      {
        uri:
          'https://eu-image-bucket.s3.eu-west-2.amazonaws.com/images/06173317.jpg',
      },
      {
        uri:
          'https://eu-image-bucket.s3.eu-west-2.amazonaws.com/images/10785705.jpg',
      },
    ],
    images2: [
      {
        uri:
          'https://eu-image-bucket.s3.eu-west-2.amazonaws.com/images/11662940.jpg',
      },
      {
        uri:
          'https://eu-image-bucket.s3.eu-west-2.amazonaws.com/images/11760407.jpg',
      },
      {
        uri:
          'https://eu-image-bucket.s3.eu-west-2.amazonaws.com/images/13197178.jpg',
      },
    ],
    images3: [
      {
        uri:
          'https://eu-image-bucket.s3.eu-west-2.amazonaws.com/images/16026045.jpg',
      },
      {
        uri:
          'https://eu-image-bucket.s3.eu-west-2.amazonaws.com/images/18180045.jpg',
      },
      {
        uri:
          'https://eu-image-bucket.s3.eu-west-2.amazonaws.com/images/18593376.jpg',
      },
    ],
    sounds1: [
      new Sound(
        'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/snare1.mp3',
      ),
      new Sound('https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/boop.mp3'),
      new Sound(
        'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/rattle.mp3',
      ),
    ],
    sounds2: [
      new Sound(
        'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/squeak.mp3',
      ),
      new Sound(
        'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/squeak.mp3',
      ),
      new Sound(
        'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/snare2.mp3',
      ),
    ],
    sounds3: [
      new Sound(
        'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/boing.mp3',
      ),
      new Sound(
        'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/wobble.mp3',
      ),
      new Sound(
        'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/reverse_chime.mp3',
      ),
    ],
    heart1: 0,
    heart2: 5,
    heart3: 3,
  };

  async componentDidMount() {
    await fetch(
      'https://0i43ly7yni.execute-api.eu-west-2.amazonaws.com/latest/videos',
    ).then(videos => {
      this.setState({videos: videos});
    });
  }

  onheartClick1 = () => {
    this.setState(currentState => {
      return {heart1: currentState.heart1 + 1};
    });
  };

  onheartClick2 = () => {
    this.setState(currentState => {
      return {heart2: currentState.heart2 + 1};
    });
  };

  onheartClick3 = () => {
    this.setState(currentState => {
      return {heart3: currentState.heart3 + 1};
    });
  };

  render() {
    return (
      <ScrollView>
        {/* {header} */}
        <View style={styles.header}>
          <Image
            source={require('../assets/Images/quicklogo.png')}
            style={styles.image}
          />
          <Text>DISCO VINE</Text>
        </View>
        <View style={styles.view1}>
          <SoundPlaya
            testImages={this.state.images1}
            soundsToLoad={this.state.sounds1}
          />
          <TouchableOpacity
            onPress={() => {
              this.onheartClick1();
            }}>
            {this.state.heart1 === 0 && (
              <Icon color={'#E74C3B'} size={25} name={'md-heart-empty'}></Icon>
            )}
            {this.state.heart1 > 0 && (
              <Icon color={'#E74C3B'} size={25} name={'md-heart'}></Icon>
            )}
            <Text>{this.state.heart1}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view2}>
          <SoundPlaya
            testImages={this.state.images2}
            soundsToLoad={this.state.sounds2}
          />
          <TouchableOpacity
            onPress={() => {
              this.onheartClick2();
            }}>
            <Icon color={'#E74C3B'} size={25} name={'md-heart'}></Icon>
            <Text>{this.state.heart2}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view3}>
          <SoundPlaya
            testImages={this.state.images3}
            soundsToLoad={this.state.sounds3}
          />
          <TouchableOpacity
            onPress={() => {
              this.onheartClick3();
            }}>
            <Icon color={'#E74C3B'} size={25} name={'md-heart'}></Icon>
            <Text>{this.state.heart3}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
    //<FlatList data={this.state.videos} />;
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'purple',
  },
  view1: {
    backgroundColor: 'purple',
  },
  view2: {
    backgroundColor: 'purple',
  },
  view3: {
    backgroundColor: 'purple',
  },
  image: {
    height: 20,
  },
});
