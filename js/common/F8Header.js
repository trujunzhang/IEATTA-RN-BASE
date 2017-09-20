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
 * @providesModule F8Header
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
    Dimensions,
    Platform,
    ToolbarAndroid,
    ActivityIndicator
} from 'react-native'

const {goBackPage} = require('../tabs/filter/navigatorApp')
import {Container, Header, Content, Left, Right, Button, Icon, Body, Title} from 'native-base'

import commonStyles from './commonStyle'

const F8Colors = require('F8Colors')

class F8Header extends Component {

    render() {
        const {title, onLeftItemPress} = this.props;
        return (
            <Header style={{backgroundColor: F8Colors.primaryColor}}>
                <Left style={{flex: 3}}>
                    <Button transparent
                            onPress={() => {
                                if (!!onLeftItemPress) {
                                    onLeftItemPress()
                                } else {
                                    goBackPage(this.props)
                                }
                            }}>
                        <Icon name='arrow-back'/>
                    </Button>
                </Left>
                <Body>
                <Title style={{color: '#fff'}}>{title}</Title>
                </Body>
                <Right style={{flex: 3}}/>
            </Header>
        )
    }
}


module.exports = F8Header;
