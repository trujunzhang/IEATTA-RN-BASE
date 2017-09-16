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
 * @providesModule FormButton
 * @flow
 */

'use strict';

/**
 * ## Imports
 *
 * React
 */
import React, {Component} from 'react'
import
{
    StyleSheet,
    View
} from 'react-native'

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')

/**
 * ## Styles
 */
const styles = StyleSheet.create({
    signin: {
        marginLeft: 10,
        marginRight: 10
    },
    button: {
        backgroundColor: '#eebb09',
        borderColor: '#eebb09'
    }

})

class FormButton extends Component {
    /**
     * ### render
     *
     * Display the Button
     */
    render() {
        const formButtonStyle = this.props.formButtonStyle ? this.props.formButtonStyle : {}
        return (
            <View style={[styles.signin, formButtonStyle]}>
                <Button style={styles.button}
                        textStyle={{fontSize: 18}}
                        isDisabled={this.props.isDisabled}
                        onPress={this.props.onPress}>
                    {this.props.buttonText}
                </Button>
            </View>
        )
    }

}

module.exports = FormButton;
