/**
 * The states were interested in
 */
const {
    PARSE_RESTAURANTS,
    PARSE_USERS,
    PARSE_RECORDS,
    PARSE_EVENTS,
    PARSE_RECIPES,
    PARSE_PHOTOS,
    PARSE_REVIEWS,
    PARSE_PEOPLE_IN_EVENTS
} = require('./constants').default


const {
    ParseRestaurant,
    ParseEvent,
    ParsePeopleInEvent,
    ParseUser,
    ParseReview,
    ParseRecipe,
    ParseRecord,
    ParsePhoto,
    getInstanceWithoutData,
    appendGeoLocation,
} = require('../parse/objects').default

const {encodeGeoHash} = require('../components/vendor/GeoHash')

import AppConstants from './appConstants'

const moment = require('moment')

const {
    getFirstRealmLocalObjectByUniqueId,
    getUniqueIdByType
} = require('../parse/realmUtiles').default

const {
    getFirstOnlineParseInstance
} = require('../parse/parseUtiles').default


const Records = {}

/**
 * @summary
 * @param {Object} objectSchemaName
 * @param recordParseModel: type of ParseObject
 */
Records.getRealmData = function (objectSchemaName, recordParseModel) {
    const _basicObject = {
        // Basic Fields
        objectId: recordParseModel.id,
        createdAt: recordParseModel.createdAt,
        updatedAt: recordParseModel.updatedAt,
        uniqueId: recordParseModel.uniqueId,
        flag: recordParseModel.flag
    }

    const geoLocation = recordParseModel.geoLocation || {latitude: 0, longitude: 0};

    switch (objectSchemaName) {
        case PARSE_RECORDS: //only for the local storage.
            const recordType = recordParseModel.recordType;
            const realmObject = recordParseModel.realmObject;

            return {
                // Basic Fields
                ..._basicObject,
                // Attributes
                recordType: recordType,
                // Relation(6+1)
                event: (recordType === 'event') ? realmObject : null,
                peopleInEvent: (recordType === 'peopleInEvent') ? realmObject : null,
                photo: (recordType === 'photo') ? realmObject : null,
                recipe: (recordType === 'recipe') ? realmObject : null,
                restaurant: (recordType === 'restaurant') ? realmObject : null,
                review: (recordType === 'review') ? realmObject : null,
            }

        case PARSE_USERS:
            return {
                // Basic Fields
                ..._basicObject,
                // Attributes
                loginType: recordParseModel.loginType,
                displayName: recordParseModel.username,
                email: recordParseModel.email,
                // Photos
                listPhotoId: recordParseModel.listPhotoId || '',
                // voting
                useful: recordParseModel.useful,
                funny: recordParseModel.funny,
                cool: recordParseModel.cool,
            }

        case PARSE_RESTAURANTS:
            return {
                // Basic Fields
                ..._basicObject,
                // Attributes
                displayName: recordParseModel.displayName,
                // Location
                latitude: geoLocation.latitude,
                longitude: geoLocation.longitude,
                address: recordParseModel.address || '',
                geoHash: encodeGeoHash(geoLocation.latitude, geoLocation.longitude),
                // Photos
                listPhotoId: recordParseModel.listPhotoId || '',
            }

        case PARSE_EVENTS:
            return {
                // Basic Fields
                ..._basicObject,
                // Attributes
                displayName: recordParseModel.displayName,
                start: recordParseModel.start,
                end: recordParseModel.end,
                want: recordParseModel.want,
                // Pointer
                restaurant: getFirstRealmLocalObjectByUniqueId(PARSE_RESTAURANTS, recordParseModel),
                restaurantUniqueId: recordParseModel.restaurant.uniqueId
            }

        case PARSE_PEOPLE_IN_EVENTS:
            return {
                // Basic Fields
                ..._basicObject,
                // Attributes
                // ...
                // Pointer
                restaurant: getFirstRealmLocalObjectByUniqueId(PARSE_RESTAURANTS, recordParseModel),
                event: getFirstRealmLocalObjectByUniqueId(PARSE_EVENTS, recordParseModel),
                user: getFirstRealmLocalObjectByUniqueId(PARSE_USERS, recordParseModel),
                restaurantId: recordParseModel.restaurant.id,
                eventId: recordParseModel.event.id,
                userId: recordParseModel.user.id
            }

        case PARSE_RECIPES:
            return {
                // Basic Fields
                ..._basicObject,
                // Attributes
                displayName: recordParseModel.displayName,
                price: recordParseModel.price,
                // Photos
                listPhotoId: recordParseModel.listPhotoId || '',
                // Pointer

                restaurant: getFirstRealmLocalObjectByUniqueId(PARSE_RESTAURANTS, recordParseModel),
                event: getFirstRealmLocalObjectByUniqueId(PARSE_EVENTS, recordParseModel),
                user: getFirstRealmLocalObjectByUniqueId(PARSE_USERS, recordParseModel),

                restaurantId: recordParseModel.restaurant.id,
                eventId: recordParseModel.event.id,
                userId: recordParseModel.user.id
            }

        case PARSE_PHOTOS:
            return {
                // Basic Fields
                ..._basicObject,
                // Attributes
                photoType: recordParseModel.photoType,
                // Pointer

                restaurant: getFirstRealmLocalObjectByUniqueId(PARSE_RESTAURANTS, recordParseModel),
                recipe: getFirstRealmLocalObjectByUniqueId(PARSE_RECIPES, recordParseModel),
                user: getFirstRealmLocalObjectByUniqueId(PARSE_USERS, recordParseModel),

                forObjectUniqueId: getUniqueIdByType(recordParseModel, recordParseModel.photoType),

                // Location
                latitude: geoLocation.latitude,
                longitude: geoLocation.longitude
            }

        case PARSE_REVIEWS:
            return {
                // Basic Fields
                ..._basicObject,
                // Attributes
                rate: recordParseModel.rate,
                body: recordParseModel.body,
                reviewType: recordParseModel.reviewType,

                // Pointer
                forObjectUniqueId: recordParseModel[recordParseModel.reviewType].uniqueId,

                restaurant: getFirstRealmLocalObjectByUniqueId(PARSE_RESTAURANTS, recordParseModel),
                event: getFirstRealmLocalObjectByUniqueId(PARSE_EVENTS, recordParseModel),
                recipe: getFirstRealmLocalObjectByUniqueId(PARSE_RECIPES, recordParseModel),

                // Relation
                userId: recordParseModel.user.id,
                user: getFirstRealmLocalObjectByUniqueId(PARSE_USERS, recordParseModel),

                // voting
                useful: recordParseModel.useful || 0,
                funny: recordParseModel.funny || 0,
                cool: recordParseModel.cool || 0
            }
    }
}

