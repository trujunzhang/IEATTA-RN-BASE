import Records from '../lib/records'
import AppConstants from '../lib/appConstants'

const Parse = require('parse/react-native')
const Parameters = require('./parameters').default

const {
    ParseRestaurant,
    ParseEvent,
    ParseUser,
    ParsePeopleInEvent,
    ParseReview,
    ParseRecipe,
    ParseRecord,
    ParsePhoto,
    createParseInstance,
} = require('./objects').default

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

function getQueryByType(type: string, includes: Array = []) {
    let query = null;
    switch (type) {
        case PARSE_RESTAURANTS:
            query = new Parse.Query(ParseRestaurant)
            break;
        case PARSE_EVENTS:
            query = new Parse.Query(ParseEvent)
            break;
        case PARSE_USERS:
            query = new Parse.Query(ParseUser)
            break;
        case PARSE_PEOPLE_IN_EVENTS:
            query = new Parse.Query(ParsePeopleInEvent)
            break;
        case PARSE_REVIEWS:
            query = new Parse.Query(ParseReview)
            break;
        case PARSE_RECIPES:
            query = new Parse.Query(ParseRecipe)
            break;
        case PARSE_RECORDS:
            query = new Parse.Query(ParseRecord).include('user')
                .include('photo').include('photo.restaurant').include('photo.recipe').include('photo.user')
                .include('restaurant')
                .include('event').include('event.restaurant')
                .include('peopleInEvent').include('peopleInEvent.restaurant').include('peopleInEvent.event').include('peopleInEvent.user')
                .include('recipe').include('recipe.restaurant').include('recipe.event').include('recipe.user')
                .include('review').include('review.restaurant').include('review.event').include('review.recipe').include('review.user')
            break;
        case PARSE_PHOTOS:
            query = new Parse.Query(ParsePhoto)
            break;
    }

    includes.map((include) => {
        query = query.include(include)
    })
    return query;
}

function getRestaurantParameters(terms = {}) {
    return new Parameters.Restaurants(getQueryByType(PARSE_RESTAURANTS))
        .addParameters(terms)
        .end()
}

function getUsersParameters(terms = {}) {
    return new Parameters.Users(getQueryByType(PARSE_USERS))
        .addParameters(terms)
        .end()
}

function getRecordsParameters(terms = {}) {
    return new Parameters.Records(getQueryByType(PARSE_RECORDS))
        .addParameters(terms)
        .end()
}

async function checkExistOnlineParseInstance(objectSchemaName, realmInstance) {
    return await getQueryByType(objectSchemaName).equalTo('uniqueId', realmInstance.uniqueId).count() > 0
}

async function getFirstOnlineParseInstance(objectSchemaName, realmInstance) {
    if (!realmInstance || !realmInstance.uniqueId || realmInstance.uniqueId === "") {
        return null;
    }
    return await getQueryByType(objectSchemaName).equalTo('uniqueId', realmInstance.uniqueId).first()
}


async function getOnlineRecorderInstance(recordType, onlineParseInstance) {
    if (!!onlineParseInstance) {// Exist
        return await getQueryByType(PARSE_RECORDS).equalTo(recordType, onlineParseInstance).first()
    }
    return null;
}

export default {
    getQueryByType,
    getRestaurantParameters,
    getUsersParameters,
    getRecordsParameters,
    // Update the model's record after saved it.
    checkExistOnlineParseInstance,
    getFirstOnlineParseInstance,
    getOnlineRecorderInstance
}
