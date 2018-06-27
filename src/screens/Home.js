import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, Math, Dimensions, ScrollView } from 'react-native';
import { AppConsumer } from '../components/Provider';

import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { LineChart, BarChart, Grid, ProgressCircle, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale'

import io from 'socket.io-client/dist/socket.io';
window.navigator.userAgent = 'react-native';

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
    header: {
        padding: 10,
        paddingBottom: 20,
        paddingTop: 20,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
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
        paddingLeft: 10,
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
        this.state = {
            test: 'alooooo',
            cam_bien1: [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53,],
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
                <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
                    <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
                </LinearGradient>
            </Defs>
        )

        return (
            <AppConsumer>
                {({ username, setUsername }) => (
                    <View style={styles.root}>
                        <View style={styles.header}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <ProgressCircle
                                        style={{ height: 100, width: 100 }}
                                        progress={0.7}
                                        progressColor={'rgb(77, 166, 255)'}
                                    />
                                    <Text style={{
                                        position: 'absolute',
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                    }}>Độ ẩm</Text>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <ProgressCircle
                                        style={{ height: 100, width: 100 }}
                                        progress={0.9}
                                        progressColor={'rgb(255, 80, 80)'}
                                    />
                                    <Text style={{
                                        position: 'absolute',
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                    }}>Nhiệt độ</Text>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <ProgressCircle
                                        style={{ height: 100, width: 100 }}
                                        progress={0.2}
                                        progressColor={'rgb(255, 153, 51)'}
                                    />
                                    <Text style={{
                                        position: 'absolute',
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                    }}>Nồng độ</Text>
                                </View>
                            </View>
                        </View>
                        <ScrollView >
                            <View style={styles.dataWrapper}>
                                <Text style={styles.text}>Cảm biến 1</Text>
                                <View style={styles.chartWrapper}>
                                    <View style={{ flexDirection: 'row', height: 200 }}>
                                        <YAxis
                                            data={this.state.cam_bien1}
                                            style={{ marginBottom: xAxisHeight }}
                                            contentInset={verticalContentInset}
                                            svg={axesSvg}
                                        />
                                        <View style={{ flex: 1, paddingLeft: 1 }}>

                                            <LineChart
                                                style={{ flex: 1 }}
                                                data={this.state.cam_bien1}
                                                contentInset={verticalContentInset}
                                                curve={shape.curveNatural}
                                                svg={{
                                                    strokeWidth: 2,
                                                    stroke: 'url(#gradient)',
                                                }}
                                            >
                                                <Grid />
                                                <Gradient />
                                            </LineChart>
                                            <XAxis
                                                style={{ marginHorizontal: -10, height: xAxisHeight }}
                                                data={this.state.cam_bien1}
                                                formatLabel={(value, index) => index}
                                                contentInset={{ left: 10, right: 10 }}
                                                svg={axesSvg}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.dataWrapper}>
                                <Text style={styles.text}>Cảm biến 2</Text>
                                <View style={styles.chartWrapper}>
                                    <View style={{ flexDirection: 'row', height: 200 }}>
                                        <YAxis
                                            data={this.state.cam_bien2}
                                            style={{ marginBottom: xAxisHeight }}
                                            contentInset={verticalContentInset}
                                            svg={axesSvg}
                                        />
                                        <View style={{ flex: 1, paddingLeft: 1 }}>

                                            <BarChart
                                                style={{ flex: 1 }}
                                                data={this.state.cam_bien2}
                                                gridMin={0}
                                                svg={{ fill: 'rgb(134, 65, 244)' }}
                                            >
                                                <Grid />
                                            </BarChart>
                                            <XAxis
                                                style={{ marginTop: 10 }}
                                                data={this.state.cam_bien2}
                                                scale={scale.scaleBand}
                                                formatLabel={(value, index) => index}
                                                svg={axesSvg}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <Text> </Text>
                            </View>
                        </ScrollView>

                    </View>
                )}
            </AppConsumer>
        );
    }
}
