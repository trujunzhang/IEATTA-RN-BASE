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

const F8PlaceHolderImage = require('F8PlaceHolderImage')
const CaptionTextView = require('CaptionTextView')
const {getLocalImagePath} = require('../../../parse/fsApi')

import commonStyles from '../../../common/commonStyle'

/**
 *
 * className="arrange arrange--12"
 * className="event-details_header ysection"
 *
 * className:'biz-rating biz-rating-large clearfix'
 * @returns {XML}
 */
const styles = StyleSheet.create({
    eventParallaxSection: {
        // height: 140,
        flexDirection: 'row',
        // backgroundColor: 'orange'
    },
    eventParallaxLeftSection: {
        width: 60,
        height: 60,
        borderRadius: 4,
        marginTop: 10,
        marginRight: 16,
        justifyContent: 'flex-start',
    },
    eventParallaxRightSection: {},
    eventParallaxDisplayText: {
        paddingBottom: 8,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    }
});

class RLEventParallaxHeader extends Component {

    renderLeft() {
        const {forRestaurant} = this.props,
            localImagePath = getLocalImagePath(forRestaurant.listPhotoId)
        return (
            <F8PlaceHolderImage style={styles.eventParallaxLeftSection}
                                source={{uri: `file://${localImagePath}`}}
                                placeholderSource={require('../../img/blank_biz_small.png')}/>
        )
    }

    renderRight() {
        const {event, forRestaurant} = this.props
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <Text numberOfLines={3}
                      style={styles.eventParallaxDisplayText}>
                    {event.displayName}
                </Text>
                <CaptionTextView caption="Restaurant:" title={forRestaurant.displayName} themeColor="white"/>
            </View>
        )
    }


    render() {
        return (
            <View style={commonStyles.parallaxForegroundContentContainer}>
                <View style={styles.eventParallaxSection}>
                    {this.renderRight()}
                </View>
            </View>
        )
    }
}


module.exports = RLEventParallaxHeader;