/**
 *
 * @param lastRealmObject
 * @param objectSchemaName
 * @param recordParseModel
 * @returns {*}
 */
Records.updateObject = function (lastRealmObject, objectSchemaName, recordParseModel) {
    const geoLocation = recordParseModel.geoLocation || {};
    switch (objectSchemaName) {
        case PARSE_RESTAURANTS:
            // Basic Fields
            // Attributes
            lastRealmObject.displayName = recordParseModel.displayName;
            // Location
            lastRealmObject.latitude = geoLocation.latitude;
            lastRealmObject.longitude = geoLocation.longitude;
            lastRealmObject.address = recordParseModel.address;
            lastRealmObject.geoHash = encodeGeoHash(geoLocation.latitude, geoLocation.longitude);
            // Photos
            lastRealmObject.listPhotoId = recordParseModel.listPhotoId || '';
            break;

        case PARSE_EVENTS:
            // Basic Fields
            // Attributes
            lastRealmObject.displayName = recordParseModel.displayName;
            lastRealmObject.start = recordParseModel.start;
            lastRealmObject.end = recordParseModel.end;
            lastRealmObject.want = recordParseModel.want;
            // Pointer
            lastRealmObject.restaurant = getFirstRealmLocalObjectByUniqueId(PARSE_RESTAURANTS, recordParseModel);
            lastRealmObject.restaurantId = recordParseModel.restaurant.id;
            break;

        case PARSE_PEOPLE_IN_EVENTS:
            // Basic Fields
            // Attributes
            // ...
            // Pointer
            lastRealmObject.restaurant = getFirstRealmLocalObjectByUniqueId(PARSE_RESTAURANTS, recordParseModel);
            lastRealmObject.event = getFirstRealmLocalObjectByUniqueId(PARSE_EVENTS, recordParseModel);
            lastRealmObject.user = getFirstRealmLocalObjectByUniqueId(PARSE_USERS, recordParseModel);
            lastRealmObject.restaurantId = recordParseModel.restaurant.id;
            lastRealmObject.eventId = recordParseModel.event.id;
            lastRealmObject.userId = recordParseModel.user.id;

            break;

        case PARSE_RECIPES:
            // Basic Fields
            // Attributes
            lastRealmObject.displayName = recordParseModel.displayName;
            lastRealmObject.price = recordParseModel.price;
            // Photos
            lastRealmObject.listPhotoId = recordParseModel.listPhotoId || '';
            // Pointer

            lastRealmObject.restaurant = getFirstRealmLocalObjectByUniqueId(PARSE_RESTAURANTS, recordParseModel);
            lastRealmObject.event = getFirstRealmLocalObjectByUniqueId(PARSE_EVENTS, recordParseModel);
            lastRealmObject.user = getFirstRealmLocalObjectByUniqueId(PARSE_USERS, recordParseModel);

            lastRealmObject.restaurantId = recordParseModel.restaurant.id;
            lastRealmObject.eventId = recordParseModel.event.id;
            lastRealmObject.userId = recordParseModel.user.id;
            break;

        case PARSE_REVIEWS:
            // Basic Fields
            // Attributes
            lastRealmObject.rate = recordParseModel.rate;
            lastRealmObject.body = recordParseModel.body;
            lastRealmObject.reviewType = recordParseModel.reviewType;
            // Pointer
            lastRealmObject.forObjectUniqueId = recordParseModel[recordParseModel.reviewType].uniqueId;

            lastRealmObject.restaurant = getFirstRealmLocalObjectByUniqueId(PARSE_RESTAURANTS, recordParseModel);
            lastRealmObject.event = getFirstRealmLocalObjectByUniqueId(PARSE_EVENTS, recordParseModel);
            lastRealmObject.recipe = getFirstRealmLocalObjectByUniqueId(PARSE_RECIPES, recordParseModel);

            // Relation
            lastRealmObject.userId = recordParseModel.user.id;
            lastRealmObject.user = getFirstRealmLocalObjectByUniqueId(PARSE_USERS, recordParseModel);

            // voting
            lastRealmObject.useful = recordParseModel.useful;
            lastRealmObject.funny = recordParseModel.funny;
            lastRealmObject.cool = recordParseModel.cool;

            break;

        case PARSE_USERS:
            // Basic Fields
            // Attributes
            lastRealmObject.loginType = recordParseModel.loginType;
            lastRealmObject.displayName = recordParseModel.username;
            lastRealmObject.email = recordParseModel.email;
            // Photos
            lastRealmObject.listPhotoId = recordParseModel.listPhotoId || '';
            // voting
            lastRealmObject.useful = recordParseModel.useful;
            lastRealmObject.funny = recordParseModel.funny;
            lastRealmObject.cool = recordParseModel.cool;
            break;
    }
}

