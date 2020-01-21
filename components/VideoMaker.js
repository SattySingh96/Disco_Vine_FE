import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import ToggleButton from './ToggleButton';
import ImageThumbnail from './imageThumbnail';

export default class VideoMaker extends Component {
  state = {
    hidden: true,
  };

  setHidden = () => {
    this.setState(currentState => {
      return {hidden: !currentState.hidden};
    });
  };
  clickHandler = (thing, key) => {
    this.props.fetchToSlideShow(key);
  };

  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <ToggleButton showHide={this.setHidden} hidden={this.state.hidden} />
        {!this.state.hidden && (
          <FlatList
            horizontal={true}
            data={this.props.tiles}
            style={styles.horizontalScrollImageView}
            renderItem={({item, index}) => (
              <ImageThumbnail
                onSelected={this.clickHandler}
                selected={true}
                file={item.imgFile}
                buttonKey={index}
                imageStyle={styles.imageCard}
              />
            )}
          />
        )}
        {/* take props and map an array of button elements
          -- need to pass down the array of img data and the onpress functions
          -- 1. onPress = pick from gallery
          -- 2. onPress = choose or delete from slideshow
          -- 3. LongPress = delete */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  horizontalRow: {flexWrap: 'wrap', justifyContent: 'flex-start'},
  horizontalScrollImageView: {
    marginRight: 10,
    paddingTop: 30,
    flex: 1,
  },
  imageCard: {
    borderRadius: 10,
    height: Dimensions.get('screen').width / 3.7,
    width: Dimensions.get('screen').width / 3.7,
  },
});
