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
    ScrollView,
    StyleSheet,
    StatusBar,
    Dimensions
} from 'react-native'

const {width, height} = Dimensions.get('window')

const FormButton = require('FormButton')

const {
    RestaurantService,
} = require('../parse/realmApi').default

class NearbyGeoMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurantCount: 0
        };
    }

    onRegionChange(region) {
        this.setState({region});
    }

    onQueryButtonPress() {
        const query = [
            {
                hash: 'w21zfgn73nr6',
                location: [1.379376, 103.840423]
            }
        ]
        const current = query[0]
        debugger
        let count = RestaurantService.findByTerm({
            position: {
                coords: {
                    latitude: current.location[0],
                    longitude: current.location[1],
                }
            }
        }).length
        debugger
    }

    onButtonPress() {
        const locations = [
            [1.378647, 103.841764],
            [1.378306, 103.838761],
            [1.378714, 103.836980],
            [1.381202, 103.835285],
            [1.381523, 103.836261],
        ];

        locations.map((item, index) => {
            const restaurant = {
                id: `${index}`,
                updatedAt: new Date(),
                uniqueId: `${index}`,
                flag: '1',
                displayName: `${index}`,
                geoLocation: {
                    latitude: item[0],
                    longitude: item[1],
                },
                address: `${index}`,
            }
            RestaurantService.saveTestItem(restaurant)
        })
    }

    render() {
        return (
            <View style={{flex: 1,}}>
                <StatusBar
                    translucent={true}
                    backgroundColor="rgba(0, 0, 0, 0.2)"
                    barStyle="light-content"/>
                <View style={{flex: 1, marginTop: 40}}>
                    <FormButton
                        onPress={this.onButtonPress.bind(this)}
                        buttonText={"Save"}/>
                    <FormButton
                        onPress={this.onQueryButtonPress.bind(this)}
                        buttonText={"Query"}/>
                </View>
            </View>
        )
    }
}

module.exports = NearbyGeoMap;
