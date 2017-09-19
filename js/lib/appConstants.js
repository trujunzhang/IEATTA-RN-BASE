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
    PARSE_PEOPLE_IN_EVENTS,
    // Section Header Title
    MENU_SECTIONS_MORE,
    MENU_SECTIONS_RESTAURANTS,
    MENU_SECTIONS_EVENTS,
    MENU_SECTIONS_PEOPLE_IN_EVENTS,
    MENU_SECTIONS_ORDERED_RECIPES,
    MENU_SECTIONS_REVIEWS,
} = require('./constants').default


const UUID = require('../components/vendor/uuid');

const AppConstants = {}

AppConstants.realmObjects = {
    'record': {objectSchemaName: PARSE_RECORDS},
    'restaurant': {objectSchemaName: PARSE_RESTAURANTS},
    'event': {objectSchemaName: PARSE_EVENTS},
    'peopleInEvent': {objectSchemaName: PARSE_PEOPLE_IN_EVENTS},
    'user': {objectSchemaName: PARSE_USERS},
    'recipe': {objectSchemaName: PARSE_RECIPES},
    'photo': {objectSchemaName: PARSE_PHOTOS},
    'review': {objectSchemaName: PARSE_REVIEWS},
}

AppConstants.realmTypes = {
    PARSE_RECORDS: 'record',
    PARSE_RESTAURANTS: 'restaurant',
    PARSE_EVENTS: 'event',
    PARSE_PEOPLE_IN_EVENTS: 'peopleInEvent',
    PARSE_USERS: 'user',
    PARSE_RECIPES: 'recipe',
    PARSE_PHOTOS: 'photo',
    PARSE_REVIEWS: 'review'
}

AppConstants.SECTION_TITLES = {
    MENU_SECTIONS_MORE: 'More',
    MENU_SECTIONS_RESTAURANTS: 'Restaurants Nearby',
    MENU_SECTIONS_EVENTS: 'Events',
    MENU_SECTIONS_PEOPLE_IN_EVENTS: 'Users Ordered',
    MENU_SECTIONS_ORDERED_RECIPES: 'Ordered Recipes',
    MENU_SECTIONS_REVIEWS: 'Reviews'
}


AppConstants.placeHolderImage = {
    PARSE_RESTAURANTS: require('../tabs/img/blank_biz_large.png'),
    PARSE_EVENTS: 'event',
    PARSE_PEOPLE_IN_EVENTS: 'peopleInEvent',
    PARSE_USERS: require('../tabs/img/blank_user_small.png'),
    PARSE_RECIPES: require('../tabs/img/blank_biz_small.png'),
    PARSE_PHOTOS: 'photo',
    PARSE_REVIEWS: 'review'
}

AppConstants.generateNewRestaurantRealmObject = function () {
    return {
        objectId: UUID.create().toString(),
        uniqueId: UUID.create().toString(),
        listPhotoId: ''
    }
}

AppConstants.generateNewEventRealmObject = function (restaurant) {
    return {
        objectId: UUID.create().toString(),
        uniqueId: UUID.create().toString(),
        start: new Date(),
        end: new Date(),
        restaurant: {
            id: restaurant.objectId,
            uniqueId: restaurant.uniqueId
        },
        // For test
        displayName: 'e001',
        want: 'first Event'
    }
}

AppConstants.getRelativeModel = function (modelType, objectSchemaName, modelSchema) {
    const currentPhotoType = AppConstants.realmTypes[objectSchemaName]

    return (currentPhotoType === modelType) ?
        {
            id: modelSchema.objectId,
            uniqueId: modelSchema.uniqueId
        } :
        {
            id: '',
            uniqueId: ''
        };

}

AppConstants.generateNewRealmPhotoObject = function ({modelType, model}) {
    debugger
    return {
        objectId: UUID.create().toString(),
        uniqueId: UUID.create().toString(),
        photoType: modelType,
        // Pointer
        restaurant: AppConstants.getRelativeModel(modelType, PARSE_RESTAURANTS, model),
        recipe: AppConstants.getRelativeModel(modelType, PARSE_RECIPES, model),
        user: AppConstants.getRelativeModel(modelType, PARSE_USERS, model),

    }
}

AppConstants.generateRelativeObjects = function (forRealmObjectInstance, reviewType) {
    const defaultRelativeObject =
        {
            restaurant: {id: '', uniqueId: ''},
            event: {id: '', uniqueId: ''},
            recipe: {id: '', uniqueId: ''}
        };
    defaultRelativeObject[reviewType] =
        {
            id: forRealmObjectInstance.objectId,
            uniqueId: forRealmObjectInstance.uniqueId
        }
    return defaultRelativeObject;
}

AppConstants.generateEditReviewObject = function (reviewRealmObject) {
    const reviewType = reviewRealmObject.reviewType;
    const relativeObject = AppConstants.generateRelativeObjects(reviewRealmObject, reviewType);

    const userWriteReview = reviewRealmObject.user;

    return {
        objectId: reviewRealmObject.objectId,
        uniqueId: reviewRealmObject.uniqueId,
        // Attributes
        rate: reviewRealmObject.rate,
        body: reviewRealmObject.body,
        reviewType: reviewType,
        // Pointer
        user: {
            id: userWriteReview.objectId || '',
            uniqueId: userWriteReview.uniqueId || ''
        },
        // Relation
        ...relativeObject,
    }
}
AppConstants.generateNewReviewObject = function ({currentUser, forItem, objectSchemaName}, reviewRating = 0) {
    const reviewType = AppConstants.realmTypes[objectSchemaName]
    const relativeObject = AppConstants.generateRelativeObjects(forItem, reviewType);

    return {
        objectId: UUID.create().toString(),
        uniqueId: UUID.create().toString(),
        // Attributes
        rate: reviewRating,
        body: '',
        reviewType: reviewType,
        // Pointer
        user: {
            id: currentUser.id || '',
            uniqueId: currentUser.uniqueId || ''
        },
        // Relation
        ...relativeObject,
    }
}

export default AppConstants;