Records.updateRealmUpdatedAt = function (instance, newDate = new Date()) {
    instance.updatedAt = newDate;
}

Records.updateLastLocalRealmObject = function (localRealmObject, objectSchemaName, newValueObject) {

    switch (objectSchemaName) {
        case PARSE_RESTAURANTS:
            localRealmObject.displayName = newValueObject.displayName;
            break;
        case PARSE_EVENTS:
            localRealmObject.displayName = newValueObject.displayName;
            localRealmObject.start = newValueObject.start;
            localRealmObject.end = newValueObject.end;
            localRealmObject.want = newValueObject.want;
            break;
        case PARSE_RECIPES:
            localRealmObject.displayName = newValueObject.displayName;
            localRealmObject.price = newValueObject.price;
            break;
        case PARSE_REVIEWS:
            localRealmObject.rate = newValueObject.rate;
            localRealmObject.body = newValueObject.body;
            break;
    }

}

/**
 * Update the online parse object:
 *  1. only update the attribute fields.
 *  2. no need to update their Relation fields.
 *
 * @param onlineParseObject
 * @param objectSchemaName
 * @param localRecorder
 */
Records.updateOnlineParseInstance = function (onlineParseObject, objectSchemaName, localRecorder) {
    switch (objectSchemaName) {
        case PARSE_RESTAURANTS:
            // Basic Fields
            // Attributes
            onlineParseObject.set('displayName', localRecorder.displayName)
            break;
        case PARSE_EVENTS:
            debugger
            // Basic Fields
            // Attributes
            onlineParseObject.set('displayName', localRecorder.displayName)
            onlineParseObject.set('start', new Date(localRecorder.start))
            onlineParseObject.set('end', new Date(localRecorder.end))
            onlineParseObject.set('want', localRecorder.want)

            break;
        case PARSE_RECIPES:
            // Basic Fields
            // Attributes
            onlineParseObject.set('displayName', localRecorder.displayName)
            onlineParseObject.set('price', localRecorder.price)
            break;
        case PARSE_REVIEWS:
            onlineParseObject.set('rate', localRecorder.rate)
            onlineParseObject.set('body', localRecorder.body)
            break;
    }

}

