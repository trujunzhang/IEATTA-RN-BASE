let slugify = require('slugify')
const _ = require('underscore')

import AppConstants from '../lib/appConstants'

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
} = require('../lib/constants').default


export type Pointer = {
    id: string
}

export type File = {
    url: string
}

export type Record = {
    // Basic Fields
    id: string;
    createdAt: date;
    updatedAt: date;
    // Attributes
    recordType: string;
    // Point
    user: User,
    restaurant: Restaurant;
    event: Event;
    peopleInEvent: PeopleInEvent,
    recipe: Recipe;
    photo: Photo;
    review: Review;
}

export type User = {
    // Basic Fields
    id: string;
    createdAt: Date;
    updatedAt: Date;
    // Attributes
    username: string;
    loginType: string;
    email: string;
    // Photos
    listPhotoId: string;
    // voting
    useful: Array;
    funny: Array;
    cool: Array;
}

export type PeopleInEvent = {
    // Basic Fields
    id: string;
    createdAt: Date;
    updatedAt: Date;
    // Attributes
}

export type Photo = {
    // Basic Fields
    id: string;
    createdAt: Date;
    updatedAt: Date;
    // Attributes
    original: string;
    thumbnail: string;
    photoType: string;
    // Pointer
    restaurantId: string;
    recipeId: string;
    userId: string;
}

export type Event = {
    // Basic Fields
    id: string;
    createdAt: Date;
    updatedAt: Date;
    // Attributes
    displayName: string;
    start: Date;
    end: Date;
    want: string;
    // Pointer
    restaurant: Object;
}

export type Recipe = {
    // Basic Fields
    id: string;
    createdAt: Date;
    updatedAt: Date;
    // Attributes
    displayName: string;
    price: string;
    // Point
    photos: Array<Photo>;
    restaurant: Restaurant;
    event: Event;
}

export type Restaurant = {
    // Basic Fields
    id: string;
    createdAt: Date;
    updatedAt: Date;
    // Attributes
    displayName: string;
    address: string;
    geoLocation: Any;
    // Photos
    listPhotoId: string;
};

export type Review = {
    // Basic Fields
    id: string;
    createdAt: Date;
    updatedAt: Date;
    // Attributes
    rate: int;
    body: string;
    reviewType: string;
    // Pointer
    restaurantId: string;
    eventId: string;
    recipeId: string;
    // Relation
    userId: string;
    // voting
    useful: int;
    funny: int;
    cool: int;
};

function parseRelativeModel(map: Object, objectSchemaName) {
    const parseType = AppConstants.realmTypes[objectSchemaName]
    const relativeModel = map.get(parseType)
    return (!!relativeModel) ?
        {
            id: relativeModel.id,
            uniqueId: relativeModel.get('uniqueId')
        } :
        {
            id: '',
            uniqueId: ''
        };
}

function fromParseCommon(map: Object) {
    return {
        id: map.id,
        uniqueId: map.get('uniqueId') || '',
        createdAt: map.get('createdAt'),
        updatedAt: map.get('updatedAt'),
        flag: map.get('flag') || '1',
    }
}

export function fromParsePointer(map: Object): Pointer {
    return {
        id: map.id,
    }
}

export function fromParseFile(map: Object): File {
    return {
        name: map._name,
        url: map._url,
    }
}

export function fromParsePeopleInEvent(map: Object): PeopleInEvent {
    // debugger
    return {
        // Basic Fields
        ...fromParseCommon(map),
        // Attributes
        // ...
        // Pointer
        restaurant: parseRelativeModel(map, PARSE_RESTAURANTS),
        event: parseRelativeModel(map, PARSE_EVENTS),
        user: parseRelativeModel(map, PARSE_USERS)
    }
}

