import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, StyleSheet, ToastAndroid, Math, Dimensions, ScrollView } from 'react-native';
import DevicesScreen from './Devices';
import ProfileScreen from './Profile';
import StaticSreen from './Static';
import { StackNavigator, TabNavigator, TabBarBottom, } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppConsumer } from '../components/Provider';
import { ACCESS_TOKEN } from '../utils/constants';


import io from 'socket.io-client/dist/socket.io';
window.navigator.userAgent = 'react-native';

import PureChart from 'react-native-pure-chart';
//charts libs
var e;
const styles = StyleSheet.create({
    root: {
        flex: 1,
        //justifyContent: 'flex-start',
        backgroundColor: '#f2f1ed',
    },
    dataWrapper: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'flex-start',

    },
    chartWrapper: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 15,
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
        paddingLeft:10,
        paddingBottom: 10,
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
    }
})
const screenWidth = Dimensions.get('window').width;

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        e = this;
        this.socket = io('http://172.30.115.66:3000', { jsonp: true });
        this.socket.on('authenticated', function (data) {
            ToastAndroid.show('Welcome ' + data, ToastAndroid.SHORT);
        });
        this.socket.on('data', (data) => {
            ToastAndroid.show('Welcome ' + data.cam_bien1, ToastAndroid.SHORT);
            this.setState({ cambien1: data.cam_bien1 });
            this.setState({ cambien2: data.cam_bien2 })
            console.log(data);
        });
    }
    state = {

        test: 'alooooo',
        cambien1: '',
        cambien2: '',
    }


    render() {
        let sampleDataPie = [
            {
                value: 50,
                label: 'Marketing',
                color: '#ffbe63',
            }, {
                value: 10,
                label: 'Sales',
                color: '#297AB1'
            }, {
                value: 40,
                label: 'Support',
                color: '#9dd671'
            }

        ]

        let sampleData = [
            {
                seriesName: 'series1',
                data: [
                    { x: '10', y: 30 },
                    { x: '11', y: 200 },
                    { x: '12', y: 170 },
                    { x: '13', y: 250 },
                    { x: '14', y: 10 }
                ],
                color: '#297AB1'
            },
            {
                seriesName: 'series2',
                data: [
                    { x: '10', y: 20 },
                    { x: '11', y: 100 },
                    { x: '12', y: 140 },
                    { x: '13', y: 500 },
                    { x: '14', y: 40 }
                ],
                color: 'purple'
            }
        ]
        return (
            <AppConsumer>
                {({ username, setUsername }) => (
                    <ScrollView style={styles.root}>
                        <View style={styles.dataWrapper}>
                            <Text style={styles.text}
                            >Tổng quan</Text>
                            <View style={styles.chartWrapper}>
                                <PureChart
                                    data={sampleDataPie}
                                    type={'pie'}
                                />
                            </View>
                        </View>
                        <View style={styles.dataWrapper}>
                            <Text style={styles.text}
                            >Độ ẩm tuần 2 T6</Text>
                            <View style={styles.chartWrapper}>
                                <PureChart type={'line'}
                                    data={sampleData}
                                    width={'100%'}
                                    customValueRenderer={(index, point) => {
                                        if (index % 2 === 0) return null
                                        return (
                                            <Text style={{ textAlign: 'center', fontSize: 10 }}>{point.y}</Text>
                                        )
                                    }} />
                            </View>
                        </View>
                        <View style={styles.dataWrapper}>
                            <Text style={styles.text}
                            >Mật độ ánh sáng 2 T6</Text>
                            <View style={styles.chartWrapper}>
                                <PureChart type={'bar'}
                                    data={sampleData}
                                    width={'100%'}
                                    customValueRenderer={(index, point) => {
                                        if (index % 2 === 0) return null
                                        return (
                                            <Text style={{ textAlign: 'center' }}>{point.y}</Text>
                                        )
                                    }} />
                            </View>
                        </View>

                    </ScrollView>
                )}
            </AppConsumer>
        );
    }
}
