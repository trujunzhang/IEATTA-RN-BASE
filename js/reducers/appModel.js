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

import type {Action} from '../actions/types';


/**
 * ## Auth actions
 */
const {
    QUERY_NEAR_RESTAURANTS,
    SEARCH_NEAR_RESTAURANTS,
    QUERY_EVENTS_FOR_RESTAURANT,
    QUERY_PHOTOS_BY_TYPE,
    QUERY_USERS_FOR_EVENT,
    QUERY_RECIPES_FOR_USER,
    QUERY_SEARCH_USERS,
    QUERY_REVIEWS,
    PHOTO_BROWSER_OPEN,
    PHOTO_BROWSER_CLOSE,
} = require('../lib/constants').default

const initialState = {
    //isPhotoBrowser: false,
    isPhotoBrowser: true,
    restaurants: [],
    searchRestaurants: [],
    events: [],
    restaurantPhoto: {},
    photosBrowser: {},
    photosForObject: {}
}

function appModel(state: State = initialState, action: Action): State {
    if (action.type === SEARCH_NEAR_RESTAURANTS) {
        const nextState = Object.assign({}, state, {
            searchRestaurants: action.payload
        })
        return nextState
    }

    if (action.type === QUERY_NEAR_RESTAURANTS) {
        const nextState = Object.assign({}, state, {
            restaurants: action.payload
        })
        return nextState
    }

    if (action.type === QUERY_EVENTS_FOR_RESTAURANT) {
        const nextState = Object.assign({}, state, {
            events: action.payload
        })
        return nextState
    }
    if (action.type === QUERY_PHOTOS_BY_TYPE) {
        const nextState = Object.assign({}, state, {
            photosForObject: action.payload
        })
        return nextState
    }
    if (action.type === QUERY_USERS_FOR_EVENT) {
        const nextState = Object.assign({}, state, {
            usersInEvent: action.payload
        })
        return nextState
    }
    if (action.type === QUERY_RECIPES_FOR_USER) {
        const nextState = Object.assign({}, state, {
            orderedRecipes: action.payload
        })
        return nextState
    }
    if (action.type === QUERY_SEARCH_USERS) {
        const nextState = Object.assign({}, state, {
            searchUsers: action.payload
        })
        return nextState
    }
    if (action.type === QUERY_REVIEWS) {
        const nextState = Object.assign({}, state, {
            reviews: action.payload
        })
        return nextState
    }
    if (action.type === PHOTO_BROWSER_OPEN) {
        const nextState = Object.assign({}, state, {
            isPhotoBrowser: true,
            photosBrowser: action.payload
        })
        return nextState
    }
    if (action.type === PHOTO_BROWSER_CLOSE) {
        const nextState =
            Object.assign({}, state, {
                isPhotoBrowser: false,
                photosBrowser: {}
            })
        return nextState
    }

    return state;
}

module.exports = appModel;
