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
 * @providesModule F8StarIcon
 * @flow
 */

'use strict';

import React, {Component} from 'react'
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native'
import F8Colors from 'F8Colors'

const starImages = {
    "small": [
        require('./stars/small/star0.png'),
        require('./stars/small/star1.png'),
        require('./stars/small/star2.png'),
        require('./stars/small/star3.png'),
        require('./stars/small/star4.png'),
        require('./stars/small/star5.png')
    ],
    "middle": [
        require('./stars/middle/star0.png'),
        require('./stars/middle/star1.png'),
        require('./stars/middle/star2.png'),
        require('./stars/middle/star3.png'),
        require('./stars/middle/star4.png'),
        require('./stars/middle/star5.png')
    ],
    "large": [
        require('./stars/large/star0.png'),
        require('./stars/large/star1.png'),
        require('./stars/large/star2.png'),
        require('./stars/large/star3.png'),
        require('./stars/large/star4.png'),
        require('./stars/large/star5.png')
    ]
}

class F8StarIcon extends Component {

    constructor(props, context) {
        super(props);
        this.state = this.initialState = {};
    }

    /**
     * https://github.com/facebook/react-native/issues/2481
     * @returns {XML}
     */
    render() {
        const rate = this.props.rate || 0,
            iconType = this.props.iconType || 'large',
            iconWidth = this.props.width || 102,
            iconHeight = this.props.height || 18;

        return (
            <Image
                style={{
                    width: iconWidth,
                    height: iconHeight
                }}
                resizeMode="cover"
                source={starImages[iconType][rate]}
            />
        )
    }
}

module.exports = F8StarIcon;


