import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, Math, Dimensions, ScrollView, StatusBar, Image } from 'react-native';
import { AppConsumer } from '../components/Provider';

import { Defs, LinearGradient, Stop } from 'react-native-svg'
import { LineChart, BarChart, Grid, ProgressCircle, YAxis, XAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import * as scale from 'd3-scale'

import Garden from './Garden';
import { createStackNavigator } from 'react-navigation';

import io from 'socket.io-client/dist/socket.io'
window.navigator.userAgent = 'react-native'

//charts libs
var e;
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    root: {
        flex: 1,
        //justifyContent: 'flex-start',
        backgroundColor: '#ededf8',
    },
    dataWrapper: {

        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    header: {
        height: 80,
        marginBottom: 20,
        justifyContent: 'center',
        backgroundColor: '#b3e5fc',
    },
    chartWrapper: {
        width: screenWidth / 2 - 20,
        height: 200,
        padding: 15,
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'blue',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1.0,
        shadowRadius: 5,
        justifyContent: 'flex-end',

    },
    inputWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        //  backgroundColor: 'orange'
    },
    buttonsWrapper: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        //  backgroundColor: 'cyan'
    },
    textInput: {
        borderWidth: 1,
        backgroundColor: '#faf9f9',
        borderColor: '#e4e4e4',
        margin: 5,
        paddingLeft: 18,
        borderRadius: 30,
        width: '78%',
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    buttonLable: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    link: {
        color: '#0c9eff',
        fontSize: 13,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
    },
    button: {
        backgroundColor: '#0c9eff',
        padding: 10,
        width: '60%',
        margin: 5,
        borderRadius: 30,
    },
    smallButton: {
        alignSelf: 'center'
    },
    image: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: 160,
        width: screenWidth / 2 - 20,

    },
    imageicon: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: 80,
        width: 80,
    }
})


class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            test: 'alooooo',
            cam_bien1: [50, 10, 40, 95, -4, -24, 85, 21, 35, 53, -53,],
            cam_bien2: [90, -10, 40, 35, -54, -24, 80, 9, 53, 23, 53,],
        }
        e = this;
        this.socket = io('http://172.16.117.121:3000', { jsonp: false });
        this.socket.on('authenticated', function (data) {
            ToastAndroid.show('Welcome ' + data, ToastAndroid.SHORT);
        });
        this.socket.on('data_cambien1', (data) => {
            console.log('cam bien 1: ', data);
            var f = this.state.cam_bien1.concat(data);
            console.log('f: ', f);
            f.splice(0, 1);
            console.log('f after delete: ', f);
            e.setState({ cam_bien1: f });
        });
    }



    render() {
        const xAxisHeight = 30
        const verticalContentInset = { top: 10, bottom: 10 }
        const axesSvg = { fontSize: 10, fill: 'grey' };

        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'blue'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
                    <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
                </LinearGradient>
                <LinearGradient id={'red'} x1={'0'} y={'60%'} x2={'0%'} y2={'60%'}>
                    <Stop offset={'0%'} stopColor={'#ff0000'} />
                    <Stop offset={'100%'} stopColor={'#ff0066'} />
                </LinearGradient>
                <LinearGradient id={'yellow'} x1={'0'} y={'50%'} x2={'0%'} y2={'60%'}>
                    <Stop offset={'0%'} stopColor={'#ffff00'} />
                    <Stop offset={'100%'} stopColor={'#ff9933'} />
                </LinearGradient>
            </Defs>
        );

        return (
            <AppConsumer>
                {({ username, setUsername }) => (
                    <View style={styles.root}>
                        <StatusBar
                            backgroundColor="#19194d"
                            barStyle="light-content"
                        />
                        <View style={styles.header}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginLeft: 20, fontSize: 25, fontWeight: 'bold' }}>Vườn</Text>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                                </View>
                            </View>
                        </View>
                        <ScrollView>

                            <View style={styles.dataWrapper}>
                                <TouchableOpacity style={styles.chartWrapper} onPress={() => this.props.navigation.navigate('Garden')}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 2 - 50, height: 150 }}>
                                        <Image source={{ uri: 'https://image.flaticon.com/icons/png/128/135/135620.png' }}
                                            style={styles.imageicon} />
                                    </View>
                                    <Text style={styles.text}>Cam</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={styles.chartWrapper} onPress={() => this.props.navigation.navigate('Garden')}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 2 - 50, height: 150 }}>
                                        <Image source={{ uri: 'https://image.flaticon.com/icons/png/128/135/135687.png' }}
                                            style={styles.imageicon} />
                                    </View>
                                    <Text style={styles.text}>Cà rốt</Text>

                                </TouchableOpacity>
                            </View>
                            <View style={styles.dataWrapper}>
                                <TouchableOpacity style={styles.chartWrapper} onPress={() => this.props.navigation.navigate('Garden')}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 2 - 50, height: 150 }}>
                                        <Image source={{ uri: 'https://image.flaticon.com/icons/png/128/135/135761.png' }}
                                            style={styles.imageicon} />
                                    </View>
                                    <Text style={styles.text}>Chanh</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={styles.chartWrapper} onPress={() => this.props.navigation.navigate('Garden')}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth / 2 - 50, height: 150 }}>
                                        <Image source={{ uri: 'https://image.flaticon.com/icons/png/128/135/135702.png' }}
                                            style={styles.imageicon} />
                                    </View>
                                    <Text style={styles.text}>Cà Chua</Text>

                                </TouchableOpacity>
                            </View>

                        </ScrollView>

                    </View>
                )}
            </AppConsumer>
        );
    }
}
export default GardenNavigation = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Garden: {
        screen: Garden,
    },
},
    {
        headerMode: 'none',
        initialRouteName: 'Home',
    }
);
