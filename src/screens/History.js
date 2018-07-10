import React, { Component } from 'react';
import { TouchableOpacity,View, Text, StyleSheet} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'

const styles = StyleSheet.create({
    root: {
        flex:1,
        backgroundColor: '#f2f1ed',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dataWrapper: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    header: {
        padding: 10,
        justifyContent: 'flex-start',
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
    buttonLable: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    deviceDataImage:{
        width: 100, 
        height:100,
        borderRadius: 80,
        margin:15
    },
    deviceDataName:{
        fontWeight: 'bold',
        padding: 10,
        marginTop: 15,
        fontSize:20,
    },
    deviceData:{
        color:'white',
        padding: 10,
        fontSize:16,
    },
    swtWrapper:{
        marginTop:5
    },
    button: {
        width: '30%',
        backgroundColor: 'purple',
        borderRadius: 30,
        justifyContent:'center',
        marginTop: 15,
        padding:5
    }
});

export default class HistoryScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            isVisible: false,
            chosenDate:''
        }
    }
    handlePicker = (datetime) => {
        this.setState({
            isVisible: false,
            chosenDate:moment(datetime).format('MMMM, Do YYYY HH:mm')
        })
    }
    showPicker = () => {
        this.setState({
            isVisible: true
        })
    }
    hidePicker = () => {
        this.setState({
            isVisible: false
        })
    }
    render() {
        return (

                    <View style={styles.root}>
                    <Text style={{color:'green', fontSize:20}}>
                        {this.state.chosenDate}
                    </Text>
                        <TouchableOpacity style={styles.button} onPress={this.showPicker}>
                            <Text style={{color:'white',textAlign:'center'}}>Show DatePicker</Text>
                        </TouchableOpacity>
                    
                    <DateTimePicker
                        isVisible={this.state.isVisible}
                        onConfirm={this.handlePicker}
                        onCancel={this.hidePicker}
                        mode={'datetime'}
                        is24Hour={false}
                    />
                    </View>
        
        );
    }
}