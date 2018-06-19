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
import { createStackNavigator } from 'react-navigation';
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
        justifyContent: 'center',
        // backgroundColor: 'blue',
    },
    titileWrapper: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
       // backgroundColor: 'pink'
    },
    inputWrapper: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'orange'
    },
    buttonsWrapper: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'cyan'
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
    },
    button: {
        backgroundColor: '#0c9eff',
        padding: 10,
        width: '60%',
        margin: 5,
        borderRadius: 30,
    },
})

import { StackNavigator } from 'react-navigation';


var e;
class SignUpScreen extends Component {
    state = {
        username: '',
        password: '',
        repassword: '',
        email: '',
        loading: false,
    }
    constructor() {
        super();

    }


    onPressBtnSignUp = (username, setUsername) => {
        this.props.navigation.navigate('LogIn');
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
                            <Text style={styles.text} >SignUpScreen</Text>
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Username"
                                autoCapitalize='none'
                                returnKeyType="next"
                                onSubmitEditing={() => this.emailInput.focus()}
                                ref={(input) => (this.usernameInput = input)}
                                placeholderTextColor="gray"
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => this.setState({ username: text })}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Email"
                                returnKeyType="done"
                                ref={(input) => (this.emailInput = input)}
                                onSubmitEditing={() => this.passwordInput.focus()}
                                secureTextEntry
                                placeholderTextColor="gray"
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => this.setState({ password: text })}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Password"
                                returnKeyType="done"
                                ref={(input) => (this.passwordInput = input)}
                                onSubmitEditing={() => this.repasswordInput.focus()}
                                secureTextEntry
                                placeholderTextColor="gray"
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => this.setState({ password: text })}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Retype Password"
                                returnKeyType="done"
                                ref={(input) => (this.repasswordInput = input)}
                                onSubmitEditing={() => this.onPressBtnLogIn}
                                secureTextEntry
                                placeholderTextColor="gray"
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => this.setState({ repassword: text })}
                            />

                        </View>
                        <View style={styles.buttonsWrapper}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={styles.text}> By clicking SignUp you have agree with </Text>
                                    <TouchableOpacity>
                                        <Text style={styles.link}> Terms and Conditions </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.onPressBtnSignUp(username, setUsername)}
                                >
                                    <Text style={styles.buttonLable}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 0.1, justifyContent: 'space-around', alignItems:'center' , backgroundColor: '#f2f2f2' }}>
                            <View style={{ flexDirection: 'row', top: 3 }}>
                                <Text style={styles.text}> Aldready have an account? </Text>
                                <TouchableOpacity
                                    underlayColor='#ffb951'
                                    onPress ={() => this.props.navigation.goBack()}
                                >
                                    <Text style={styles.link}> Log In ! </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                )}
            </AppConsumer>

        );
    }
}

export default SignUpScreen;