Records.createOnlineParseInstance = async function (onlineParseObject, objectSchemaName, localRecorder) {

    onlineParseObject.set('flag', '1')
    onlineParseObject.set('uniqueId', localRecorder.uniqueId)
    let _online_user_Instance = null;
    let _online_restaurant_instance = null;
    let _online_event_instance = null;
    let _online_recipe_instance = null;

    switch (objectSchemaName) {
        case PARSE_RESTAURANTS:
            // Basic Fields
            // Attributes
            onlineParseObject.set('displayName', localRecorder.displayName)
            appendGeoLocation(onlineParseObject, localRecorder, 'geoLocation')
            break;
        case PARSE_EVENTS:
            // Basic Fields
            // Attributes
            onlineParseObject.set('displayName', localRecorder.displayName)
            onlineParseObject.set('start', new Date(localRecorder.start))
            onlineParseObject.set('end', new Date(localRecorder.end))
            onlineParseObject.set('want', localRecorder.want)
            // relation
            debugger
            _online_restaurant_instance = await getFirstOnlineParseInstance(PARSE_RESTAURANTS, localRecorder.restaurant)
            onlineParseObject.set('restaurant', _online_restaurant_instance)
            debugger
            break;
        case PARSE_RECIPES:
            // Basic Fields
            // Attributes
            onlineParseObject.set('displayName', localRecorder.displayName)
            onlineParseObject.set('price', localRecorder.price)
            break;
        case PARSE_PHOTOS:
            // Basic Fields
            onlineParseObject.set('photoType', localRecorder.photoType)
            onlineParseObject.set('forObjectUniqueId', localRecorder.forObjectUniqueId)
            // Photo images.
            onlineParseObject.set('thumbnail', localRecorder.thumbnail)
            onlineParseObject.set('original', localRecorder.original)
            // Attributes
            appendGeoLocation(onlineParseObject, localRecorder, 'geoLocation')

            // == Important(for mobile apps) ==:
            //   How photo works:
            //     1. After Uploaded photos, the parse cloud will set the relative object.

            break;
        case PARSE_REVIEWS:
            // Basic Fields
            // Attributes
            onlineParseObject.set('rate', localRecorder.rate)
            onlineParseObject.set('body', localRecorder.body)
            onlineParseObject.set('reviewType', localRecorder.reviewType)

            // Relation
            _online_user_Instance = await getFirstOnlineParseInstance(PARSE_USERS, localRecorder.user)
            onlineParseObject.set('user', _online_user_Instance)

            // Pointer
            _online_restaurant_instance = await getFirstOnlineParseInstance(PARSE_RESTAURANTS, localRecorder.restaurant)
            onlineParseObject.set('restaurant', _online_restaurant_instance)
            _online_event_instance = await getFirstOnlineParseInstance(PARSE_EVENTS, localRecorder.event)
            onlineParseObject.set('event', _online_event_instance)
            _online_recipe_instance = await getFirstOnlineParseInstance(PARSE_RECIPES, localRecorder.recipe)
            onlineParseObject.set('recipe', _online_recipe_instance)

            debugger

            break;
    }
}


// If the local updatedAt is before than the server updatedAt,
// Then need to update the local realm objects.
Records.needUpdateLocalRealmObject = function (lastRealmObject, recordParseModel) {
    const serverUpdatedAt = recordParseModel.updatedAt;
    const localUpdatedAt = lastRealmObject.updatedAt;

    const needUpdateLocal = moment(localUpdatedAt).isBefore(serverUpdatedAt);
    return needUpdateLocal;
}

// If the local updatedAt is after than the server updatedAt,
// Then need to update the online parse objects.
Records.needUpdateOnlineParseObject = function (localRealmObject, onlineParseModel) {
    const serverUpdatedAt = onlineParseModel.updatedAt;
    const localUpdatedAt = localRealmObject.updatedAt;

    const needUpdateOnline = moment(localUpdatedAt).isAfter(serverUpdatedAt);
    // debugger
    return needUpdateOnline;
}

Records.getObjectId = function (instance, modelType) {
    const {objectSchemaName} = AppConstants.realmObjects[modelType]

    switch (objectSchemaName) {
        case PARSE_RESTAURANTS:
            return instance.restaurant.id;
        case PARSE_RECIPES:
            return instance.recipe.id;
        case PARSE_USERS:
            return instance.user.id;
    }
}


Records.setParseObjectFieldWithoutData = function (parseType, instance, parseInstanceId) {
    const {objectSchemaName} = AppConstants.realmObjects[parseType];
    const instanceWithoutData = getInstanceWithoutData(objectSchemaName, parseInstanceId)
    instance.set(parseType, instanceWithoutData);
}

Records.setParseObjectFieldWithoutDataBySchema = function (objectSchemaName, instance, parseInstanceId) {
    const instanceWithoutData = getInstanceWithoutData(objectSchemaName, parseInstanceId)
    const parseType = AppConstants.realmTypes[objectSchemaName]
    instance.set(parseType, instanceWithoutData);
}

export default Records;
