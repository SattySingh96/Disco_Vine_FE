import React, {Component, Fragment} from 'react';
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
import FeedHeader from '../components/FeedHeader';

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
      require('../assets/Images/IMG_20200110_124928834.jpg'),
      require('../assets/Images/IMG_20200110_124946021.jpg'),
      require('../assets/Images/IMG_20200110_125000678.jpg'),
      require('../assets/Images/IMG_20200110_124946021.jpg'),
      require('../assets/Images/IMG_20200110_125000678.jpg'),
    ],
    images2: [
      require('../assets/Images/IMG_20200110_125013572.jpg'),
      require('../assets/Images/IMG_20200110_125025237.jpg'),
      require('../assets/Images/IMG_20200110_125036630.jpg'),
      require('../assets/Images/IMG_20200110_125013572.jpg'),
      require('../assets/Images/IMG_20200110_125025237.jpg'),
      require('../assets/Images/IMG_20200110_125013572.jpg'),
    ],
    images3: [
      require('../assets/Images/IMG_20200110_125120858.jpg'),
      require('../assets/Images/IMG_20200110_125214258_BURST000_COVER_TOP.jpg'),
      require('../assets/Images/IMG_20200110_125222202.jpg'),
    ],
    sounds1: [
      new Sound(
        'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/snare1.mp3',
      ),
      new Sound('https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/boop.mp3'),
      new Sound(
        'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/rattle.mp3',
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
        'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/splash.mp3',
      ),
      new Sound(
        'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/snare2.mp3',
      ),
      new Sound(
        'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/squeak.mp3',
      ),
      new Sound(
        'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/splash.mp3',
      ),
      new Sound(
        'https://eu-sounds-bucket.s3.eu-west-2.amazonaws.com/squeak.mp3',
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

  //   async componentDidMount() {
  //     await fetch(
  //       'https://0i43ly7yni.execute-api.eu-west-2.amazonaws.com/latest/videos',
  //     ).then(videos => {
  //       this.setState({videos: videos});
  //     });
  //   }

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
      <View>
        <FeedHeader />
        <ScrollView style={styles.body}>
          <View style={styles.views}>
            <View style={styles.vineHeader}>
              <Text style={styles.text}>Dancing Queen</Text>
              <Text style={styles.text}>Jan 23</Text>
            </View>
            <SoundPlaya
              styles={styles.player}
              testImages={this.state.images1}
              soundsToLoad={this.state.sounds1}
            />
            <TouchableOpacity
              style={styles.hearts}
              onPress={() => {
                this.onheartClick1();
              }}>
              {this.state.heart1 === 0 && (
                <Icon
                  style={styles.heart}
                  color={'white'}
                  size={35}
                  name={'md-heart-empty'}></Icon>
              )}
              {this.state.heart1 > 0 && (
                <Icon color={'white'} size={35} name={'md-heart'}></Icon>
              )}
              <Text style={styles.text}>{this.state.heart1}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.views}>
            <View style={styles.vineHeader}>
              <Text style={styles.text}>Funky Town</Text>
              <Text style={styles.text}>Jan 22</Text>
            </View>
            <SoundPlaya
              styles={styles.player}
              testImages={this.state.images2}
              soundsToLoad={this.state.sounds2}
            />
            <TouchableOpacity
              style={styles.hearts}
              onPress={() => {
                this.onheartClick2();
              }}>
              <Icon
                style={styles.heart}
                color={'white'}
                size={35}
                name={'md-heart'}></Icon>
              <Text style={styles.text}>{this.state.heart2}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.views}>
            <View style={styles.vineHeader}>
              <Text style={styles.text}>Disco Stu</Text>
              <Text style={styles.text}>Jan 22</Text>
            </View>
            <SoundPlaya
              styles={styles.player}
              testImages={this.state.images3}
              soundsToLoad={this.state.sounds3}
            />
            <TouchableOpacity
              style={styles.hearts}
              onPress={() => {
                this.onheartClick3();
              }}>
              <Icon
                style={styles.heart}
                color={'white'}
                size={35}
                name={'md-heart'}></Icon>
              <Text style={styles.text}>{this.state.heart3}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'purple',
    position: 'relative',
  },

  views: {
    backgroundColor: 'purple',
    color: 'white',
    height: 440,
    margin: 30,
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  hearts: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  heart: {
    margin: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
    margin: 10,
  },
  player: {
    maxWidth: Dimensions.get('screen').width - 60,
    borderColor: 'black',
    borderWidth: 5,
    zIndex: 3,
    height: 350,
  },
  vineHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderWidth: 5,
  },
  image: {
    height: 20,
  },
});
