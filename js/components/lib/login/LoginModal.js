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
    Platform,
    StatusBar,
    Dimensions
} from 'react-native'

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


import commonStyles from '../../../common/commonStyle'

const {goBackPage} = require('../../../tabs/filter/navigatorApp')

import {Container, Content} from 'native-base'
import styles from './LoginStyles'

class LoginModal extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    props: {
        navigator: Navigator;
        onLogin: () => void;
    };

    state = {
        formType: LOGIN_FORM_TYPE_MAIN,
    }

    toggleForm(formType) {
        this.setState({formType: formType})
    }

    onHideLoginModel() {
        goBackPage(this.props)
    }

    render() {
        const {formType} = this.state
        switch (formType) {
            default:
                return this.renderNormal()
            case LOGIN_FORM_TYPE_LOGIN:
                return (
                    <Container style={{flex: 1, backgroundColor: 'white'}}>
                        <F8Header title={'Login'} onLeftItemPress={() => {
                            this.toggleForm(LOGIN_FORM_TYPE_MAIN)
                        }}/>
                        <Content>
                            <AppLogin toggleEvent={this.toggleForm.bind(this)}
                                      onEventAfterHook={this.onHideLoginModel.bind(this)}
                                      actions={this.props.actions}/>
                        </Content>
                    </Container>
                )
            case LOGIN_FORM_TYPE_REGISTER:
                return (
                    <Container style={{flex: 1, backgroundColor: 'white'}}>
                        <F8Header title={'Register'} onLeftItemPress={() => {
                            this.toggleForm(LOGIN_FORM_TYPE_MAIN)
                        }}/>
                        <Content>
                            <AppRegister toggleEvent={this.toggleForm.bind(this)}
                                         onEventAfterHook={this.onHideLoginModel.bind(this)}
                                         actions={this.props.actions}/>
                        </Content>
                    </Container>
                )
        }

    }

    renderMainUI() {
        return (
            <View style={styles.section}>
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
                    captionStyle={{
                        color: '#41c532'
                    }}
                    onPress={() => {
                        goBackPage(this.props)
                    }}
                />
                <Text style={styles.loginComment}>
                    {"Use Facebook to login."}
                </Text>
                <LoginButton source="First screen"/>
            </View>
        )
    }

    renderNormal() {
        return (
            <Container style={{flex: 1, backgroundColor: 'white'}}>
                <Content>
                    <View style={commonStyles.rowDirection}>
                        <Image style={{flex: 1}} resizeMode="cover" source={require('./img/login-background.png')}>
                            <Text style={styles.modelH1}>{"Log in"}</Text>
                            <Text style={styles.modelH2}>{"to trace your eating restaurants."}</Text>
                            {this.renderMainUI()}
                        </Image>
                    </View>
                </Content>
            </Container>
        )
    }

    loggedIn() {
        goBackPage(this.props)
        this.props.onLogin();
    }
}

import {connect} from 'react-redux'

import * as authActions from '../../../reducers/auth/authActions'
import {bindActionCreators} from 'redux'

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch),
    }
}

module.exports = connect(null, mapDispatchToProps)(LoginModal)


