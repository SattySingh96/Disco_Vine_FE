import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { navigation } from 'react-navigation'

export default class home extends Component {
  render() {
    return (
      <View style={styles.HomeContainer}>
        <TouchableOpacity style={styles.HomeButtons} onPress={() => {
          this.props.navigation.navigate('Gallery')
        }}>
          <Text style={styles.ButtonText}>CREATE</Text>
        </TouchableOpacity>


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
  HomeButtons: {
    height: 70,
    width: 160,
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderColor: 'purple',
    borderRadius: 10,
    justifyContent: 'center'
  },
  ButtonText: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: 25,
    color: 'purple'




  }



})
