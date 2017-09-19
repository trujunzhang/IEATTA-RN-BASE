/**
 * The components needed from React
 */

import {
    StyleSheet,
    Dimensions
} from 'react-native'

const F8Colors = require('F8Colors')

const scale = Dimensions.get('window').width / 375;

export default StyleSheet.create({
    // Common
    LoginScreenContainer: {
        flex: 1,
        backgroundColor: F8Colors.controllerViewColor
    },
    // LoginScreen
    screenContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    section: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    last: {
        justifyContent: 'flex-end',
    },
    h1: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: Math.round(40 * scale),
        color: F8Colors.darkText,
        backgroundColor: 'transparent'
    },
    h2: {
        textAlign: 'center',
        fontSize: 17,
        color: F8Colors.darkText,
        marginVertical: 20,
    },
    h3: {
        fontSize: 12,
        textAlign: 'center',
        color: F8Colors.lightText,
        letterSpacing: 1,
    },
    loginComment: {
        marginBottom: 14,
        fontSize: 12,
        color: F8Colors.darkText,
        textAlign: 'center',
    },
    skip: {
        position: 'absolute',
        right: 0,
        top: 20,
        padding: 15,
    },
    // LoginModal
    modelContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        padding: 20,
    },
    content: {
        padding: 30,
        backgroundColor: 'transparent',
        borderRadius: 3,
        alignItems: 'center',
        // Image's source contains explicit size, but we want
        // it to prefer flex: 1
        width: undefined,
        height: undefined,
    },
    modelH1: {
        fontSize: 22,
        fontWeight: 'bold',
        color: F8Colors.darkText,
        textAlign: 'center',
        marginTop: 130,
        marginBottom: 12,
    },
    modelH2: {
        fontSize: 18,
        lineHeight: 22,
        color: F8Colors.darkText,
        textAlign: 'center',
        marginBottom: 80,
    },
    notNowButton: {
        padding: 20,
    },
    notNowLabel: {
        color: F8Colors.lightText,
    },
    // Two horizontal buttons
    buttonSection: {
        flex: 2,
        marginRight: 8,
        borderRadius: 3,
    },
    loginButtonSection: {
        borderLeftWidth: 1,
        borderLeftColor: "#ccc",
        borderRightWidth: 1,
        borderRightColor: "#ccc",
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    loginButtonText: {
        color: "#666",
        fontSize: 14,
        fontWeight: 'bold'
    },
    signUpButtonSection: {
        borderLeftWidth: 1,
        borderLeftColor: "#8d0005",
        borderRightWidth: 1,
        borderRightColor: "#8d0005",
        borderTopWidth: 1,
        borderTopColor: "#8d0005",
        borderBottomWidth: 1,
        borderBottomColor: "#8d0005",
    },
    signUpButtonText: {
        color: "white",
        fontSize: 14,
        fontWeight: 'bold'
    },
})


