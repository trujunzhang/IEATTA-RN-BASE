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

// const {width, height} = Dimensions.get('window')

const F8Colors = require('F8Colors')

const PHOTO_ITEM_WIDTH = 100;

export default StyleSheet.create({
    photoHorizonContainer: { //  className="island island--light"
        flex: 1,
        // width: width,
        height: F8Colors.photoBrowserHeight,
        flexDirection: 'column',
        backgroundColor: 'white',
        marginTop: 30,
        marginBottom: 30,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#ccc"
    },
    seeAllPhotosButton: {
        marginTop: 10,
        height: 43,
        borderRadius: 4
    },
    seeAllPhotosButtonText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold'
    },
    photoFooterSection: {
        width: PHOTO_ITEM_WIDTH,
        height: PHOTO_ITEM_WIDTH,
        marginRight: 6
    },
    photoFooterPanel: {
        width: PHOTO_ITEM_WIDTH,
        height: PHOTO_ITEM_WIDTH,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: F8Colors.controllerViewColor
    },
    photoFooterSectionText: {
        fontSize: 14,
        color: '#666',
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    },
    photoRowSection: {
        width: PHOTO_ITEM_WIDTH,
        height: PHOTO_ITEM_WIDTH,
        marginRight: 6
    },
    photoRowImage: {
        width: PHOTO_ITEM_WIDTH,
        height: PHOTO_ITEM_WIDTH,
        borderRadius: 4,
    }
});





