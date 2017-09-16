/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */
'use strict';


/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    StatusBar,
    Platform,
    Dimensions
} from 'react-native'

const Animated = require('Animated')
const {Text} = require('F8Text')

const F8Colors = require('F8Colors')
const F8Button = require('F8Button')
const F8Header = require('F8Header')

const LoginButton = require('./LoginButton')
const AppLogin = require('./general/AppLogin')
const AppRegister = require('./general/AppRegister')

const {
    LOGIN_FORM_TYPE_MAIN,
    LOGIN_FORM_TYPE_LOGIN,
    LOGIN_FORM_TYPE_REGISTER,
    LOGIN_FORM_TYPE_FORGOTPASSWORD
} = require('../../../lib/constants').default


import styles from './LoginStyles'

/**
 * Ref: https://medium.freecodecamp.org/how-to-make-your-react-native-app-respond-gracefully-when-the-keyboard-pops-up-7442c1535580
 */
class LoginScreen extends React.Component {
    state = {
        formType: LOGIN_FORM_TYPE_MAIN,
        anim: new Animated.Value(0),
    }

    toggleForm(formType) {
        this.setState({formType: formType})
    }

    componentDidMount() {
        Animated.timing(this.state.anim, {toValue: 3000, duration: 3000}).start();
    }

    render() {
        const {formType} = this.state

        const leftItem = {
            icon: require('../../../common/img/back_white.png'),
            onPress: () => {
                this.toggleForm(LOGIN_FORM_TYPE_MAIN)
            }
        }
        switch (formType) {
            default:
                return this.renderWelcomeScrene()
            case LOGIN_FORM_TYPE_LOGIN:
                return (
                    <View style={{flex: 1}}>
                        <StatusBar
                            translucent={true}
                            backgroundColor="rgba(0, 0, 0, 0.2)"
                            barStyle="light-content"/>
                        <F8Header
                            style={{backgroundColor: F8Colors.primaryColor}}
                            foreground='dark'
                            leftItem={leftItem}
                            title={"Login"}/>
                        <AppLogin toggleEvent={this.toggleForm.bind(this)}
                                  actions={this.props.actions}/>
                    </View>
                )
            case LOGIN_FORM_TYPE_REGISTER:
                return (
                    <View style={{flex: 1}}>
                        <StatusBar
                            translucent={true}
                            backgroundColor="rgba(0, 0, 0, 0.2)"
                            barStyle="light-content"/>
                        <F8Header
                            style={{backgroundColor: F8Colors.primaryColor}}
                            foreground='dark'
                            leftItem={leftItem}
                            title={"Register"}/>
                        <AppRegister toggleEvent={this.toggleForm.bind(this)}
                                     actions={this.props.actions}/>
                    </View>
                )
        }

    }

    renderLoginIcon() {
        return (
            <View style={[styles.section, {marginTop: 0}]}>
                <Animated.Image
                    style={[this.fadeIn(0), {borderRadius: 40}]}
                    source={require('./img/devconf-logo.png')}
                />
            </View>
        )
    }

    renderWelcomeScrene() {
        return (
            <Image style={styles.screenContainer} source={require('./img/login-background.png')}>
                <StatusBar barStyle="default"/>
                {this.renderLoginIcon()}

                {this.renderInform()}
                {this.renderMainUI()}
                <View style={{height: 60}}/>
            </Image>
        )
    }

    renderInform() {
        return (
            <View style={styles.section}>
                <Animated.Text style={[styles.h1, this.fadeIn(700, -20)]}>
                    {'Eating Restaurant'}
                </Animated.Text>
                <Animated.Text style={[styles.h1, {marginTop: -4}, this.fadeIn(700, 20)]}>
                    {'Tracker'}
                </Animated.Text>
                <Animated.Text style={[styles.h3, this.fadeIn(1200, 10)]}>
                    {'VirtualBreak,LLC'}
                </Animated.Text>
            </View>
        )
    }

    renderMainUI() {
        return (
            <Animated.View style={[styles.section, styles.last, this.fadeIn(2500, 20)]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <F8Button
                        contentStyle={[styles.buttonSection, styles.loginButtonSection]}
                        textStyle={styles.loginButtonText}
                        backgroundColors={["#fff", "#f7f7f7"]}
                        caption="Log In"
                        source="Modal"
                        onPress={() => {
                            this.props.actions.loginState()
                            this.toggleForm(LOGIN_FORM_TYPE_LOGIN)
                        }
                        }
                    />
                    <F8Button
                        contentStyle={[styles.buttonSection, styles.signUpButtonSection]}
                        textStyle={styles.signUpButtonText}
                        backgroundColors={["#d90007", "#c91400"]}
                        caption="Sign Up"
                        source="Modal"
                        onPress={() => {
                            this.props.actions.registerState()
                            this.toggleForm(LOGIN_FORM_TYPE_REGISTER)
                        }
                        }
                    />
                </View>
                <F8Button
                    type="secondary"
                    caption="Not Now"
                    source="Modal"
                    captionStyle={{color: '#41c532'}}
                    onPress={() => {
                        this.props.notNowPress()
                    }}
                />
                <Text style={styles.loginComment}>
                    {"Use Facebook to login."}
                </Text>
                <LoginButton source="First screen"/>
            </Animated.View>
        )
    }

    fadeIn(delay, from = 0) {
        const {anim} = this.state;
        return {
            opacity: anim.interpolate({
                inputRange: [delay, Math.min(delay + 500, 3000)],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            }),
            transform: [{
                translateY: anim.interpolate({
                    inputRange: [delay, Math.min(delay + 500, 3000)],
                    outputRange: [from, 0],
                    extrapolate: 'clamp',
                }),
            }],
        };
    }
}


import {connect} from 'react-redux'

const {skipLogin} = require('../../../actions')

import * as authActions from '../../../reducers/auth/authActions'
import {bindActionCreators} from 'redux'

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch),
        notNowPress: () => dispatch(skipLogin())
    }
}

module.exports = connect(null, mapDispatchToProps)(LoginScreen)

