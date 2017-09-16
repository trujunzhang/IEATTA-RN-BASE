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

const F8PlaceHolderImage = require('F8PlaceHolderImage')
const CaptionTextView = require('CaptionTextView')
const {getLocalImagePath} = require('../../../parse/fsApi')

class RLOrderedUserParallaxHeader extends Component {

    renderLeft() {
        const {orderedUser} = this.props,
            localImagePath = getLocalImagePath(orderedUser.listPhotoId)
        return (
            <F8PlaceHolderImage style={[
                {
                    width: 60,
                    height: 60,
                    borderRadius: 4,
                }, {
                    marginTop: 0,
                    marginRight: 16,
                }
            ]}
                                source={{uri: `file://${localImagePath}`}}
                                placeholderSource={require('../../img/blank_user_small.png')}/>
        )
    }

    renderRight() {
        const {orderedUser, forRestaurant, forEvent} = this.props;
        return (
            <View>
                <Text style={{
                    width: width,
                    height: 36,
                    fontSize: 24,
                    fontWeight: 'bold',
                    letterSpacing: -1,
                    color: 'white'
                }}>{orderedUser.displayName}</Text>
                <CaptionTextView caption="Restaurant:" title={forRestaurant.displayName} themeColor="white"/>
                <CaptionTextView caption="Event:" title={forEvent.displayName} themeColor="white"/>
            </View>
        )
    }

    render() {
        return (
            <View style={{
                flex: 1,
                width: width,
                paddingHorizontal: 10,
                justifyContent: 'flex-end',
                paddingBottom: 20
            }}>
                <View style={{height: 140, flexDirection: 'row'}}>
                    {this.renderLeft()}
                    {this.renderRight()}
                </View>
            </View>
        )
    }


}


module.exports = RLOrderedUserParallaxHeader;

