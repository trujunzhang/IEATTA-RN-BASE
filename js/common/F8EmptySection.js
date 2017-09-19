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
 * @providesModule F8EmptySection
 * @flow
 */

'use strict';

/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    View,
    Image,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native'

import {Container, Header, Left, Body, Right, Button, Icon, Title, Subtitle} from 'native-base'
import AppConstants from '../lib/appConstants'

const {Paragraph, Heading1} = require('F8Text');

class F8EmptySection extends React.Component {

    render() {
        const {sectionTag} = this.props;
        const object = AppConstants.emptySections[sectionTag];
        return (
            <View style={[styles.container]}>
                <Body style={{marginTop: 24}}>
                <Title style={{fontSize: 20, color: '#000', marginBottom: 8}}>{object.title}</Title>
                <Subtitle>{object.subtitle}</Subtitle>
                </Body>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 30,
        alignItems: 'center',
        height: 160,
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
    },
    image: {
        marginBottom: 10,
    },
    text: {
        textAlign: 'center',
        marginBottom: 35,
    },
});

module.exports = F8EmptySection;
