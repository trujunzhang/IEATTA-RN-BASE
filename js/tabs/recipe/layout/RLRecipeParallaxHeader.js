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

const {width, height} = Dimensions.get('window')

const F8StarIcon = require('F8StarIcon')
const CaptionTextView = require('CaptionTextView')

import commonStyles from '../../../common/commonStyle'

const styles = StyleSheet.create({
    recipeNameText: {
        width: width,
        height: 36,
        letterSpacing: -1,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    }
});


class RLRecipeParallaxHeader extends Component {

    /**
     * className:'biz-rating biz-rating-large clearfix'
     * @returns {XML}
     */
    renderMiddle() {
        return (
            <View style={{
                height: 28,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <F8StarIcon/>
                <Text style={{
                    marginLeft: 4,
                    fontSize: 12,
                    color: "#ccc"
                }}>{"30 reviews"}</Text>
            </View>
        )
    }

    renderBottom() {
        const {forRestaurant} = this.props
        return (
            <Text style={{fontSize: 12, color: "white"}}>
                {forRestaurant.address}
            </Text>
        )
    }

    render() {
        const {recipe, forUser, forEvent, forRestaurant} = this.props;

        return (
            <View style={commonStyles.parallaxForegroundContentContainer}>
                <Text numberOfLines={1} style={styles.recipeNameText}>{recipe.displayName}</Text>
                <CaptionTextView caption="$" title={recipe.price} themeColor="white"/>
                <CaptionTextView caption="User: " title={forUser.displayName} themeColor="white"/>
                {this.renderBottom()}
            </View>
        )
    }


}


module.exports = RLRecipeParallaxHeader;

