import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';

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
            <TouchableOpacity onPress={() => { }}
              style={styles.HomeButtons}>

              <Text style={styles.ButtonText}>SIGN IN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}
              style={styles.HomeButtons}>
              <Text style={styles.ButtonText}>Options</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground >
      </View >
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  HomeButtons: {
    height: 70,
    width: 160,
    borderStyle: 'solid',
    borderWidth: 4,
    borderRadius: 12,
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: 'white'

  },
  ButtonText: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: 25,
    color: 'white'
  },
});
