import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class home extends Component {
  render() {
    return (
      <View style={styles.HomeContainer}>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity style={styles.HomeButtons} onPress={() => {
            this.props.navigation.navigate('Gallery')
          }}>
            <Text style={styles.ButtonText}>CREATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.HomeButtons} onPress={() => {
            this.props.navigation.navigate('SlideShow')
          }}>
            <Text style={styles.ButtonText}>VIEW</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  HomeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  ButtonContainer: {
    height: 500,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  HomeButtons: {
    height: 70,
    width: 160,
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderColor: 'purple',
    borderRadius: 12,
    justifyContent: 'center',
    margin: 50,
  },
  ButtonText: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: 25,
    color: 'purple'
  }

})
