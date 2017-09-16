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
 * @providesModule OrderedRecipeCell
 * @flow
 */

'use strict';


/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableHighlight,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native'

const CellRowHeight = 84

import Recipes from '../../../lib/recipes'

const F8Colors = require('F8Colors')
const F8PlaceHolderImage = require('F8PlaceHolderImage')
const {Text} = require('F8Text')
const CaptionTextView = require('CaptionTextView')

const {getLocalImagePath} = require('../../../parse/fsApi')

const F8StarIcon = require('F8StarIcon')
import Icon from 'react-native-vector-icons/FontAwesome';

const {onCellItemPress} = require('../../filter/navigatorApp')

const {
    MENU_DETAILED_RECIPE_PAGE,
} = require('../../../lib/constants').default

const styles = StyleSheet.create({
    orderedRecipeCellContainer: {
        flex: 1,
        paddingLeft: 10,
        marginRight: 10,
        backgroundColor: "white",
        height: CellRowHeight,
    },
    orderedRecipeCellSection: { //{/*.action-list .action*/}
        flex: 1,
        marginLeft: -10,
        marginRight: -10,
        padding: 10,
        flexDirection: 'row',
    },
    orderedRecipeLeftSection: {
        marginRight: 10,
        width: 60,
        height: 60
    },
    orderedRecipeLeftImage: {
        flex: 1,
        borderRadius: 4
    },
    orderedRecipeMiddleSection: {
        height: 28,
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderedRecipeMiddleText: {
        marginLeft: 4,
        fontSize: 12,
        color: "#666"
    },
    orderedRecipeRightSection: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: 'blue'
    },
    orderedRecipeRightDisplayName: {
        height: 20,
        fontWeight: "700",
        fontSize: 16,
        color: "#333",
        marginBottom: 12,
    }
});


class OrderedRecipeCell extends React.Component {

    onPress() {
        const {orderedUser, forRestaurant, forEvent, recipe} = this.props;

        onCellItemPress(this.props,
            MENU_DETAILED_RECIPE_PAGE,
            {
                recipe: recipe,
                forRestaurant: forRestaurant,
                forEvent: forEvent,
                forUser: orderedUser
            }
        )
    }

    renderLeft() {
        const {recipe} = this.props,
            localImagePath = getLocalImagePath(recipe.listPhotoId)
        return (
            <View style={styles.orderedRecipeLeftSection}>
                <F8PlaceHolderImage
                    style={styles.orderedRecipeLeftImage}
                    source={{uri: `file://${localImagePath}`}}/>
            </View>
        )
    }


    renderMiddle() {
        const {recipe} = this.props;
        return (
            <View style={styles.orderedRecipeMiddleSection}>
                <Text style={styles.dateRow}>{Recipes.getUpdatedAtFormat(recipe)}</Text>
            </View>
        )
    }

    renderRight() {
        const {recipe} = this.props;
        return (
            <View style={styles.orderedRecipeRightSection}>
                <Text style={styles.orderedRecipeRightDisplayName}>{recipe.displayName}</Text>
                <CaptionTextView caption="$" title={recipe.price}/>
            </View>
        )
    }

    renderCell() {
        const {recipe} = this.props;
        return (
            <View key={recipe.objectId} style={styles.orderedRecipeCellContainer}>
                <View style={styles.orderedRecipeCellSection}>
                    {this.renderLeft()}
                    {this.renderRight()}
                </View>
                <View style={{position: 'absolute', right: 10, top: (CellRowHeight - 24) / 2}}>
                    <Icon name="angle-right" size={24} color="#C8C7CC"/>
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
}


module.exports = OrderedRecipeCell;
