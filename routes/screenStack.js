import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/home';
import Gallery from '../screens/gallery';
import SlideShow from '../screens/slideShow';

const screens = {
  home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <View>
          <Icon style={[{color: tintColor}]} size={25} name={'md-home'}></Icon>
        </View>
      ),
      tabBarColor: '#E74C3B',
    },
  },
  gallery: {
    screen: Gallery,
    navigationOptions: {
      tabBarLabel: 'Gallery',
    },
  },
  slideShow: {
    screen: SlideShow,
    navigationOptions: {
      tabBarLabel: 'Clips',
    },
  },
};

const bottomTab = createMaterialBottomTabNavigator(screens, {
  initialRouteName: 'home',
  activeColor: '#FFFFFF',
  inactiveColor: '#FFFFFF',
  backBehavior: 'order',
  barStyle: {backgroundColor: '#FFFFFF'},
  shifting: true,
});

export default createAppContainer(bottomTab);
