const Repository = require('../parse/realmObjects').default

import AppConstants from '../lib/appConstants'


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


function getFirstRealmLocalObjectByUniqueId(objectSchemaName, parentObject) {
    const recordType = AppConstants.realmTypes[objectSchemaName]
    const relativeObject = parentObject[recordType] || {};
    const uniqueId = relativeObject.uniqueId || '';
    if (uniqueId === "") {
        return null;
    }
    let array = Repository.objects(objectSchemaName).filtered('uniqueId== $0', uniqueId)
    return (array.length) ? array[0] : null;
}


function deleteLocalRealmObject(realmObject) {
    Repository.write(() => {
        Repository.delete(realmObject)
    })
}



getUniqueIdByType = function (instance, modelType) {
    const {objectSchemaName} = AppConstants.realmObjects[modelType]

    switch (objectSchemaName) {
    case PARSE_RESTAURANTS:
        return instance.restaurant.uniqueId;
    case PARSE_RECIPES:
        return instance.recipe.uniqueId;
    case PARSE_USERS:
        return instance.user.uniqueId;
    }
}



export default {
    getFirstRealmLocalObjectByUniqueId,
    deleteLocalRealmObject,
    getUniqueIdByType,
}

