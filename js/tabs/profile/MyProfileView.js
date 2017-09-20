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
    Text,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native'

const ProfilePicture = require('../../common/ProfilePicture');
const F8Colors = require('F8Colors')
const LoginButton = require('../../components/lib/login/LoginButton');
const PureListView = require('../../common/PureListView');

/**
 * The states were interested in
 */
const {
    LOGIN_FORM_TYPE_MAIN,
    PARALLAX_BACKGROUND_STATIC_IMAGE,
    PARALLAX_HEADER_LEFT_ITEM_NONE,
    PARALLAX_HEADER_LEFT_ITEM_DRAWER,
    MENU_LOGIN_MYPROFILE_SCREEN,
} = require('../../lib/constants').default

const {
    logOutWithPrompt,
} = require('../../actions');

const {onCellItemPress} = require('../filter/navigatorApp')

// TODO: Rename to MyF8View
class MyScheduleView extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    constructor(props) {
        super(props);

        this.state = {
            currentUser: props.currentUser,
            isConnected: true,
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            currentUser: nextProps.currentUser,
            isConnected: nextProps.isConnected,
        })
    }

    renderCurrentUser() {
        const {currentUser} = this.state;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingBottom: 80,
            }}>

                <ProfilePicture user={currentUser} size={80}/>

                <Text style={{
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 'bold',
                    alignItems: 'center'
                }}>
                    {currentUser.username}
                </Text>
            </View>
        )
    }


    render() {
        const {props} = this;
        const {currentUser} = this.state;
        const {isLoggedIn} = currentUser;

        let rightItem;
        if (isLoggedIn) {
            rightItem = {
                title: 'Logout',
                onPress: () => {
                    this.props.logOut()
                }
            }
        } else {
            rightItem = {
                title: 'Log In',
                onPress: () => {
                    onCellItemPress(props,
                        MENU_LOGIN_MYPROFILE_SCREEN,
                    )
                    // this.props.navigator.push({
                    //     navigatorType: LOGIN_FORM_TYPE_MAIN
                    // })
                }
            }
        }
        return (
            <PureListView
                navigation={this.props.navigation}
                parallaxLeftItemType={PARALLAX_HEADER_LEFT_ITEM_DRAWER}
                rightItem={rightItem}
                customStickyTitle="My Account"
                parallaxViewType={PARALLAX_BACKGROUND_STATIC_IMAGE}
                renderCustomBackground={() => {
                    return (
                        <View style={{flex: 1}}>
                            <Image
                                style={{flex: 1}}
                                source={require('../images/my-f8-background.png')}/>
                        </View>
                    )
                }}
                renderParallaxHeader={() => {
                    return this.renderCurrentUser()
                }}
                data={[]}
            />
        )
    }

    renderHeader() {
        return (<View style={{height: F8Colors.topViewHeight}}/>)
    }

}

const {connect} = require('react-redux');

function select(store) {
    return {
        currentUser: store.user,
    };
}

function actions(dispatch) {
    return {
        logOut: () => dispatch(logOutWithPrompt()),
    };
}

module.exports = connect(select, actions)(MyScheduleView)
