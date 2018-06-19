import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Image,
    AsyncStorage
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeScreen from './Home';
import { AppConsumer } from '../components/Provider';
import { AppProvider } from '../components/Provider';
import { ACCESS_TOKEN } from '../utils/constants';

import io from 'socket.io-client/dist/socket.io';
window.navigator.userAgent = 'react-native';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'space-between',
        // backgroundColor: 'blue',
    },
    titileWrapper: {
        flex: 0.55,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'pink'
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
        fontSize: 13,
        fontWeight: 'bold',
        paddingTop: 10,
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

import { createStackNavigator } from 'react-navigation';


var e;
class LogInScreen extends Component {
    state = {
        usrname: '',
        pssword: '',
        loading: false,
    }
    constructor() {
        super();
       
    }

    async saveToken(accessToken) {
        try {
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
            console.log('saved accessToken !');
            this.getToken();
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async getToken() {
        try {
            let token = await AsyncStorage.getItem(ACCESS_TOKEN);
            console.log('token:', token);
        } catch (error) {
            console.log('error: ', error);
        }
    }
    async removeToken() {
        try {
            await AsyncStorage.removeItem(ACCESS_TOKEN);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    onPressTextSignUp = () => {
        this.props.navigation.navigate('SignUp')
    }

    onPressBtnFBLogIn = () => {

    };
    onPressBtnLogIn = (username, setUsername) => {
        if (this.state.usrname === 'hieu' && this.state.pssword === '123') {
           // this.socket.emit('authorization', this.state.usrname);
            setUsername(this.state.usrname);
            this.setState({loading: true});
            try {
                this.saveToken(this.state.usrname);
            } catch (error) {
                console.log('something went wrong');   
            }
            this.setState({loading: false});
            this.props.navigation.navigate('Home')
        } else {
            ToastAndroid.show('Username or password incorrect!', ToastAndroid.SHORT);
        }
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={styles.root}>
                    <ActivityIndicator size="large" color="#318DEE" />
                </View>
            )
        }
        return (
            <AppConsumer>
                {({ themeColor, isLogIn, logIn, username, setUsername }) => (
                    <KeyboardAvoidingView style={styles.root}>
                        <View style={styles.titileWrapper}>
                            <Text style={styles.text} >smartAo</Text>
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Username"
                                autoCapitalize='none'
                                returnKeyType="next"
                                onSubmitEditing={() => this.passwordInput.focus()}
                                ref={(input) => (this.usernameInput = input)}
                                placeholderTextColor="gray"
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => this.setState({ usrname: text })}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Password"
                                returnKeyType="done"
                                ref={(input) => (this.passwordInput = input)}
                                onSubmitEditing={() => this.onPressBtnLogIn}
                                secureTextEntry
                                placeholderTextColor="gray"
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => this.setState({ pssword: text })}
                            />
                        </View>
                        <View style={styles.buttonsWrapper}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.text}> Forgot your login details? </Text>
                                    <TouchableOpacity>
                                        <Text style={styles.link}> Get help </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.onPressBtnLogIn(username, setUsername)}
                                >
                                    <Text style={styles.buttonLable}>Log in</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.smallButton}
                                    onPress={this.onPressBtnFBLogIn}
                                >
                                    <Entypo size={45} name="facebook-with-circle" color={themeColor} />
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={{ flex: 0.1, alignItems: 'center', backgroundColor: '#f2f2f2' }}>
                            <View style={{ flexDirection: 'row', top: 3 }}>
                                <Text style={styles.text}> Don't have an account? </Text>
                                <TouchableOpacity
                                    underlayColor='#ffb951'
                                    onPress={this.onPressTextSignUp}
                                >
                                    <Text style={styles.link}> Sign Up ! </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                )}
            </AppConsumer>

        );
    }
}

export default LogInScreen;
