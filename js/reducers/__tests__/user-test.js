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

jest.dontMock('../user')
const User = require('../user')

import Users from '../../lib/users';

/**
 * The states were interested in
 */
const {
    LOGGED_IN,
    LOGGED_OUT,
    SKIPPED_LOGIN,
} = require('../../lib/constants').default

const emptyUser = Users.getAnonymousUser()

const loggedUser = {
    id: '1212',
    username: 'test',
    displayName: 'test',
    loginType: 'email',
    email: 'test@gmail.com',
    uniqueId: '1212',
    listPhotoId: '',
}

const initialTestState = {
    isLoggedIn: false,
    hasSkippedLogin: false,
    ...emptyUser
}
const initialTestStateWithUser = {
    isLoggedIn: false,
    hasSkippedLogin: false,
    ...loggedUser
}
const initialTestStateWithSyncDate = {
    isLoggedIn: false,
    hasSkippedLogin: false,
    ...emptyUser
}
const initialTestStateWithSyncDateAndUser = {
    isLoggedIn: false,
    hasSkippedLogin: false,
    ...loggedUser
}

describe('user reducer', () => {

    it('is empty by default', () => {
        expect(User(undefined, ({}: any))).toEqual(initialTestState);
    })

    /**
     * type is "LOGGED_OUT"
     */
    it('user logged out after had some sync tasks.', () => {
        expect(
            User(initialTestState, {type: LOGGED_OUT})
        ).toEqual({
            isLoggedIn: false,
            hasSkippedLogin: true,
            ...emptyUser
        })
    })

    it('user logged out after had some sync tasks.', () => {
        expect(
            User(initialTestStateWithSyncDate, {type: LOGGED_OUT})
        ).toEqual({
            isLoggedIn: false,
            hasSkippedLogin: true,
            ...emptyUser
        })
    })

    /**
     * type is "SKIPPED_LOGIN"
     */
    it('skip login run the app at first time', () => {
        expect(
            User(initialTestState, {type: SKIPPED_LOGIN})
        ).toEqual({
            isLoggedIn: false,
            hasSkippedLogin: true,
            ...emptyUser
        })
    })

    it('skip login run the app at first time after had some sync tasks.', () => {
        expect(
            User(initialTestStateWithSyncDate, {type: SKIPPED_LOGIN})
        ).toEqual({
            isLoggedIn: false,
            hasSkippedLogin: true,
            ...emptyUser
        })
    })

    /**
     * type is "LOGGED_IN"
     */
    it('user has logged in', () => {
        expect(
            User(initialTestState, {type: LOGGED_IN, payload: loggedUser})
        ).toEqual({
            isLoggedIn: true,
            hasSkippedLogin: false,
            ...loggedUser
        })
    })

    it('user has logged in after had some sync tasks.', () => {
        expect(
            User(initialTestStateWithSyncDate, {type: LOGGED_IN, payload: loggedUser})
        ).toEqual({
            isLoggedIn: true,
            hasSkippedLogin: false,
            ...loggedUser
        })
    })

});
