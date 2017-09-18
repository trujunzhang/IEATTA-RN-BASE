'use strict'

const Repository = require('../parse/realmObjects').default
console.log(Repository.path)

const RealmQuery = require('./realmQuery');
import Records from '../lib/records'
import AppConstants from '../lib/appConstants'

const UUID = require('../components/vendor/uuid');
const {encodeGeoHash} = require('../components/vendor/GeoHash')

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
    FILTER_BY_OBJECT_ID,
    FILTER_BY_UNIQUE_ID,
} = require('../lib/constants').default


const ConfigureService = {
    onlyObjectId: 'c001',

    getLastRecordUpdatedAt: function () {
        const _lastObject = _getFirstRealmObject(PARSE_CONFIGURE, this.onlyObjectId) || {};
        return _lastObject.lastRecordUpdatedAt
    },

    saveLastRecordUpdatedAt: function (recorderUpdatedAt) {
        const _lastObject = _getFirstRealmObject(PARSE_CONFIGURE, this.onlyObjectId)
        Repository.write(() => {
            if (!!_lastObject) {// update
                _lastObject.lastRecordUpdatedAt = recorderUpdatedAt;
            } else { // new configure, then create it.
                Repository.create(PARSE_CONFIGURE, {
                    objectId: this.onlyObjectId,
                    lastRecordUpdatedAt: recorderUpdatedAt
                })
            }
        })
    }
}


