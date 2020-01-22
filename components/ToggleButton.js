import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ToggleButton = ({showHide, hidden}) => {
  const innerText = hidden ? 'Show' : 'Hide';
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        showHide();
      }}>
      <Text>{innerText}</Text>
    </TouchableOpacity>
  );
};

export default ToggleButton;
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 20,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 120,
    right: 20,
    zIndex: 1,
  },
});
