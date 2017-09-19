/**
 * The necessary React components
 */
import React, {Component} from 'react'
import
{
    StyleSheet,
    View,
    Dimensions,
} from 'react-native'

const F8Colors = require('F8Colors')

/**
 * ## Styles
 */
export default StyleSheet.create({
    listViewHeaderContainer: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        backgroundColor: F8Colors.controllerViewColor
    },
    parallaxForegroundContentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        paddingBottom: 40
    },
    blurForegroundView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.4)'
    },
    listRowSeparator: {
        backgroundColor: '#eeeeee',
        height: 1,
    },
    rowDirection: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    columnDirection: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    columnLeftDirection: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    absoluteFullSection: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    boarderBottomDivide: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    boarderRect: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#ccc",
    }
})
