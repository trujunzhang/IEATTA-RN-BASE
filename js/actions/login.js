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
const Parse = require('parse/react-native')

const UUID = require('../components/vendor/uuid');

/**
 * The states were interested in
 */
const {
    LOGGED_IN,
    LOGGED_OUT,
    SET_SHARING,
} = require('../lib/constants').default

let slugify = require('slugify')

const {fromParseUser} = require('../parse/parseModels')

const {
    getLocalImagePath,
    downloadPhoto,
    existLocalImage
} = require('../parse/fsApi')

import type {Action, ThunkAction} from './types'

const {
    UserService,
} = require('../parse/realmApi').default


async function _logInWithPassword(username: string, password: string): Promise<Array<Action>> {
    const user = new Parse.User()
    user.set('username', username)
    user.set('password', password)

    await user.logIn()

    const parseUserModel = fromParseUser(user)
    UserService.refreshLocalUser(parseUserModel)

    const action = {
        type: LOGGED_IN,
        payload: parseUserModel
    };

    return Promise.all([
        Promise.resolve(action)
    ]);
}

function logInWithPassword(username: string, password: string): ThunkAction {
    return (dispatch) => {
        const action = _logInWithPassword(username, password);

        // Loading friends schedules shouldn't block the login process
        action.then(
            ([result]) => {
                dispatch(result);
            }
        );
        return action;
    };
}


async function _signUpWithPassword(username: string, email: string, password: string): Promise<Array<Action>> {
    const user = new Parse.User()
    user.set('username', username)
    user.set('slug', slugify(username, '_'))
    user.set('uniqueId', UUID.create().toString())
    user.set('password', password)
    user.set('email', email)

    await user.signUp({'loginType': 'email'})

    await user.save();

    const parseUserModel = fromParseUser(user)
    UserService.refreshLocalUser(parseUserModel)

    const action = {
        type: LOGGED_IN,
        payload: parseUserModel
    }

    return Promise.all([
        Promise.resolve(action)
    ])
}

function signUpWithPassword(username: string, email: string, password: string): ThunkAction {
    return (dispatch) => {
        const action = _signUpWithPassword(username, email, password)

        // Loading friends schedules shouldn't block the login process
        action.then(
            ([result]) => {
                dispatch(result)
            }
        )
        return action
    }
}


export default {
    signUpWithPassword, logInWithPassword
}
