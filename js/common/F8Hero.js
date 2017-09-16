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
 * @providesModule F8Hero
 * @flow
 */

'use strict';


import React, {Component} from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import PropTypes from 'prop-types';

// _createPositionStyle :: Number -> Object
export const _createPositionStyle = (zIndex = 1) => ({
    top: 0,
    zIndex
});

// updateWidthState :: Component, Window -> _
const updateWidthState = (component, window) => {
    if (!component) return;
    component.setState({
        width: window.width
    });
}

class F8Hero extends Component {
    constructor(props) {
        super(props);

        this.state = {
            source: this.props.source,
            opacity: 0,
            height: this.props.minHeight || undefined,
            resizeMode: this.props.resizeMode || 'cover'
        };
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.source !== this.props.source) {
            this.setState({
                source: this.props.source
            });
        }
    };

    componentDidMount() {
        this.setState({
            opacity: 1
        });
    };

    renderColorOverlay() {
        let overlayStyles = [{
            height: this.state.height,
            width: '100%',
            backgroundColor: this.props.colorOverlay || 'transparent',
            opacity: this.props.colorOpacity || .30
        }, _createPositionStyle(1), {position: 'absolute'}];

        return (this.props.colorOverlay) ?
            <View style={overlayStyles}></View> :
            null;
    };

    renderHeroOverlay() {
        const self = this;
        const transparentBg = {backgroundColor: 'transparent'};
        const contentStyles = (this.props.colorOverlay) ?
            [transparentBg, _createPositionStyle(2)] :
            transparentBg;

        const updateViewHeight = (event) => {
            const overlayHeight = event.nativeEvent.layout.height;
            const overlayWidth = event.nativeEvent.layout.width;
            if (self.props.minHeight) return;
            if (overlayHeight !== self.state.height) {
                self.setState({
                    height: overlayHeight
                });
            }

            // Initial width state set
            if ((this.props.fullWidth === true) && (!self.state.width)) {
                updateWidthState(self, Dimensions.get('window'));
                // This requires RN ^0.43 + React ^16, may consider alternative updating method for better
                // backwards compatability
                Dimensions.addEventListener('change', (window) => updateWidthState(self, window));
            }
        };

        return (
            <View
                onLayout={(event) => updateViewHeight(event)}
                style={contentStyles}>
                {this.props.renderOverlay()}
            </View>
        );
    };

    render() {
        return (
            <View style={{opacity: this.state.opacity}}>
                <Image
                    source={this.state.source}
                    resizeMode={this.state.resizeMode}
                    style={{height: this.state.height, width: (this.state.width || '100%')}}>
                    {this.renderHeroOverlay()}
                    {this.renderColorOverlay()}
                </Image>
            </View>
        )
    };
}

F8Hero.propTypes = {
    renderOverlay: PropTypes.func,
    resizeMode: PropTypes.string,
    colorOpacity: PropTypes.number,
    minHeight: PropTypes.number,
    fullWidth: PropTypes.bool
}

F8Hero.defaultProps = {
    fullWidth: true
}

module.exports = F8Hero;


