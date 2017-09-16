/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import Svg, {
    Circle,
    Ellipse,
    G,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';


export default class ieatta extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>

                <Icon.Button name="facebook" backgroundColor="#3b5998">
                    <Text style={{fontFamily: 'Arial', fontSize: 15}}>Login with wanghao</Text>
                </Icon.Button>

                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                    <Text style={styles.buttonText}>
                        Sign in with Facebook
                    </Text>
                </LinearGradient>
                <Text style={styles.instructions}>
                    To get started, edit index.ios.js
                </Text>
                <Svg
                    height="100"
                    width="100"
                >
                    <Circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="blue"
                        strokeWidth="2.5"
                        fill="green"
                    />
                    <Rect
                        x="15"
                        y="15"
                        width="70"
                        height="70"
                        stroke="red"
                        strokeWidth="2"
                        fill="yellow"
                    />
                </Svg>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});

AppRegistry.registerComponent('ieatta', () => ieatta);
