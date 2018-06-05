import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { List, ListItem } from 'react-native-elements'
import { makeCircle } from '../utils/metrics';

const list = [
    {
        title: 'Appointments',
        icon: 'av-timer'
    },
    {
        title: 'Trips',
        icon: 'flight-takeoff'
    },
]

const styles = StyleSheet.create({
    avatarWrapper: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarImg: {
        ...makeCircle(48),
    },
});


import { StackNavigator } from 'react-navigation';

export default class ProfileScreen extends React.Component {
    render() {
        return (
           
                <List>
                    {
                        list.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={{ name: item.icon }}
                            />
                        ))
                    }
                </List>
            
        );
    }
}