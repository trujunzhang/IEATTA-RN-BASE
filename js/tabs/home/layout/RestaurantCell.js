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
    TouchableHighlight,
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native'

const {
    MENU_DETAILED_RESTAURANT_PAGE,
} = require('../../../lib/constants').default


const RestaurantRowHeight = 84

const F8Colors = require('F8Colors')
const F8PlaceHolderImage = require('F8PlaceHolderImage')
const F8StarIcon = require('F8StarIcon')

const {getLocalImagePath} = require('../../../parse/fsApi')

const {onCellItemPress} = require('../../filter/navigatorApp')

import Restaurants from '../../../lib/restaurants'

const styles = StyleSheet.create({
    restaurantContainer: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "white",
        height: RestaurantRowHeight
    },
    restaurantSection: { // .action-list .action
        flex: 1,
        marginHorizontal: -10,
        padding: 10,
        flexDirection: 'row'
    },
    restaurantLeftSection: {
        marginRight: 10,
        width: 60,
        height: 60
    },
    restaurantRightSection: {
        flex: 1,
        flexDirection: 'column'
    },
    restaurantRightTitle: {
        height: 20,
        fontWeight: "700",
        fontSize: 16,
        color: "#333"
    },
    restaurantRightAddress: {
        height: 20,
        fontSize: 14,
        color: "#333"
    },
    restaurantLeftImage: {
        flex: 1,
        borderRadius: 4,
        width: 60,
        height: 60
    },
    restaurantMiddleSection: {
        height: 28,
        flexDirection: 'row',
        alignItems: 'center'
    },
    restaurantMiddleText: {
        marginLeft: 4,
        fontSize: 12,
        color: "#666"
    },
    dateRow: {
        marginVertical: 2,
        height: 20,
        fontSize: 14,
        color: "#ccc"
    },
});

class RestaurantCell extends Component {
    renderLeft() {
        const {restaurant} = this.props;
        const localImagePath = getLocalImagePath(restaurant.listPhotoId);

        return (
            <View style={styles.restaurantLeftSection}>
                <F8PlaceHolderImage
                    style={styles.restaurantLeftImage}
                    source={{uri: `file://${localImagePath}`}}
                    placeholderSource={require('../../img/blank_biz_small.png')}
                />
            </View>
        )
    }

    renderMiddle() {
        return (
            <View style={styles.restaurantMiddleSection}>
                <Text style={styles.dateRow}>{Restaurants.toDateString(this.props.restaurant.updatedAt)}</Text>
            </View>
        )
    }

    renderRight() {
        const {restaurant} = this.props;
        return (
            <View style={styles.restaurantRightSection}>
                <Text style={styles.restaurantRightTitle}>{restaurant.displayName}</Text>
                {this.renderMiddle()}
                <Text numberOfLines={1} style={styles.restaurantRightAddress}>{restaurant.address}</Text>
            </View>
        )
    }

    renderCell() {
        const {restaurant} = this.props;
        return (
            <View key={restaurant.objectId} style={styles.restaurantContainer}>
                <View style={styles.restaurantSection}>
                    {this.renderLeft()}
                    {this.renderRight()}
                </View>
            </View>
        )
    }

    render() {
        return (
            <TouchableHighlight underlayColor={F8Colors.cellUnderlayColor} onPress={this.onPress.bind(this)}>
                {this.renderCell()}
            </TouchableHighlight>
        )
    }

    onPress() {
        const {restaurant} = this.props;

        onCellItemPress(this.props,
            MENU_DETAILED_RESTAURANT_PAGE,
            {restaurant}
        )

        if (__DEV__ && restaurant.objectId === 'OnNGSfwoou' && false) {
            onCellItemPress(this.props,
                MENU_DETAILED_RESTAURANT_PAGE,
                {restaurant}
            )

            const event = {
                "objectId": "p25iag5OcM",
                "updatedAt": "2017-07-12T01:16:19.472Z",
                "displayName": "Outdoor Skating and Holiday Festivities in Downtown Burbank",
                "start": "2017-06-28T10:30:57.566Z",
                "end": "2017-06-28T11:30:57.566Z",
                "want": "Downtown Burbank Announces 2015 Return of Outdoor Skating and Holiday Festivities Downtown Burbank's most festive holiday tradition returns for outdoor ice skating, fundraising events, and special performances at The Rink in Downtown Burbank. The fun begins December 10, 2015 and runs through January 3, 2016.",
                "restaurantId": "OnNGSfwoou",
                "restaurantName": "LISA"
            }
            // this.props.navigator.push({event: event, forRestaurant: restaurant});

            const user = {
                "objectId": "aGkde8iuL6",
                "updatedAt": "2017-07-11T07:47:06.425Z",
                "loginType": "email",
                "displayName": "Jaron Lawrence",
                "email": "",
                "listPhotoId": 'qwoE6PL0iP'
            }
            // this.props.navigator.push({
            //     orderedUser: user,
            //     forRestaurant: restaurant,
            //     forEvent: event
            // });
            const recipe = {
                "objectId": "GsJxbBcJaE",
                "updatedAt": "2017-07-11T13:07:00.434Z",
                "displayName": "House salad with salmon",
                "price": "40",
                "restaurantId": "",
                "eventId": "",
                "userId": "",
                "listPhotoId": "HdxKn0YrZZ",
            }
            // this.props.navigator.push({
            //     recipe: recipe,
            //     forRestaurant: restaurant,
            //     forEvent: event,
            //     forUser: user
            // });
        }
    }

    componentDidMount() {
        if (__DEV__) {
            // this.onPress()
        }
    }


}

module.exports = RestaurantCell;
