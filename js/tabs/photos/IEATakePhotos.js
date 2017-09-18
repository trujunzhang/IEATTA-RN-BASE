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
 * @flow
 */
'use strict';


/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native'

import AppConstants from '../../lib/appConstants'

const F8Header = require('F8Header')
const F8PhotoHorizonListView = require('F8PhotoHorizonListView')

const {goBackPage} = require('../../tabs/filter/navigatorApp')
const F8TakePhotoCamera = require('F8TakePhotoCamera')

const {
    queryPhotosByType,
    saveTakenPhoto,
    timeout
} = require('../../actions')


/**
 * The states were interested in
 */
const {
    PARSE_ORIGINAL_IMAGES,
    PARSE_THUMBNAIL_IMAGES
} = require('../../lib/constants').default

class IEATakePhotos extends React.Component {

    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    constructor(props) {
        super(props);

        this.state = {
            showNavigatorHeader: false,
            newPhotoInstance: AppConstants.generateNewRealmPhotoObject(props.navigation.state.params),
            photos: []
        }

        props.actions.resetTakenPhotos();
    }

    componentWillReceiveProps(nextProps: Props) {
        const _takenPhotos = nextProps.editModel.takenPhotos;
        this.setState({
            photos: _takenPhotos.toJS()
        })
    }

    async onTakePhotoAfterHook(data) {
        const {dispatch} = this.props;
        const {modelType, model} = this.props.navigation.state.params;

        const photoPath = data.path;
        const lastPosition = this.props.getCurrentLocation();

        this.props.actions.writeModelRequest();
        let haveError = false;
        try {
            await Promise.race([
                dispatch(saveTakenPhoto(
                    this.state.newPhotoInstance,
                    photoPath,
                    Platform.OS === 'ios',
                    model.listPhotoId === '',
                    lastPosition
                    )
                ),
                timeout(15000),
            ]);
        } catch (e) {
            this.props.actions.writeModelFailure(e);
            haveError = true;
            const message = e.message || e;
            if (message !== 'Timed out' && message !== 'Canceled by user') {
                // alert(message);
            }
        } finally {
            if (!haveError) {
                this.setState({newPhotoInstance: AppConstants.generateNewRealmPhotoObject(this.props)})
                this.props.actions.writeModelSuccess();
            }
        }
    }

    onBackPress() {
        goBackPage(this.props)

        const {modelType, model} = this.props.navigation.state.params;
        this.props.dispatch(queryPhotosByType(modelType, model.objectId))
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.showNavigatorHeader &&
                    <F8Header title={'Take Photo'} onLeftItemPress={() => {
                        this.onBackPress()
                    }}/>
                }

                <F8TakePhotoCamera
                    onTakePhotoAfterHook={this.onTakePhotoAfterHook.bind(this)}/>
                {this.renderToggleSection()}
                {
                    this.state.showNavigatorHeader &&
                    <View style={styles.takenPhotosList}>
                        <F8PhotoHorizonListView
                            showPhotoFooter={false}
                            {...this.state}
                            {...this.props}/>
                    </View>
                }
            </View>
        )
    }

    renderToggleSection() {
        return (
            <TouchableOpacity
                onPress={() => this.setState({showNavigatorHeader: !this.state.showNavigatorHeader})}
                style={styles.toggleSection}>
                <View/>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    toggleSection: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 150,
        bottom: 150,
        // backgroundColor: 'yellow'
    },
    takenPhotosList: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 100,
        // backgroundColor: 'red'
    },

});

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as editModelActions from '../../reducers/editModel/editModelActions'

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(editModelActions, dispatch)
    }
}

function select(store) {
    return {
        editModel: store.editModel
    };
}

module.exports = connect(select, mapDispatchToProps)(IEATakePhotos)

