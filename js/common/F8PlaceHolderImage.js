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
 * @providesModule F8PlaceHolderImage
 * @flow
 */

'use strict';


import React, {Component, PropTypes} from 'react';
import {
    Animated,
    Image
} from 'react-native';

class F8PlaceHolderImage extends Component {
    static propTypes = {
        style: PropTypes.oneOfType([PropTypes.number, PropTypes.array, PropTypes.object]),
        onLoad: PropTypes.func,
        onError: PropTypes.func,
        source: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
        placeholderSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    }

    constructor(...props) {
        super(...props);
        this.state = {
            opacity: new Animated.Value(1),
            source: this.props.source,
        };
    }

    onLoad = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 250,
        }).start();

        if (this.props.onLoad) {
            this.props.onLoad();
        }
    }

    onError = () => {
        const {placeholderSource} = this.props;
        if (this.props.onError) this.props.onError();
        if (placeholderSource) {
            this.setState({source: placeholderSource});
        }
    }

    render() {
        const {source} = this.state;
        return <Animated.Image {...this.props}
                               source={source}
                               onLoad={this.onLoad}
                               onError={this.onError}
                               resizeMode="cover"
                               style={[this.props.style, {opacity: this.state.opacity}]}/>;
    }
}


module.exports = F8PlaceHolderImage;