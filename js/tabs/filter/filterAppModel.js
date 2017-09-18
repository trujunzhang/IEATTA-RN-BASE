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
'use strict'


export function filterEvents(nextProps: Any, forRestaurantUniqueId: String) {
    const {appModel} = nextProps;
    if (!!appModel) {
        const {events} = appModel;
        if (!!events) {
            const {uniqueId, results} = events;
            if (!!uniqueId && uniqueId === forRestaurantUniqueId) {
                return results;
            }
        }
    }
    return null;
}


export function filterUserInEvent(nextProps: Any, forRestaurantId: String, forEventId: String) {
    const {appModel} = nextProps;
    if (!!appModel) {
        const {usersInEvent} = appModel;
        if (!!usersInEvent) {
            const {restaurantId, eventId, results} = usersInEvent;
            if (!!restaurantId && restaurantId === forRestaurantId &&
                !!eventId && eventId === forEventId) {
                return results;
            }
        }
    }
    return null;
}

export function filterOrderedRecipes(nextProps: Any, forRestaurantId: String, forEventId: String, forUserId: String) {
    const {appModel} = nextProps;
    if (!!appModel) {
        const {orderedRecipes} = appModel;
        if (!!orderedRecipes) {
            const {restaurantId, eventId, userId, results} = orderedRecipes;
            if (!!restaurantId && restaurantId === forRestaurantId &&
                !!eventId && eventId === forEventId &&
                !!userId && userId === forUserId) {
                return results;
            }
        }
    }
    return null;
}


export function filterReviews(nextProps: Any, forObjectSchemaName: String, objectId: String) {
    const {appModel} = nextProps;
    if (!!appModel) {
        const {reviews} = appModel;
        if (!!reviews) {
            const {forObjectId, results, objectSchemaName} = reviews;
            if (!!objectSchemaName && objectSchemaName === forObjectSchemaName) {
                if (!!forObjectId) {
                    if (forObjectId === objectId) {
                        return results;
                    }
                } else {// For reviews search
                    return results;
                }
            }
        }
    }
    return null;
}

export function photosBySectionType(nextProps: Any, sectionType: String, forItem: Object, lastResults: Array) {
    const {appModel} = nextProps;
    if (!!appModel && !!forItem) {
        const {photosForObject} = appModel;
        const {forObjectId, results} = photosForObject;
        const {uniqueId} = forItem;
        if (!!forObjectId && !!forItem) {
            if (forObjectId === uniqueId) {
                return results;
            }
        }
    }

    return lastResults;
}


