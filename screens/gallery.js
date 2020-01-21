import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import ImageThumbnail from '../components/imageThumbnail';
import VideoMaker from '../components/VideoMaker';

export default class Gallery extends Component {
  state = {
    images: [{key: '1', selected: false, imgFile: {data: '', uri: ''}}],
    addToTrack: null,
    tiles: [
      {key: '1', imgFile: {data: '', uri: ''}, sound: {url: ''}},
      {key: '2', imgFile: {data: '', uri: ''}, sound: {url: ''}},
      {key: '3', imgFile: {data: '', uri: ''}, sound: {url: ''}},
      {key: '4', imgFile: {data: '', uri: ''}, sound: {url: ''}},
      {key: '5', imgFile: {data: '', uri: ''}, sound: {url: ''}},
      {key: '6', imgFile: {data: '', uri: ''}, sound: {url: ''}},
      {key: '7', imgFile: {data: '', uri: ''}, sound: {url: ''}},
      {key: '8', imgFile: {data: '', uri: ''}, sound: {url: ''}},
      {key: '9', imgFile: {data: '', uri: ''}, sound: {url: ''}},
      {key: '10', imgFile: {data: '', uri: ''}, sound: {url: ''}},
    ],
  };

  fetchToSlideShow = destinationKey => {
    this.setState({addToTrack: [destinationKey]});
  };
  tapGalleryButton = (file, buttonKey) => {
    if (this.state.addToTrack === null) {
      if (file.uri) {
        this.setState(({images}) => {
          const newImages = [
            ...images,
            {
              key: (images.length + 1).toString(),
              selected: false,
              imgFile: {data: '', uri: ''},
            },
          ];
          newImages[buttonKey].selected = true;
          newImages[buttonKey].imgFile = file;
          return {images: newImages};
        });
      }
    } else {
      this.setState(
        ({tiles, images}) => {
          const newTiles = [...tiles];
          newTiles[this.state.addToTrack].imgFile = images[buttonKey].imgFile;
          return {tiles: newTiles};
        },
        () => {},
      );
      this.setState({addToTrack: null});
    }
  };
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <View style={styles.body}>
          <View style={styles.ImageSections}>
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
                />
              )}
            />
            <VideoMaker
              tiles={this.state.tiles}
              fetchToSlideShow={this.fetchToSlideShow}
              style={{alignContent: 'flex-start'}}
            />
          </View>
        </View>
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FFFFFF',
    backgroundColor: 'pink',
    marginHorizontal: 20,
    height: 100,
  },
  horizontalRow: {flexWrap: 'wrap', justifyContent: 'flex-start'},
  horizontalScrollImageView: {
    marginRight: 10,
    paddingTop: 30,
    flex: 1,
  },
  imageCard: {
    width: 120,
    height: 120,
    borderRadius: 10,
    height: Dimensions.get('screen').width / 3.7,
    width: Dimensions.get('screen').width / 3.7,
  },
  body: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 8,
    paddingVertical: 8,
    // justifyContent: 'center',
    // alignContent: 'flex-start',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: '#E0E0E0',
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
});
