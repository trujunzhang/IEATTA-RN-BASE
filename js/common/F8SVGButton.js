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
 * @providesModule F8SVGButton
 * @flow
 */

'use strict';

/**
 * The components needed from React
 */
import React, {Component, PropTypes} from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native'

const {Text} = require('F8Text')

import Svg, {
    G,
    Path,
} from 'react-native-svg'


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    rowDirection: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    columnDirection: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        fontSize: 12,
        color: '#666',
        backgroundColor: 'transparent'
    },
    subTitle: {
        fontSize: 12,
        color: '#999',
        fontWeight: '500',
        backgroundColor: 'transparent'
    }
});

class F8SVGButton extends React.Component {

    render() {
        const {item, rowNum} = this.props;
        return (
            <View style={[styles.container, {flex: rowNum}, item.style]}>
                <TouchableOpacity
                    style={{flex: rowNum}}
                    accessibilityTraits="button"
                    onPress={this.props.onPress}>
                    {this.renderContent()}
                </TouchableOpacity>
            </View>
        )
    }

    renderContent() {
        const {item, textStyle, svgSize, buttonDirection} = this.props;
        const direction = (buttonDirection === 'row') ? styles.rowDirection : styles.columnDirection;
        return (
            <View style={[styles.container, {justifyContent: 'center'}]}>
                <View style={direction}>
                    <Svg width={svgSize} height={svgSize}><Path fill="#666" d={item.icon}/></Svg>
                    <Text style={[styles.title, textStyle]}>{item.title}</Text>
                    {
                        !!item.subTitleText &&
                        <Text style={[styles.subTitleText, textStyle]}>{item.subTitleText}</Text>
                    }
                </View>
            </View>
        )
    }
}

F8SVGButton.propTypes = {
    svgSize: PropTypes.number,
    rowNum: PropTypes.number,
    buttonDirection: PropTypes.string
};

F8SVGButton.defaultProps = {
    svgSize: 24,
    rowNum: 0,
    buttonDirection: 'column'
};


module.exports = F8SVGButton;
