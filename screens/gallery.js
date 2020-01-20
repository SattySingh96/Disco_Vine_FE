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

export default class Gallery extends Component {
  state = {
    images: [{key: '1', selected: false, file: {data: '', uri: ''}}],
    addToTrack: 0,
  };
  selectMedia = (fileData, buttonKey) => {
    if (this.state.addToTrack === 0) {
      if (fileData.data) {
        this.setState(({images}) => {
          const newImages = [
            ...images,
            {
              key: (images.length + 1).toString(),
              selected: false,
              file: {data: '', uri: ''},
            },
          ];
          newImages[buttonKey].selected = true;
          newImages[buttonKey].file = fileData;
          return {images: newImages};
        });
      }
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
                  addToTrack={this.state.addToTrack}
                  onSelected={this.selectMedia}
                  selected={item.selected}
                  file={item.file}
                  buttonKey={index}
                />
              )}
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
  body: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'column-reverse',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
    alignContent: 'flex-start',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: '#E0E0E0',
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
});