export function fromParseRecord(map: Object): Record {
    return {
        // Basic Fields
        ...fromParseCommon(map),
        // Attributes
        recordType: map.get('recordType'),
        // Pointer
        user: map.get('user') && fromParseUser(map.get('user')),
        restaurant: map.get('restaurant') && fromParseRestaurant(map.get('restaurant')),
        event: map.get('event') && fromParseEvent(map.get('event')),
        peopleInEvent: map.get('peopleInEvent') && fromParsePeopleInEvent(map.get('peopleInEvent')),
        recipe: map.get('recipe') && fromParseRecipe(map.get('recipe')),
        photo: map.get('photo') && fromParsePhoto(map.get('photo')),
        review: map.get('review') && fromParseReview(map.get('review'))
    }
}

export function fromParseUser(map: Object): User {
    return {
        // Basic Fields
        ...fromParseCommon(map),
        // Attributes
        username: map.get('username'),
        loginType: map.get('loginType'),
        email: map.get('email') || "",
        // Photos
        listPhotoId: _get_default_image_photo_id(map),
        // voting
        useful: _.pluck((map.get('useful') || []).map(fromParsePointer), 'id').join(';'),
        funny: _.pluck((map.get('funny') || []).map(fromParsePointer), 'id').join(';'),
        cool: _.pluck((map.get('cool') || []).map(fromParsePointer), 'id').join(';')
    }
}

export function fromParsePhoto(map: Object): Photo {
    return {
        // Basic Fields
        ...fromParseCommon(map),
        // Attributes
        url: map.get('url'),
        original: map.get('original') && fromParseFile(map.get('original')),
        thumbnail: map.get('thumbnail') && fromParseFile(map.get('thumbnail')),
        photoType: map.get('photoType'),
        // point(2)
        restaurant: parseRelativeModel(map, PARSE_RESTAURANTS),
        recipe: parseRelativeModel(map, PARSE_RECIPES),
        user: parseRelativeModel(map, PARSE_USERS)
    }
}

export function fromParseRecipe(map: Object): Recipe {
    return {
        // Basic Fields
        ...fromParseCommon(map),
        // Attributes
        displayName: map.get('displayName'),
        price: map.get('price'),
        // Photos
        listPhotoId: _get_default_image_photo_id(map),
        // Pointer
        restaurant: parseRelativeModel(map, PARSE_RESTAURANTS),
        event: parseRelativeModel(map, PARSE_EVENTS),
        user: parseRelativeModel(map, PARSE_USERS)
    }
}


export function fromParseReview(map: Object): Review {
    return {
        // Basic Fields
        ...fromParseCommon(map),
        // Attributes
        rate: map.get('rate'),
        body: map.get('body'),
        reviewType: map.get('reviewType'),
        // Pointer
        restaurant: parseRelativeModel(map, PARSE_RESTAURANTS),
        event: parseRelativeModel(map, PARSE_EVENTS),
        recipe: parseRelativeModel(map, PARSE_RECIPES),
        // Relation
        user: parseRelativeModel(map, PARSE_USERS),
        // voting
        useful: map.get('useful') || 0,
        funny: map.get('funny') || 0,
        cool: map.get('cool') || 0,
    }
}

export function fromParseEvent(map: Object): Event {
    return {
        // Basic Fields
        ...fromParseCommon(map),
        // Attributes
        displayName: map.get('displayName'),
        slug: map.get('slug'),
        start: map.get('start'),
        end: map.get('end'),
        want: map.get('want'),
        // Pointer
        restaurant: parseRelativeModel(map, PARSE_RESTAURANTS),
    }
}

function _get_default_image_photo_id(map) {
    const photos = map.get('photos') || []
    return (photos.length > 0) ? photos[0].id : "";
}

export function fromParseRestaurant(map: Object): Restaurant {
    return {
        // Basic Fields
        ...fromParseCommon(map),
        // Attributes
        displayName: map.get('displayName'),
        address: map.get('address'),
        geoLocation: map.get('geoLocation'),
        // Photos
        listPhotoId: _get_default_image_photo_id(map),
    }
}


