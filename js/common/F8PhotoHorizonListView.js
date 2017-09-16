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
 * @providesModule F8PhotoHorizonListView
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

const F8PhotoGrid = require('F8PhotoGrid')

import Photos from '../lib/photos'

const {onCellItemPress} = require('../tabs/filter/navigatorApp')
const {getLocalImagePath} = require('../parse/fsApi')

const {
    MENU_PHOTO_BROWSER_PAGE,
    MENU_TAKE_PHOTO_PAGE,
} = require('../lib/constants').default

import Svg, {
    G,
    Path,
} from 'react-native-svg'

import styles from './F8PhotoStyles'

class F8PhotoHorizonListView extends React.Component {

    render() {
        const photos = this.props.photos || [];
        const {showPhotoFooter} = this.props;
        const extendProps = showPhotoFooter ? {
            renderPhotoFooter: this.renderPhotoFooter.bind(this)
        } : {}
        return (
            <F8PhotoGrid
                {...extendProps}
                data={photos}
                horizontal={true}
                itemsPerRow={photos.length}
                itemMargin={6}
                renderRow={this.renderRow.bind(this)}
                {...this.props}
            />
        )
    }

    onTakeAPhoto() {
        const {sectionType, forItem} = this.props;
        const modelType = Photos.getPhotoType(sectionType);

        onCellItemPress(this.props,
            MENU_TAKE_PHOTO_PAGE,
            {
                modelType: modelType,
                model: forItem
            }
        )

    }

    renderPhotoFooter(): ?ReactElement {
        return (
            <TouchableOpacity
                key={"takeAPhoto"}
                style={styles.photoFooterSection}
                onPress={this.onTakeAPhoto.bind(this)}>
                <View style={styles.photoFooterPanel}>
                    <Svg width="48" height="48">
                        <Path fill="#666"
                              d="M38 40H10a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6h4.367C15.194 9.675 17.39 8 20 8h8c2.61 0 4.806 1.675 5.633 4H38a6 6 0 0 1 6 6v16a6 6 0 0 1-6 6zM24.01 17a9 9 0 0 0-9 9 9 9 0 1 0 9-9zm0 14a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
                    </Svg>
                    <Text style={styles.photoFooterSectionText}>{"Add"}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderRow(photo: Object,
              itemWidth: Int,
              index: Int) {
        const localImagePath = getLocalImagePath(photo.objectId)
        return (
            <TouchableOpacity key={photo.objectId} style={styles.photoRowSection}
                              onPress={() => {
                                  this.onShowAllPhotosPress(index)
                              }}>
                <Image key={photo.objectId} style={styles.photoRowImage} source={{uri: `file://${localImagePath}`}}/>
            </TouchableOpacity>
        )
    }


    onShowAllPhotosPress(initialIndex = 0) {
        const {photos} = this.props,
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

F8PhotoHorizonListView.propTypes = {
    showPhotoFooter: PropTypes.bool,
};

F8PhotoHorizonListView.defaultProps = {
    showPhotoFooter: true,
};


module.exports = F8PhotoHorizonListView;

