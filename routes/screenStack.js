import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/home';
import Gallery from '../screens/gallery';
import SlideShow from '../screens/slideShow';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={25} name={'md-home'}></Icon>
        </View>
      ),
      tabBarColor: 'purple',
    },
  },
  Gallery: {
    screen: Gallery,
    navigationOptions: {
      tabBarLabel: 'Gallery',
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon
            style={[{ color: tintColor }]}
            size={25}
            name={'md-photos'}></Icon>
        </View>
      ),
      tabBarColor: '#F39C11',
    },
  },
  SlideShow: {
    screen: SlideShow,
    navigationOptions: {
      tabBarLabel: 'Clips',
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={25} name={'md-film'}></Icon>
        </View>
      ),
      tabBarColor: 'purple',
    },
  },
};

const bottomTab = createMaterialBottomTabNavigator(screens, {
  initialRouteName: 'Home',
  activeColor: '#FFFFFF',
  inactiveColor: '#FFFFFF',
  backBehavior: 'order',
  barStyle: { backgroundColor: '#FFFFFF' },
  shifting: true,
});

export default createAppContainer(bottomTab);
