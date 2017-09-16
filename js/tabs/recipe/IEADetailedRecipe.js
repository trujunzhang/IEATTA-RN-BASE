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

const F8Colors = require('F8Colors')
const F8DrawerLayout = require('F8DrawerLayout')

const RLRecipeParallaxHeader = require('./layout/RLRecipeParallaxHeader')
const DetailedRecipeListView = require('./layout/DetailedRecipeListView')

const {getLocalImagePath} = require('../../parse/fsApi')

/**
 * The states were interested in
 */
const {
    PARSE_ORIGINAL_IMAGES,
    PARSE_THUMBNAIL_IMAGES,
    PARSE_RECIPES,
} = require('../../lib/constants').default

class IEADetailedRecipe extends React.Component {

    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    render() {

        const {recipe} = this.props.navigation.state.params;

        const content = (
            <DetailedRecipeListView
                {...this.props.navigation.state.params}
                {...this.props}
                forObject={recipe}
                objectSchemaName={PARSE_RECIPES}
                renderParallaxHeader={() => {
                    return (<RLRecipeParallaxHeader
                        {...this.props.navigation.state.params}
                        {...this.props}/>)
                }}
            />

        )

        return content;

    }

}

module.exports = IEADetailedRecipe;
