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
 * @providesModule SectionHeader
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


import AppConstants from '../lib/appConstants'

const F8Colors = require('F8Colors')

const styles = StyleSheet.create({
    sectionHeaderContainer: {
        paddingTop: 18,
        paddingBottom: 4,
        height: 50,
        backgroundColor: F8Colors.controllerViewColor
    },
    sectionHeaderTitle: {
        fontWeight: "normal",
        color: "#666",
        fontSize: 20,
        paddingHorizontal: 10,
        marginBottom: 0
    }
});


class SectionHeader extends React.Component {

    render() {
        return (
            <View
                style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeaderTitle}>{AppConstants.SECTION_TITLES[this.props.sectionType]}</Text>
            </View>
        )
    }
}


module.exports = SectionHeader;
