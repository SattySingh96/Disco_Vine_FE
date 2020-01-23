import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ImageThumbnail from '../components/imageThumbnail';
import VideoMaker from '../components/VideoMaker';
import Sound from 'react-native-sound';

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

const soundRandomiser = () => {
  const stances = [
    'T-Pose',
    'Left Dab',
    'Right Dab',
    'Squat',
    'Power Stance',
    'Pencil',
    'Tree',
    'Special-K',
    'Rock',
  ];
  console.log(stances[Math.floor(Math.random() * Math.floor(9))]);
  return stances[Math.floor(Math.random() * Math.floor(9))].toString();
};

export default class Gallery extends Component {
  state = {
    images: [
      {
        key: '1',
        selected: false,
        imgFile: {data: '', uri: ''},
      },
    ],
    placeholder: require('../assets/Images/gallery-placeholder.jpg'),
    addToTrack: null,
    tiles: [
      {
        key: '1',
        imgFile: {data: '', uri: ''},
        sound: {url: ''},
        highlighted: false,
      },
      {
        key: '2',
        imgFile: {data: '', uri: ''},
        sound: {url: ''},
        highlighted: false,
      },
      {
        key: '3',
        imgFile: {data: '', uri: ''},
        sound: {url: ''},
        highlighted: false,
      },
      {
        key: '4',
        imgFile: {data: '', uri: ''},
        sound: {url: ''},
        highlighted: false,
      },
      {
        key: '5',
        imgFile: {data: '', uri: ''},
        sound: {url: ''},
        highlighted: false,
      },
      {
        key: '6',
        imgFile: {data: '', uri: ''},
        sound: {url: ''},
        highlighted: false,
      },
      {
        key: '7',
        imgFile: {data: '', uri: ''},
        sound: {url: ''},
        highlighted: false,
      },
      {
        key: '8',
        imgFile: {data: '', uri: ''},
        sound: {url: ''},
        highlighted: false,
      },
      {
        key: '9',
        imgFile: {data: '', uri: ''},
        sound: {url: ''},
        highlighted: false,
      },
      {
        key: '10',
        imgFile: {data: '', uri: ''},
        sound: {url: ''},
        highlighted: false,
      },
    ],
  };
  loadSound = poseName => {
    console.dir(poseName);
    console.dir(soundLinks[poseName]);
    const newSound = new Sound(soundLinks[poseName], undefined, error => {
      if (error) {
        console.log('failed to load the sound', error);
        alert('problem loading sounds');
        return;
      }
    });
    return newSound;
  };

  fetchToSlideShow = destinationKey => {
    this.setState(({tiles}) => {
      const newTiles = [...tiles];
      newTiles[destinationKey].highlighted = true;
      return {tiles: newTiles, addToTrack: [destinationKey]};
    });
  };
  tapGalleryButton = (file, buttonKey) => {
    if (this.state.addToTrack === null) {
      if (file && file.uri) {
        this.setState(({images}) => {
          const newImages = [
            ...images,
            {
              key: (images.length + 1).toString(),
              selected: false,
              imgFile: {data: '', uri: ''},
            },
          ];
          const newSound = this.loadSound(soundRandomiser());
          newImages[buttonKey].selected = true;
          newImages[buttonKey].imgFile = file;
          newImages[buttonKey].sound = newSound;
          return {images: newImages};
        });
      } else this.state.images[buttonKey].sound.play();
    } else {
      this.setState(
        ({tiles, images}) => {
          const newTiles = [...tiles];
          newTiles[this.state.addToTrack].imgFile = images[buttonKey].imgFile;
          newTiles[this.state.addToTrack].sound = images[buttonKey].sound;
          newTiles[this.state.addToTrack].highlighted = false;
          return {tiles: newTiles};
        },
        () => {},
      );
      this.setState(({tiles}) => {
        const newTiles = [...tiles];
        newTiles[buttonKey].highlighted = false;
        return {tiles: newTiles, addToTrack: null};
      });
    }
  };
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <View style={styles.body}>
          <FlatList
            extraData={this.state.images}
            columnWrapperStyle={styles.horizontalRow}
            numColumns={3}
            style={styles.horizontalScrollImageView}
            data={this.state.images}
            renderItem={({item, index}) => (
              <ImageThumbnail
                onSelected={this.tapGalleryButton}
                selected={item.selected}
                file={item.imgFile}
                buttonKey={index}
                imageStyle={styles.imageCard}
                buttonStyle={styles.buttonStyle}
                placeholder={this.state.placeholder}
                highlighted={false}
              />
            )}
          />
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
              justifyContent: 'flex-start',
            }}>
            Hello
          </Text>
          <TouchableOpacity
            style={styles.createVidBtn}
            title={'create video'}
            onPress={() => {
              this.props.navigation.navigate('SlideShow', {
                tiles: this.state.tiles,
              });
            }}>
            <Text style={{marginLeft: 2, color: 'white', alignSelf: 'center'}}>
              CREATE VIDEO
            </Text>
          </TouchableOpacity>
          <VideoMaker
            tiles={this.state.tiles}
            fetchToSlideShow={this.fetchToSlideShow}
            style={styles.VideoMaker}
            border={this.state.addToTrack}
          />
        </View>
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  createVidBtn: {
    backgroundColor: '#f57f17',
    borderColor: '#f57f17',
    borderWidth: 0,
    padding: 5,
    borderRadius: 13,
    width: 150,
    alignSelf: 'center',
    position: 'relative',
    left: 90,
    marginBottom: 5,
  },
  VideoMaker: {},
  buttonStyle: {
    margin: Dimensions.get('screen').width / 40,
  },
  scrollView: {
    backgroundColor: '#FFFFFF',
    backgroundColor: 'pink',
    marginHorizontal: 20,
    height: 100,
  },
  horizontalRow: {flexWrap: 'wrap', justifyContent: 'flex-start'},
  horizontalScrollImageView: {
    marginRight: 10,
    paddingTop: 1,
    flex: 2,
  },
  imageCard: {
    width: 120,
    height: 120,
    borderRadius: 10,
    height: Dimensions.get('screen').width / 3.7,
    width: Dimensions.get('screen').width / 3.7,
  },
  body: {
    flexDirection: 'column',
    backgroundColor: '#01579b',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    flex: 1,
    paddingBottom: 0,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 8,
    paddingVertical: 8,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: '#E0E0E0',
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
});
