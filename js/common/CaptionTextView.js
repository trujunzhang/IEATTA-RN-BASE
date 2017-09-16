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
 * @providesModule CaptionTextView
 * @flow
 */

'use strict';

import React, {Component} from 'react'
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Text,
    Platform,
    Dimensions
} from 'react-native'

const {width, height} = Dimensions.get('window')

const F8Colors = require('F8Colors')

class CaptionTextView extends Component {

    render() {
        const {
            caption,
            title,
            themeColor
        } = this.props;
        return (
            <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
                <Text style={[{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: themeColor || "black"
                }, {
                    marginRight: 6
                }]}>{caption}</Text>
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 14,
                        color: themeColor || F8Colors.appTextColor
                    }}>{title}</Text>
            </View>
        )
    }
}

module.exports = CaptionTextView;

