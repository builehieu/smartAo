import React, { Component } from 'react';
import createReactContext from 'create-react-context';

const AppContext = createReactContext({
    isLogIn: false,
    themeColor: '#512DA8',
    changeThemeColor: () => null,
    logIn: () => null,
    logOut: () => null,
});

export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component {
    state = {
        isLogIn: false,
        themeColor: '#512DA8',
    };

    changeThemeColor = (themeColor) => {
        this.setState({ themeColor });
    };

    logIn = () => {
        this.setState({ isLogIn: true });
    };

    logOut = () => {
        this.setState({ isLogIn: false });
    };

    render() {
        return (
            <AppContext.Provider
                value={{
                    isLogIn: this.state.isLogIn,
                    themeColor: this.state.themeColor,
                    changeThemeColor: this.changeThemeColor,
                    logIn: this.logIn,
                    logOut: this.logOut,
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }

};
