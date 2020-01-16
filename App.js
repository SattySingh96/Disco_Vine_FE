import React from 'react';
import Navigator from './routes/screenStack';
import { StyleSheet } from 'react-native'

export default function App() {
  return <Navigator style={styles.Navigator} />;
}

const styles = StyleSheet.create({
  Navigator: {
    flex: 1
  }
})
