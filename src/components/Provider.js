import React, { Component } from 'react';
import createReactContext from 'create-react-context';

const AppContext = createReactContext({
    isLogIn: false,
    username: 'none',
    themeColor: '#512DA8',
    setUsername: () => null,
    changeThemeColor: () => null,
    logIn: () => null,
    logOut: () => null,
});

export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component {
    state = {
        isLogIn: 'false',
        username: 'none',
        themeColor: '#512DA8',
    };

    changeThemeColor = (themeColor) => {
        this.setState({ themeColor });
    };

    setUsername = (username) => {
        this.setState({ username });
    };

    logIn = (isLogIn) => {
        this.setState({ isLogIn });
    };

    logOut = () => {
        this.setState({ isLogIn: false });
    };

    render() {
        return (
            <AppContext.Provider
                value={{
                    isLogIn: this.state.isLogIn,
                    username: this.state.username,
                    themeColor: this.state.themeColor,
                    changeThemeColor: this.changeThemeColor,
                    logIn: this.logIn,
                    logOut: this.logOut,
                    setUsername: this.setUsername,
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }

};
