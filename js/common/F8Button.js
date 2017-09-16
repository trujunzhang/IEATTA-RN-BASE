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
 * @providesModule F8Button
 * @flow
 */

'use strict';

const F8Colors = require('F8Colors')
const Image = require('Image')
import LinearGradient from 'react-native-linear-gradient'
const React = require('React')
const StyleSheet = require('StyleSheet')
const {Text} = require('F8Text')
const TouchableOpacity = require('TouchableOpacity')
const View = require('View')

class F8Button extends React.Component {
    props: {
        type: 'primary' | 'secondary' | 'bordered';
        icon?: number;
        caption: string;
        style?: any;
        onPress: () => mixed;
    };

    static defaultProps = {
        type: 'primary',
    };

    render() {
        const caption = this.props.caption;//.toUpperCase();
        let icon;
        if (this.props.icon) {
            icon = <Image source={this.props.icon} style={styles.icon}/>;
        }
        let content;
        if (this.props.type === 'primary') {
            let backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : '#eebb09';
            let colors = ['#6A6AD5', '#6F86D9']
            if (this.props.disabled === true) {
                colors = ['#ccc', '#ccc'];
            }
            if (this.props.backgroundColors) {
                colors = this.props.backgroundColors
            }
            let containStyle = [styles.button, styles.primaryButton, this.props.contentStyle];
            let childStyle = [styles.caption, styles.primaryCaption, this.props.textStyle];
            content = (
                <LinearGradient
                    colors={colors}
                    style={containStyle}>
                    {icon}
                    <Text style={childStyle}>
                        {caption}
                    </Text>
                </LinearGradient>
            );
        } else {
            let border = this.props.type === 'bordered' && styles.border;
            content = (
                <View style={[styles.button, border]}>
                    {icon}
                    <Text style={[styles.caption, styles.secondaryCaption, this.props.captionStyle]}>
                        {caption}
                    </Text>
                </View>
            );
        }

        let touchableProps = {activeOpacity: 1};
        if (!this.props.disabled) {
            touchableProps.activeOpacity = 0.8;
            touchableProps.onPress = this.props.onPress;
            touchableProps.onPressIn = this.props.onPressIn;
            touchableProps.onPressOut = this.props.onPressOut;
            touchableProps.onLongPress = this.props.onLongPress;
        }
        return (
            <TouchableOpacity
                accessibilityTraits="button"
                {...touchableProps}
                style={[styles.container, this.props.style]}>
                {content}
            </TouchableOpacity>
        );
    }
}

const HEIGHT = 50;

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        // borderRadius: HEIGHT / 2,
        // borderWidth: 1 / PixelRatio.get(),
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    border: {
        borderWidth: 1,
        borderColor: F8Colors.lightText,
        borderRadius: HEIGHT / 2,
    },
    primaryButton: {
        borderRadius: HEIGHT / 2,
        backgroundColor: 'transparent',
    },
    icon: {
        marginRight: 12,
    },
    caption: {
        letterSpacing: 1,
        fontSize: 12,
    },
    primaryCaption: {
        color: 'white',
    },
    secondaryCaption: {
        color: F8Colors.lightText,
    }
});

module.exports = F8Button;
