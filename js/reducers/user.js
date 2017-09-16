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

import type {Action} from '../actions/types'

import Users from '../lib/users';

/**
 * The states were interested in
 */
const {
    LOGGED_IN,
    LOGGED_OUT,
    SKIPPED_LOGIN,
} = require('../lib/constants').default


export type State = {
    isLoggedIn: boolean;
    hasSkippedLogin: boolean;
    id: ?string;
    username: ?string;
    email: ?string;
    loginType: ?string;
    listPhotoId: ?string;
    uniqueId: ?string;
}

/**
 * Sometimes, If the users run the 'IEATTA' app, but network is unavailability.
 * So give the users the 'anonymous' user firstly to let them can use the app.
 *
 * The uniqueId and the password is the same as '12345654321'.
 *
 * @type {{id: null, name: string, slug: string, email: string, loginType: string, uniqueId: string}}
 */
const anonymousUser = Users.getAnonymousUser()

const initialState = {
    isLoggedIn: false,
    hasSkippedLogin: false,
    ...anonymousUser,
}

function user(state: State = initialState, action: Action): State {
    if (action.type === LOGGED_IN) {
        const {id, username, email, loginType, listPhotoId, uniqueId} = action.payload
        const displayName = username;
        const nextState = Object.assign({}, state, {
            isLoggedIn: true,
            hasSkippedLogin: false,
            id,
            username, displayName,
            email, loginType, uniqueId,
            listPhotoId
        })
        return nextState
    }
    if (action.type === SKIPPED_LOGIN) {
        const nextState = Object.assign({}, state, {
            isLoggedIn: false,
            hasSkippedLogin: true,
        })
        return nextState
    }
    if (action.type === LOGGED_OUT) {
        const nextState = Object.assign({}, state, {
            isLoggedIn: false,
            hasSkippedLogin: true,
            ...anonymousUser
        })
        return nextState
    }


    return state;
}

module.exports = user;
