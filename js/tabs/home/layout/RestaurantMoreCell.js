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
    Dimensions
} from 'react-native'

import Svg, {
    G,
    Path,
} from 'react-native-svg'

const {onCellItemPress} = require('../../filter/navigatorApp')

const {
    MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
    MENU_ITEM_SEARCH_RESTAURANTS,
    MENU_ITEM_MANAGE_FRIENDS,
    MENU_ITEM_READ_REVIEWS
} = require('../../../lib/constants').default

const CategoriesRowHeight = 50


const styles = StyleSheet.create({
    restaurantMoreContainer: {
        flex: 1,
        backgroundColor: "white",
        height: CategoriesRowHeight,
        flexDirection: 'row',
        alignItems: 'center'
    },
    restaurantMoreSection: {
        flex: 1,
        height: 22,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8
    },
    restaurantMoreTitle: {
        marginLeft: 6,
        fontSize: 18,
        color: '#333'
    }
});

class RestaurantMoreCell extends Component {

    render() {
        return (
            <TouchableOpacity
                accessibilityTraits="button"
                onPress={this.onPress.bind(this)}>
                {this.renderContent()}
            </TouchableOpacity>
        )
    }

    onPress() {
        const {item} = this.props,
            {tag, icon, model} = item;

        onCellItemPress(this.props, tag, {model})
    }

    renderIcon() {
        const {item} = this.props,
            {tag, icon} = item;

        if (tag === MENU_ITEM_MANAGE_FRIENDS) {
            return (
                <Svg width="24" height="24">
                    <G>
                        <Path fill="#666"
                              d="M10.824 13.817l-2.482 5.946c-.69 1.65-2.995 1.65-3.684 0l-2.482-5.946C1.618 12.48 2.586 11 4.018 11h4.964c1.432 0 2.4 1.48 1.842 2.817zM6.5 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                        <Path fill="#666"
                              d="M21.824 13.817l-2.482 5.946c-.69 1.65-2.995 1.65-3.684 0l-2.482-5.946c-.558-1.337.41-2.817 1.842-2.817h4.964c1.432 0 2.4 1.48 1.842 2.817zM17.5 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                              opacity=".502"/>
                    </G>
                </Svg>
            )
        }
        return (
            <Svg width="24" height="24">
                <Path fill="#666" d={icon}/>
            </Svg>
        )
    }

    renderContent() {
        const {item} = this.props
        return (
            <View key={item.tage}
                  style={styles.restaurantMoreContainer}>
                <View style={styles.restaurantMoreSection}>
                    {this.renderIcon()}

                    <Text style={styles.restaurantMoreTitle}>{item.title}</Text>
                </View>
            </View>
        )
    }

}

module.exports = RestaurantMoreCell;
