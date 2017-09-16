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
 * @providesModule F8TakePhotoCamera
 * @flow
 */

'use strict';

/**
 * The components needed from React
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View
} from 'react-native';

const {width, height} = Dimensions.get('window')

const {getLocalImagePath} = require('../parse/fsApi')
const RNFS = require('react-native-fs')

const ErrorAlert = require('ErrorAlert')

import Svg, {
    G,
    Path,
} from 'react-native-svg'

import Camera from 'react-native-camera';

class F8TakePhotoCamera extends React.Component {


    constructor(props) {
        super(props);

        this.errorAlert = new ErrorAlert()
        this.camera = null;

        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.cameraRoll,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.on,
            },
            isRecording: false
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    captureTarget={this.state.camera.captureTarget}
                    type={this.state.camera.type}
                    flashMode={this.state.camera.flashMode}
                    aspect={this.state.camera.aspect}
                >
                    {this.renderButton()}
                </Camera>
            </View>
        );
    }

    renderButton() {
        return (
            <TouchableOpacity
                style={styles.captureButton}
                onPress={this.takePicture.bind(this)}>
                <Svg width={36} height={36}>
                    <Path fill="#f00"
                          d={
                              "M29 32H7c-2.685 0-5-2.225-5-4.97V13c0-2.744 2.315-5 5-5h3c.923-1.717 2.315-3.008 4.254-3.008L22 5c1.94 0 3.077 1.283 4 3h3c2.685 0 5 2.256 5 5v14c0 2.744-2.315 5-5 5zm3-19c0-1.57-1.332-3.03-2.87-3.03h-4.236C24.606 8.35 23.562 7 22 7h-8c-1.56 0-2.71 1.38-3 3H7c-1.537 0-3 1.43-3 3v14c0 1.57 1.463 3 3 3h22c1.537 0 3-1.43 3-3V13zM18 27.03c-3.842 0-6.957-3.182-6.957-7.108 0-3.927 3.115-7.11 6.957-7.11 3.842 0 6.957 3.183 6.957 7.11 0 3.926-3.115 7.11-6.957 7.11zm0-12.085c-2.685 0-4.87 2.233-4.87 4.977s2.185 4.976 4.87 4.976 4.87-2.232 4.87-4.976c0-2.744-2.185-4.977-4.87-4.977z"
                          }
                    />
                </Svg>
            </TouchableOpacity>
        )
    }

    takePicture() {
        if (this.camera) {
            this.camera.capture()
                .then(this.props.onTakePhotoAfterHook)
                .catch(err => {
                    console.error(err)
                });
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    },
    bottomOverlay: {
        bottom: 10,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40,
        marginBottom: 20
    },
});

module.exports = F8TakePhotoCamera;
