import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import ImageThumbnail from '../components/imageThumbnail';

export default class home extends Component {
  state = {
    images: [{key: 1}, {key: 2}, {key: 3}, {key: 4}, {key: 5}, {key: 6}],
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
            </ScrollView>
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
  },
  horizontalScrollImageView: {
    margin: 10,
  },
  body: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
});
