'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image
} from 'react-native';


const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
} = FBSDK;


class FBLogin extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'blue', marginTop: 100}}>
                <LoginButton
                    style={{
                        width: 300,
                        height: 100
                    }}
                    publishPermissions={["publish_actions"]}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                alert("Login failed with error: " + result.error);
                            } else if (result.isCancelled) {
                                alert("Login was cancelled");
                            } else {
                                alert("Login was successful with permissions: " + result.grantedPermissions)
                            }
                        }
                    }
                    onLogoutFinished={() => alert("User logged out")}>

                </LoginButton>
            </View>
        )
    }
}

module.exports = FBLogin;