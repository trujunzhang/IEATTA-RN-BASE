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
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */

'use strict'

// ========================
// For Web Apps
// ========================
const Parse = require('parse/react-native');

const ActionSheetIOS = require('ActionSheetIOS');
const {Platform} = require('react-native');
const Alert = require('Alert');

/**
 * The states were interested in
 */
const {
    LOGGED_IN,
    LOGGED_OUT,
    SKIPPED_LOGIN,
} = require('../lib/constants').default

import type {Action, ThunkAction} from './types'

function skipLogin(): Action {
    return {
        type: SKIPPED_LOGIN,
    }
}


function logOut(): ThunkAction {
    return (dispatch) => {
        Parse.User.logOut()
        // FB.logout()
        // FacebookSDK.logout()

        // TODO: Make sure reducers clear their state
        return dispatch({
            type: LOGGED_OUT,
        })
    }
}


function logOutWithPrompt(): ThunkAction {
    return (dispatch, getState) => {
        let name = getState().user.name || 'there';

        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    title: `Hi, ${name}`,
                    options: ['Log out', 'Cancel'],
                    destructiveButtonIndex: 0,
                    cancelButtonIndex: 1,
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) {
                        dispatch(logOut());
                    }
                }
            );
        } else {
            Alert.alert(
                `Hi, ${name}`,
                'Log out from IEATTA?',
                [
                    { text: 'Cancel' },
                    { text: 'Log out', onPress: () => dispatch(logOut()) },
                ]
            );
        }
    };
}



export default {
    skipLogin, logOut,
    logOutWithPrompt
}
