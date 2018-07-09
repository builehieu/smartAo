import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity, ScrollView, Switch,Image } from 'react-native';
import deviceData from '../utils/deviceData';

import { makeCircle } from '../utils/metrics';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f2f1ed',
    },
    dataWrapper: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    header: {
        flexDirection: 'row',
        padding: 18,
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    deviceWrapper: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonsWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingBottom: 10,
    },
    Lable: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black'
    },
    buttonLable: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    deviceDataImage:{
        ...makeCircle(50),
    },
    deviceDataName:{
        fontWeight: 'bold',
        fontSize:20,
        color:'black',
    },
    deviceData:{
        //color:'black',
        fontSize:13,
    },
    swtWrapper:{
        marginTop:5
    },
    button: {
        backgroundColor: '#0c9eff',
        width: '100%',
        margin: 5,
        borderRadius: 30,
    }
})

class DeviceData extends Component{
    constructor() {
        super();
        this.state = {
            SwitchOnValueHolder: false
        }
    }
    onSwitch(value){
        if(value)
            this.setState({SwitchOnValueHolder: false})
        else
            this.setState({SwitchOnValueHolder: true})
    }
    render() {
        return(
            <View style={{
                flex:1,
                flexDirection:'column',
                paddingBottom: 5,
            }}>
                <View style={{
                    flex:1,
                    flexDirection:'row',
                    borderRadius:10,
                    padding: 5,
                    backgroundColor:'white',
                    justifyContent:'space-between',
                }}>
                    <Image
                        source={{uri: this.props.item.deviceImage}}
                        style={styles.deviceDataImage}
                    >
                    </Image>
                    <View style={{
                        flex: 1,
                        marginLeft: 5,
                        flexDirection:'column',
                        alignItems: 'flex-start',
                        justifyContent:'center',
                    }}>
                        <Text style={styles.deviceDataName}>{this.props.item.deviceName}</Text>
                        <Text style={styles.deviceData}>{this.props.item.deviceDescription}</Text>
                    </View> 
                    <View style={{
                        justifyContent:'center',
                    }}>
                            <Switch
                                onValueChange={() => this.onSwitch(this.state.SwitchOnValueHolder)}
                                value={this.state.SwitchOnValueHolder} />
                    </View>
                </View>  
        </View>    
        );
    }
}

export default class DevicesScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            SwitchOnValueHolder: false
        }
    }
    onSwitch(value){
        if(value)
            this.setState({SwitchOnValueHolder: false})
        else
            this.setState({SwitchOnValueHolder: true})
    }
    onSwitchAll(value){
        
    
    }
    render() {
        return (
            <View style={styles.root}>
            <View style={styles.header}>
                <Text style={styles.Lable}>Cảm biến</Text>
                <Switch
                    onValueChange={() => this.onSwitch(this.state.SwitchOnValueHolder)}
                    value={this.state.SwitchOnValueHolder} />
            </View>
                <ScrollView style={styles.dataWrapper}>
                        <FlatList
                        data={deviceData}
                        renderItem={({item, index})=>{
                            return(
                                <DeviceData item={item} index={index}>
                                </DeviceData>
                                );
                            }}
                            >   
                        </FlatList>
                </ScrollView>
            </View>
            
        );
    }
}