import React, {Component} from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class FeedHeader extends Component {
  state = {};
  render() {
    return (
      <View style={styles.header}>
        <Image
          source={require('../assets/Images/quicklogo.png')}
          style={styles.image}
        />
        <Text style={styles.title}>DISCO VINE</Text>
        <TouchableOpacity style={styles.options}>
          <Icon2
            name={'user-circle-o'}
            size={25}
            color={'white'}
            style={styles.icons}
          />
          <Icon
            name={'options'}
            size={30}
            color={'white'}
            style={styles.icons}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'purple',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  image: {
    alignSelf: 'center',
    marginLeft: 19,
    width: 45,
    aspectRatio: 1,
    margin: 5,
  },
  title: {
    marginLeft: 5,
    color: 'white',
    alignSelf: 'center',
    fontSize: 25,
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-end',
    justifyContent: 'center',
    borderColor: 'white',
    marginRight: 10,
    width: 75,
    height: 50,
  },
  icons: {
    alignSelf: 'center',
    marginHorizontal: 7,
  },
});
