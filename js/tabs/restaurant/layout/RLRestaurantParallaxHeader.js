/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Text,
    Platform,
    Dimensions
} from 'react-native'

const F8StarIcon = require('F8StarIcon')

import commonStyles from '../../../common/commonStyle'

const styles = StyleSheet.create({
    restaurantParallaxDisplayText: {
        height: 36,
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: -1,
        color: 'white'
    },
    restaurantParallaxMiddleSection: {
        height: 28,
        flexDirection: 'row',
        alignItems: 'center',
    },
    restaurantParallaxMiddleText: {
        marginLeft: 4,
        fontSize: 12,
        color: "#ccc"
    },
    restaurantParallaxAddressText: {
        fontSize: 12,
        color: "white"
    }
});

class RLRestaurantParallaxHeader extends Component {

    render() {
        const {forRestaurant} = this.props;

        return (
            <View style={commonStyles.parallaxForegroundContentContainer}>
                <Text style={styles.restaurantParallaxDisplayText}>{forRestaurant.displayName}</Text>
                <Text style={styles.restaurantParallaxAddressText}>{forRestaurant.address}</Text>
            </View>
        )
    }


}


module.exports = RLRestaurantParallaxHeader;


