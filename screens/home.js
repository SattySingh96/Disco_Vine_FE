import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/src/styles/colors';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.HomeContainer}>
        <ImageBackground style={{
          flex: 1,
          alignSelf: 'stretch',
          resizeMode: 'stretch',
          width: undefined,
          height: undefined,
        }} source={require('/home/mattg95/Documents/proj/Disco_Vine_FE/assets/Images/giphy.gif')} >
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
        </ImageBackground >
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
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  HomeButtons: {
    height: 70,
    width: 160,
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    margin: 50,
    alignSelf: 'center',

  },
  ButtonText: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: 25,
    color: 'white',
  },
});
