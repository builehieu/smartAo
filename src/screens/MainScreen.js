import React, { Component } from 'react';
import { View, Text, YellowBox } from 'react-native';
import DevicesScreen from './Devices';
import ProfileScreen from './Profile';
import StaticSreen from './Static';
import HomeScreen from './Home';
import { createBottomTabNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
const Tab = createBottomTabNavigator ({
    Home: { screen: HomeScreen },
    Static: { screen: StaticSreen },
    Profile: { screen: ProfileScreen },
    Device: { screen: DevicesScreen },
  },
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            iconName = `apps`;
          } else if (routeName === 'Static') {
            iconName = `search`;
          }
          else if (routeName === 'Device') {
            iconName = `control-point`;
          }
          else if (routeName === 'Profile') {
            iconName = `person`;
          }
          return <MaterialIcons name={iconName} size={27} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        showLabel: false,
        activeTintColor: 'black',
        inactiveTintColor: '#d6d6d6',
      },
      tabBarPosition: 'bottom',
      animationEnabled: true,
      swipeEnabled: false,
    }
  );

export default Tab;