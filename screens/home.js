import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import FeedHeader from '../components/FeedHeader';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.HomeContainer}>
        <ImageBackground
          style={{
            flex: 1,
            alignSelf: 'stretch',
            resizeMode: 'stretch',
            width: undefined,
            height: undefined,
          }}
          source={require('../assets/Images/giphy.gif')}>
          <FeedHeader />
          <View style={styles.ButtonContainer}>
            <TouchableOpacity
              style={styles.HomeButtons}
              onPress={() => {
                this.props.navigation.navigate('Gallery');
              }}>
              <Text style={styles.ButtonText}>CREATE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.HomeButtons}
              onPress={() => {
                this.props.navigation.navigate('SlideShow');
              }}>
              <Text style={styles.ButtonText}>VIEW</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  BacgkroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    resizeMode: 'stretch',
    width: undefined,
    height: undefined,
  },

  ButtonContainer: {
    height: 500,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  HomeButtons: {
    height: 70,
    width: 160,
    margin: 50,
    borderStyle: 'solid',
    borderWidth: 4,
    borderRadius: 12,
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: 'purple',
    backgroundColor: '#d8e0f4',
  },
  ButtonText: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: 25,
    color: 'purple',
  },
});
