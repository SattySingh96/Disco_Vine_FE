import React, { Component, Fragment } from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import ImageThumbnail from '../components/imageThumbnail';

export default class Gallery extends Component {
  state = {
    images: [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }, { key: 5 }, { key: 6 }],
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <View style={styles.body}>
          <View style={styles.ImageSections}>
            <ScrollView
              style={styles.horizontalScrollImageView}
              showsVerticalScrollIndicator={false}>
              <ImageThumbnail />
              <ImageThumbnail />
              <ImageThumbnail />
              <ImageThumbnail />
              <ImageThumbnail />
              <ImageThumbnail />
              <ImageThumbnail />
              <ImageThumbnail />
              <ImageThumbnail />
            </ScrollView>
          </View>
        </View>
      </Fragment >
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FFFFFF',
    backgroundColor: 'pink',
    marginHorizontal: 20,
    height: 100
  },
  horizontalScrollImageView: {
    margin: 10,
  },
  body: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1
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
    backgroundColor: '#E0E0E0'
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
});
