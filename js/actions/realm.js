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


const _ = require('underscore')
import type {Action, ThunkAction} from './types'

const {
    RestaurantService, EventService, PeopleInEventService,
    RecipeService,
    PhotoService,
    UserService,
    ReviewService
} = require('../parse/realmApi').default


/**
 * The states were interested in
 */
const {
    QUERY_NEAR_RESTAURANTS,
    QUERY_EVENTS_FOR_RESTAURANT,
    QUERY_PHOTOS_BY_TYPE,
    QUERY_USERS_FOR_EVENT,
    QUERY_RECIPES_FOR_USER,
    QUERY_SEARCH_USERS,
    QUERY_REVIEWS,
    PARSE_ORIGINAL_IMAGES,
    PARSE_THUMBNAIL_IMAGES
} = require('../lib/constants').default


async function _queryNearRestaurant(term: Object, type): Promise<Array<Action>> {
    let results = RestaurantService.findByTerm(term)

    const action = {
        type: type,
        payload: results
    }
    return Promise.all([
        Promise.resolve(action)
    ])
}

async function _queryPeopleForEvent(restaurantId: string, eventId: string): Promise<Array<Action>> {
    const peopleInEvent = PeopleInEventService.findTerm(restaurantId, eventId)
    const ids = _.pluck(peopleInEvent, 'userId')
    const results = UserService.getUsersContainedIn(ids)
    const action = {
        type: QUERY_USERS_FOR_EVENT,
        payload: {restaurantId, eventId, results}
    }
    return Promise.all([
        Promise.resolve(action)
    ])
}


async function _queryEventsForRestaurant(restaurant): Promise<Array<Action>> {
    const uniqueId = restaurant.uniqueId;
    const results = EventService.findAll().filtered('restaurantUniqueId = $0', uniqueId);

    const action = {
        type: QUERY_EVENTS_FOR_RESTAURANT,
        payload: {
            uniqueId,
            results
        }
    }
    return Promise.all([
        Promise.resolve(action)
    ])
}


async function _queryPhotosByType(photoType: string, forObjectId: string): Promise<Array<Action>> {
    let results = [];
    if (!!forObjectId) {
        results = PhotoService.findAll().filtered('forObjectUniqueId == $0 AND photoType == $1', forObjectId, photoType);
    }

    const action = {
        type: QUERY_PHOTOS_BY_TYPE,
        payload: {forObjectId, results}
    }
    return Promise.all([
        Promise.resolve(action)
    ])
}


async function _queryRecipesForUser(restaurantId: string, eventId: string, userId: string): Promise<Array<Action>> {
    const results = RecipeService.findAll().filtered(
        'restaurantId == $0 AND eventId == $1 AND userId == $2',
        restaurantId, eventId, userId);

    const action = {
        type: QUERY_RECIPES_FOR_USER,
        payload: {
            restaurantId,
            eventId,
            userId,
            results
        }
    }
    return Promise.all([
        Promise.resolve(action)
    ])
}


async function _queryUsers(term: Object): Promise<Array<Action>> {
    const results = UserService.findByTerm(term)
    const action = {
        type: QUERY_SEARCH_USERS,
        payload: results
    }
    return Promise.all([
        Promise.resolve(action)
    ])
}


async function _queryReviews(term: object): Promise<Array<Action>> {
    const results = ReviewService.findByTerm(term)
    const action = {
        type: QUERY_REVIEWS,
        payload: {...term, results}
    }
    return Promise.all([
        Promise.resolve(action)
    ])
}

function queryListFromAction(action: Promise<Array<Action>>): ThunkAction {
    return (dispatch) => {
        action.then(([result]) => {
            dispatch(result)
        })
        return action
    }
}

export default {

    queryPhotosByType(photoType: string, forObjectId: string): ThunkAction {
        return queryListFromAction(_queryPhotosByType(photoType, forObjectId))
    },

    queryNearRestaurant(term: Object = {}, type = QUERY_NEAR_RESTAURANTS): ThunkAction {
        return queryListFromAction(_queryNearRestaurant(term, type))
    },

    queryEventsForRestaurant(restaurant): ThunkAction {
        return queryListFromAction(_queryEventsForRestaurant(restaurant))
    },

    queryPeopleForEvent(restaurantId: string, eventId: string): ThunkAction {
        return queryListFromAction(_queryPeopleForEvent(restaurantId, eventId))
    },

    queryRecipesForUser(restaurantId: string, eventId: string, userId: string): ThunkAction {
        return queryListFromAction(_queryRecipesForUser(restaurantId, eventId, userId))
    },

    queryUsers(term: Object = {}): ThunkAction {
        return queryListFromAction(_queryUsers(term))
    },
    queryReviews(term: object): ThunkAction {
        return queryListFromAction(_queryReviews(term))
    }
}