const RecorderService = {
    findByTerm: function () {
        let objects = Repository.objects(PARSE_RECORDS).sorted('createdAt')
        // let fir = objects[0];
        // let sec = objects[1];
        // let length = objects.length;
        // debugger
        return objects;
    },

    searchByType: function (realmObject, objectSchemaName) {
        let recorders = Repository.objects(PARSE_RECORDS);
        switch (objectSchemaName) {
            case PARSE_RESTAURANTS:
                recorders = recorders.filtered('restaurant== $0', realmObject)
                break;
            case PARSE_EVENTS:
                recorders = recorders.filtered('event== $0', realmObject)
                break;
            case PARSE_RECIPES:
                recorders = recorders.filtered('recipe== $0', realmObject)
                break;
            case PARSE_PHOTOS:
                recorders = recorders.filtered('photo== $0', realmObject)
                break;
            case PARSE_REVIEWS:
                recorders = recorders.filtered('review== $0', realmObject)
                break;
            case PARSE_PEOPLE_IN_EVENTS:
                recorders = recorders.filtered('peopleInEvent== $0', realmObject)
                break;
        }
        if (recorders.length > 0) return recorders[0];
        return null;
    },

    writeRecorderWithNewModel: function (objectSchemaName, item, lastPosition) {
        const realmData = Records.getRealmData(objectSchemaName,
            Object.assign({},
                item,
                {
                    id: UUID.create().toString(),
                    flag: "1",
                    updatedAt: new Date(),
                    geoLocation: {
                        latitude: lastPosition.coords.latitude,
                        longitude: lastPosition.coords.longitude
                    }
                }))

        Repository.write(() => {
            const newRelation = Repository.create(objectSchemaName, Object.assign({}, realmData, {}))
            const recordParseModel = {
                id: realmData.objectId,
                recordType: AppConstants.realmTypes[objectSchemaName],
                realmObject: newRelation,
                updatedAt: new Date(),
            }
            const realmModel = Records.getRealmData(PARSE_RECORDS, recordParseModel);
            Repository.create(PARSE_RECORDS, realmModel)
        })
    },

    writeRecorder: function (realmObject, objectSchemaName) {
        const _lastRecorder = this.searchByType(realmObject, objectSchemaName)
        Repository.write(() => {
            if (!!_lastRecorder) {  // Update.
                Records.updateRealmUpdatedAt(_lastRecorder);
            } else {// new Recorder.
                const recordParseModel = {
                    id: realmObject.objectId,
                    uniqueId: realmObject.uniqueId,
                    flag: "1",
                    recordType: AppConstants.realmTypes[objectSchemaName],
                    realmObject: realmObject,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
                const realmModel = Records.getRealmData(PARSE_RECORDS, recordParseModel);
                Repository.create(PARSE_RECORDS, realmModel)
            }
        })
    }

}

const RestaurantService = {
    findByTerm: function (term) {
        let objects = Repository.objects(PARSE_RESTAURANTS)
        if (!!term.position) {
            const {coords} = term.position;
            const localGeoHash = encodeGeoHash(coords.latitude, coords.longitude)
            const queryHash = localGeoHash.substring(0, 6);
            objects = objects.filtered('geoHash CONTAINS[c] $0', queryHash)
        }
        if (!!term.search) {
            objects = objects.filtered('displayName CONTAINS[c] $0 OR address CONTAINS[c] $0', term.search)
        }
        return objects;
    },

    saveTestItem: function (item) {
        if (Repository.objects(PARSE_RESTAURANTS).filtered('uniqueId== $0', item.uniqueId).length) return;
        const realmData = Records.getRealmData(PARSE_RESTAURANTS, item);
        Repository.write(() => {
            Repository.create(PARSE_RESTAURANTS, realmData)
        })
    }
}

const EventService = {
    findAll: function (sortBy) {
        return Repository.objects(PARSE_EVENTS)
    },

    save: function (item) {
        if (Repository.objects(PARSE_EVENTS).filtered('objectId == $0', item.id).length) return;
        Repository.write(() => {
            Repository.create(PARSE_EVENTS, Records.getRealmData(PARSE_EVENTS, item))
        })
    },
}


const PeopleInEventService = {
    findTerm: function (restaurantId: string, eventId: string) {
        let query = RealmQuery.create().equalTo('restaurantId', restaurantId).equalTo('eventId', eventId);

        let objects = Repository.objects(PARSE_PEOPLE_IN_EVENTS).filtered(query.toString())
        return objects;
    },

    save: function (item) {
        if (Repository.objects(PARSE_PEOPLE_IN_EVENTS).filtered('objectId == $0', item.id).length) return;
        Repository.write(() => {
            Repository.create(PARSE_PEOPLE_IN_EVENTS, Records.getRealmData(PARSE_PEOPLE_IN_EVENTS, item))
        })
    },

    update: function (item, callback) {
        if (!callback) return;
        Repository.write(() => {
            callback();
            item.updatedAt = new Date();
        })
    }
}


const PhotoService = {
    findAll: function (sortBy) {
        return Repository.objects(PARSE_PHOTOS)
    },

    updateListPhotoId: function (savedTakenPhotoInstance, objectId) {
        const {objectSchemaName} = AppConstants.realmObjects[savedTakenPhotoInstance.photoType]
        const lastRealmObject = _getFirstRealmObject(objectSchemaName, objectId)
        Repository.write(() => {
            lastRealmObject.listPhotoId = savedTakenPhotoInstance.objectId;
        })
    }
}


const RecipeService = {
    findAll: function () {
        return Repository.objects(PARSE_RECIPES)
    },

    save: function (item) {
        if (Repository.objects(PARSE_RECIPES).filtered('objectId == $0', item.id).length) return;
        Repository.write(() => {
            Repository.create(PARSE_RECIPES, Records.getRealmData(PARSE_RECIPES, item))
        })
    },

    update: function (item, callback) {
        if (!callback) return;
        Repository.write(() => {
            callback();
            item.updatedAt = new Date();
        })
    }
}


const ReviewService = {
    findByTerm: function (term) {
        const {objectSchemaName, forObjectUniqueId, search} = term;

        const reviewType = AppConstants.realmTypes[objectSchemaName]

        let query = RealmQuery.create();
        query.equalTo('reviewType', reviewType);
        if (!!forObjectUniqueId) {
            query.equalTo('forObjectUniqueId', forObjectUniqueId);
        }
        let others = '';
        if (!!search) {
            others = ` AND body CONTAINS[c]  "${search}" OR user.displayName CONTAINS[c] "${search}"`;
        }

        const filteredString = query.toString() + others;

        let objects = Repository.objects(PARSE_REVIEWS).filtered(filteredString)

        return objects;
    },

    save: function (item) {
        if (Repository.objects(PARSE_REVIEWS).filtered('objectId == $0', item.id).length) return;
        Repository.write(() => {
            Repository.create(PARSE_REVIEWS, Records.getRealmData(PARSE_REVIEWS, item))
        })
    },

    update: function (item, callback) {
        if (!callback) return;
        Repository.write(() => {
            callback();
            item.updatedAt = new Date();
        })
    }
}

const UserService = {
    findByTerm: function (term) {
        let objects = Repository.objects(PARSE_USERS)
        if (!!term.search) {
            objects = objects.filtered('displayName CONTAINS[c] $0', term.search)
        }
        return objects;
    },

    /**
     * Ref: https://github.com/realm/realm-js/issues/450
     * Here is a code snippet that should generate the query you want to run:
     *
     * var filtered = sample.filtered([2,4,7,10].map((id) => 'id == ' + id).join(' OR '));
     *
     * This should create a query of the form id == 2 OR id == 4 OR id == 7 OR id ==10.
     * Once we support IN queries it will do this for you internally.
     * @param ids
     * @returns {Results<T>}
     */
    getUsersContainedIn: function (ids) {
        if (ids.length === 0) return [];

        const query = (ids.map((id) => {
            return `objectId == '${id}'`
        })).join(' OR ')

        return Repository.objects(PARSE_USERS).filtered(query);
    },

    save: function (item) {
        Repository.write(() => {
            Repository.create(PARSE_USERS, Records.getRealmData(PARSE_USERS, item))
        })
    },

    update: function (item, parseUserModel, callback) {
        if (!callback) return;
        Repository.write(() => {
            callback();
            // Then, update different objects.
            Records.updateObject(item, PARSE_USERS, parseUserModel);
        })
    },

    refreshLocalUser: function (parseUserModel) {
        const _user = _getFirstRealmObject(PARSE_USERS, parseUserModel.id)

        if (!!_user) {
            if (Records.needUpdateLocalRealmObject(_user, parseUserModel)) {
                this.update(_user, parseUserModel, function () {
                    // First of all, update the 'updatedAt' firstly.
                    _user.updatedAt = parseUserModel.updatedAt;
                })
            }
        } else {
            this.save(parseUserModel)
        }
    }

}

function _getCurrentRealmObjectByUniqueId(objectSchemaName, model) {
    if (!model.uniqueId || model.uniqueId === "") {
        throw new Error('current realm object must have an uniqueId field!')
    }
    let array = Repository.objects(objectSchemaName).filtered('uniqueId== $0', model.uniqueId)
    return (array.length) ? array[0] : null;
}


function _getFirstRealmObject(objectSchemaName, filterId) {
    if (!filterId || filterId === "") {
        return null;
    }
    let array = Repository.objects(objectSchemaName).filtered('objectId== $0', filterId)
    return (array.length > 0) ? array[0] : null;
}


function newLocalRealmObject(objectSchemaName, item, lastPosition) {
    const realmData = Records.getRealmData(objectSchemaName,
        Object.assign({},
            item,
            {
                id: item.objectId,
                uniqueId: item.uniqueId,
                flag: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
                geoLocation: {
                    latitude: lastPosition.coords.latitude,
                    longitude: lastPosition.coords.longitude
                }
            }))

    let newRelation = null;
    Repository.write(() => {
        newRelation = Repository.create(objectSchemaName, Object.assign({}, realmData, {}))
    })

    return newRelation;
}

function updateLocalRealmObject(objectSchemaName, item) {
    const _lastRealmObject = _getCurrentRealmObjectByUniqueId(objectSchemaName, item)
    Repository.write(() => {
        Records.updateLastLocalRealmObject(_lastRealmObject, objectSchemaName, item);
        Records.updateRealmUpdatedAt(_lastRealmObject);
    })
    return _lastRealmObject;
}

export default {
    ConfigureService,
    RecorderService,
    RestaurantService,
    EventService,
    PeopleInEventService,
    PhotoService,
    UserService,
    RecipeService,
    ReviewService,
    // Write Realm Object
    newLocalRealmObject,
    updateLocalRealmObject
}