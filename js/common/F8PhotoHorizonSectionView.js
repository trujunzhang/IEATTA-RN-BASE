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
 * @providesModule F8PhotoHorizonSectionView
 * @flow
 */

'use strict';

/**
 * The components needed from React
 */
import React, {PropTypes} from 'react'
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native'


const F8Colors = require('F8Colors')
const F8Button = require('F8Button')
const F8PhotoGrid = require('F8PhotoGrid')
const F8PhotoHorizonListView = require('F8PhotoHorizonListView')

const {queryPhotosByType} = require('../actions')

import Photos from '../lib/photos'

const {onCellItemPress} = require('../tabs/filter/navigatorApp')
const {photosBySectionType} = require('../tabs/filter/filterAppModel')

const {
    MENU_PHOTO_BROWSER_PAGE,
} = require('../lib/constants').default

import styles from './F8PhotoStyles'


class F8PhotoHorizonSectionView extends React.Component {

    constructor(props: Props) {
        console.log("constructor in the photos horizon.")
        super(props);
        this.state = {
            photos: [],
            ready: false
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        const oldPhotos = this.state.photos;

        const {sectionType, forItem} = nextProps;

        const newPhotos = photosBySectionType(nextProps, sectionType, forItem);
        if (!!newPhotos && newPhotos.length !== 0) {
            if (oldPhotos.length !== newPhotos.length) { // Only different photos size, update the ListView.

                console.log("component did receive in the photos horizon.", sectionType)
                this.setState({photos: newPhotos})
            }
        }
    }

    componentWillMount() {
        const {sectionType, forItem} = this.props;
        console.log("component will mount in the photos horizon.", sectionType)

        if (!!forItem) {
            this.props.dispatch(queryPhotosByType(Photos.getPhotoType(sectionType), forItem.uniqueId))
        }
    }

    renderSeeAllPhotosButton() {
        const {photos, ready} = this.state,
            photoLength = photos.length,
            isEmpty = (ready && photoLength === 0);
        return (
            <F8Button
                type="photos"
                style={[styles.seeAllPhotosButton, {
                    backgroundColor: (isEmpty ? "#ccc" : '#41c532'),
                }]}
                caption="See all photos"
                captionStyle={styles.seeAllPhotosButtonText}
                onPress={() => {
                    this.onShowAllPhotosPress()
                }}
            />
        )
    }

    render() {
        return (
            <View style={styles.photoHorizonContainer}>
                <F8PhotoHorizonListView {...this.state} {...this.props}/>
                {this.renderSeeAllPhotosButton()}
            </View>
        )
    }

    onShowAllPhotosPress(initialIndex = 0) {
        const {photos} = this.state,
            photoLength = photos.length;

        if (photoLength !== 0) {
            onCellItemPress(this.props,
                MENU_PHOTO_BROWSER_PAGE,
                {
                    photosBrowser: {
                        media: Photos.getMedia(photos),
                        initialIndex: initialIndex
                    }
                }
            )
        }
    }
}


F8PhotoHorizonSectionView.propTypes = {
    forItem: PropTypes.object,
    sectionType: PropTypes.string,
};

const {connect} = require('react-redux')

function select(store) {
    return {
        appModel: store.appModel
    };
}

module.exports = connect(select)(F8PhotoHorizonSectionView)

