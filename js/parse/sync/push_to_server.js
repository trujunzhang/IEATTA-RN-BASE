const Parse = require('parse/react-native')

import Records from '../../lib/records'
import AppConstants from '../../lib/appConstants'

const RNFS = require('react-native-fs')

const {
    RecorderService,
} = require('../realmApi').default

const {
    deleteLocalRealmObject
} = require('../realmUtiles').default

const {
    createParseInstance,
} = require('../objects').default

const {
    getFirstOnlineParseInstance,
    getOnlineRecorderInstance
} = require('../parseUtiles').default

const {
    saveNewRecorderAsParseInstance,
} = require('../recorderUtiles').default


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
} = require('../../lib/constants').default


const {
    getLocalTakenPhotoImagePath
} = require('../fsApi')

async function createNewOnlineParseInstance(objectSchemaName, localRealmObject) {
    let uploadRealmObject = localRealmObject;

    switch (objectSchemaName) {
        case PARSE_PHOTOS:
            const destination = getLocalTakenPhotoImagePath(localRealmObject.objectId)
            let data = null;
            await RNFS.readFile(destination, {encoding: 'base64'}).then(res => {
                data = res;
            })

            const thumbnailFile = new Parse.File('image', {"base64": data}, 'image/jpeg')
            await thumbnailFile.save()

            uploadRealmObject = Object.assign({}, uploadRealmObject, {
                thumbnail: thumbnailFile,
                original: thumbnailFile,
            })

            break;
    }

    const newOnlineParseObjectInstance = createParseInstance(objectSchemaName)
    await Records.createOnlineParseInstance(newOnlineParseObjectInstance, objectSchemaName, uploadRealmObject);

    // debugger

    // step1: create the new parse model.
    await newOnlineParseObjectInstance.save()

    return newOnlineParseObjectInstance;
}


/**
 * How to push the local updated models to the parse server.
 *   1. Get the online Objects.
 *   2. Get the recorder that recorded them.
 *
 *
 * The 'uniqueId' is also so important.
 * Checking whether the same parse models by 'uniqueId'.
 *
 * @param localRecorderJson  is 'RecordSchema' json instance.
 * @param index
 * @returns {Promise.<void>}
 */
async function pushRecordObjectToServer(localRecorderJson, index) {
    const recordType = localRecorderJson['recordType'];
    const {objectSchemaName} = AppConstants.realmObjects[recordType]

    const localRealmObject = localRecorderJson[recordType]

    let onlineParseObjectInstance = await  getFirstOnlineParseInstance(objectSchemaName, localRealmObject)
    const onlineRecorder = await getOnlineRecorderInstance(recordType, onlineParseObjectInstance)

    // debugger

    if (!!onlineRecorder) {// The recorder already exist on the parse server.
        const onlineParseObject = onlineRecorder.get(recordType)
        if (Records.needUpdateOnlineParseObject(localRealmObject, onlineParseObject)) {

            // step1: update the different parse object recorded on the 'record' object.
            Records.updateOnlineParseInstance(onlineParseObject, objectSchemaName, localRealmObject)
            await onlineParseObject.save()

            // step2: update the online recorder's updateAt that notify other devices to async.
            await onlineRecorder.save()
            // debugger
        }
    } else { // The record is New.
        /**
         * Sometimes, if the recorded parse object already pushed to the parse server.
         * But interrupt the next steps that need to save it's recorder.
         * It means that no recorder but have the parse objects.
         *
         * So, before Saving the parse object instance, check whether exist.
         */
        if (!onlineParseObjectInstance) {// Not exist on the parse server.
            onlineParseObjectInstance = await createNewOnlineParseInstance(objectSchemaName, localRealmObject)
        }

        // step2: create the recorder.
        await saveNewRecorderAsParseInstance(recordType, onlineParseObjectInstance)
    }
}

/**
 * How to sync the data between the local and the server parse.
 *   @note: Because if the objects had been saved, it's updatedData will be changed.
 *          Using the object called record to record the updated information.
 *
 * Step1:
 *    pull the records updated are more than the last record updatedData.
 *
 * Step2:
 *   Push the records saved in the local database.
 *   @note: These records will be pull again next scheduled task.
 */

export async function pushToServer(countPerTime) {
    // Step1: pull all users objects firstly.
    const _localRecorders = RecorderService.findByTerm().slice(0, countPerTime)
    const localRecordersJson = JSON.parse(JSON.stringify(_localRecorders))

    for (let i = 0; i < localRecordersJson.length; i++) {
        let xxx = _localRecorders.length;

        // debugger

        await pushRecordObjectToServer(localRecordersJson[i], i)

        // Finally, remove the local recorder.
        // deleteLocalRealmObject(_localRecorders[i])

        let yyy = _localRecorders.length;
        // debugger
    }

}


