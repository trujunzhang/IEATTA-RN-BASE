const Realm = require('realm')

/**
 * The states were interested in
 */
const {
    PARSE_CONFIGURE,
    PARSE_RESTAURANTS,
    PARSE_USERS,
    PARSE_RECORDS,
    PARSE_EVENTS,
    PARSE_PEOPLE_IN_EVENTS,
    PARSE_RECIPES,
    PARSE_PHOTOS,
    PARSE_REVIEWS,
} = require('../lib/constants').default


class ConfigureSchema extends Realm.Object {
}

ConfigureSchema.schema = {
    name: PARSE_CONFIGURE,
    properties: {
        objectId: 'string',
        lastRecordUpdatedAt: 'date'
    }
}

const commonProperties = {
    objectId: 'string',
    uniqueId: 'string',
    createdAt: 'date',
    updatedAt: 'date',
    flag: 'string',
}

class RecordSchema extends Realm.Object {
}

RecordSchema.schema = {
    name: PARSE_RECORDS,
    properties: {
        // Basic Fields
        ...commonProperties,
        // Attributes
        recordType: 'string',
        // Relation(6+1)
        event: {type: PARSE_EVENTS, optional: true},
        peopleInEvent: {type: PARSE_PEOPLE_IN_EVENTS, optional: true},
        photo: {type: PARSE_PHOTOS, optional: true},
        recipe: {type: PARSE_RECIPES, optional: true},
        restaurant: {type: PARSE_RESTAURANTS, optional: true},
        review: {type: PARSE_REVIEWS, optional: true},
        // aync *PARSE_USERS*
        // user: {type: PARSE_USERS, optional: true},
    }
}

class UserSchema extends Realm.Object {
}

UserSchema.schema = {
    name: PARSE_USERS,
    properties: {
        // Basic Fields
        ...commonProperties,
        // Attributes
        loginType: 'string',
        displayName: 'string',
        email: 'string',
        // Photos
        listPhotoId: 'string',
        // voting(Array)
        useful: 'string',
        funny: 'string',
        cool: 'string'
    }
}

class RestaurantSchema extends Realm.Object {
}

RestaurantSchema.schema = {
    name: PARSE_RESTAURANTS,
    properties: {
        // Basic Fields
        ...commonProperties,
        // Attributes
        displayName: 'string',
        // Location
        address: 'string',
        geoHash: 'string',
        latitude: 'double',
        longitude: 'double',
        // Photos
        listPhotoId: 'string',
    }
}

class EventSchema extends Realm.Object {
}

EventSchema.schema = {
    name: PARSE_EVENTS,
    properties: {
        // Basic Fields
        ...commonProperties,
        // Attributes
        displayName: 'string',
        start: 'date',
        end: 'date',
        want: 'string',
        // Pointer
        restaurant: {type: PARSE_RESTAURANTS, optional: true},
        restaurantUniqueId: 'string',
    }
}


class PeopleInEventSchema extends Realm.Object {
}

PeopleInEventSchema.schema = {
    name: PARSE_PEOPLE_IN_EVENTS,
    properties: {
        // Basic Fields
        ...commonProperties,
        // Attributes
        // ...
        // Pointer
        restaurant: {type: PARSE_RESTAURANTS, optional: true},
        event: {type: PARSE_EVENTS, optional: true},
        user: {type: PARSE_USERS},
        restaurantId: 'string',
        eventId: 'string',
        userId: 'string',
    }
}


class RecipeSchema extends Realm.Object {
}

RecipeSchema.schema = {
    name: PARSE_RECIPES,
    properties: {
        // Basic Fields
        ...commonProperties,
        // Attributes
        displayName: 'string',
        price: 'string',
        // Pointer
        restaurant: {type: PARSE_RESTAURANTS, optional: true},
        event: {type: PARSE_EVENTS, optional: true},
        user: {type: PARSE_USERS},
        restaurantId: 'string',
        eventId: 'string',
        userId: 'string',
        // Photos
        listPhotoId: 'string',
    }
}

class PhotoSchema extends Realm.Object {
}

PhotoSchema.schema = {
    name: PARSE_PHOTOS,
    properties: {
        // Basic Fields
        ...commonProperties,
        // Attributes

        photoType: 'string',
        forObjectUniqueId: 'string',

        // Pointer

        restaurant: {type: PARSE_RESTAURANTS, optional: true},
        recipe: {type: PARSE_RECIPES, optional: true},
        user: {type: PARSE_USERS, optional: true},

        // Location
        latitude: 'double',
        longitude: 'double',
    }
}

class ReviewSchema extends Realm.Object {
}

ReviewSchema.schema = {
    name: PARSE_REVIEWS,
    properties: {
        // Basic Fields
        ...commonProperties,
        // Attributes
        rate: 'int',
        body: 'string',
        reviewType: 'string',
        // Pointer
        // === Important ===
        // The property 'forObjectUniqueId' to be used locally.
        forObjectUniqueId: 'string',

        restaurant: {type: PARSE_RESTAURANTS, optional: true},
        event: {type: PARSE_EVENTS, optional: true},
        recipe: {type: PARSE_RECIPES, optional: true},
        // Relation
        userId: 'string',
        user: {type: PARSE_USERS},
        // voting
        useful: 'int',
        funny: "int",
        cool: "int"
    }
}

// The following object is just for test

class PersonSchema extends Realm.Object {
}

PersonSchema.schema = {
    name: 'Person',
    properties: {
        id: 'int',
        name: 'string',
        age: 'int',
        createdAt: 'date'
    }
}


export default new Realm({
    schema: [
        ConfigureSchema,
        RecordSchema,
        UserSchema, PeopleInEventSchema,
        RestaurantSchema, EventSchema, RecipeSchema,
        PhotoSchema, ReviewSchema,
        // For test.
        PersonSchema
    ]
})



