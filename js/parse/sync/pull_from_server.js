import AppConstants from '../../lib/appConstants'

const {
    ConfigureService,
    UserService,
} = require('../realmApi').default

const RealmWriter = require('../realmWriter').default

const {
    getRecordsParameters,
    getUsersParameters,
} = require('../parseUtiles').default

const {fromParseRecord, fromParseUser} = require('../parseModels')

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
    PARSE_ORIGINAL_IMAGES,
    PARSE_THUMBNAIL_IMAGES
} = require('../../lib/constants').default


const {
    getLocalImagePath,
    downloadPhoto,
    existLocalImage
} = require('../fsApi')

const {getInstanceWithoutData} = require('../objects').default

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


async function saveRecord(record, index) {
    let isSuccess = true;

    const {objectSchemaName} = AppConstants.realmObjects[record.recordType];
    if (objectSchemaName === PARSE_PHOTOS) {
        const photo = record.photo;
        const thumbnail = photo.thumbnail || {};
        const thumbnailUrl = thumbnail.url || '';
        if (thumbnailUrl !== '') {
            /**
             * Check the image exist firstly.
             * Then download it if not exist.
             *
             * Finally, also need to check whether downloaded successfully.
             */
            let exist = await  existLocalImage(photo.id);
            if (exist === false) {
                await downloadPhoto(photo.id, thumbnailUrl);
                isSuccess = await existLocalImage(photo.id);
            }
        }
    }

    if (isSuccess) {
        new RealmWriter(record).writeParseRecord()

        ConfigureService.saveLastRecordUpdatedAt(record.updatedAt)
    }

    return isSuccess;
}

const recordTypes = [
    "restaurant",
    // "event",
    // "peopleInEvent",
    // "recipe",
    // "review",
    // "photo",
]

/**
 * How to pull the parse objects from server:
 * 1. Reviews submitted by user need user information.
 *    Sometimes, updatedAt of the review's user is late than review.
 *    So, pull all users objects firstly each schedule task.
 *
 * @param countPerTime
 * @param lastRecordUpdatedData
 * @returns {Promise.<void>}
 */
export async function pullFromServer(countPerTime, lastRecordUpdatedData) {

    // Step1: pull all users objects firstly.
    let records = (await getRecordsParameters({lastUpdatedAt: lastRecordUpdatedData})
        .limit(countPerTime).find()).map(fromParseRecord)

    // For test(one line).
    // let records = (await getRecordsParameters({lastUpdatedAt: null}).equalTo("recordType", recordTypes[0]).limit(countPerTime).find()).map(fromParseRecord)
    // let records = (await getRecordsParameters({lastUpdatedAt: null})
    // let records = (await getRecordsParameters({lastUpdatedAt: lastRecordUpdatedData})
    //     .equalTo("recordType", recordTypes[0])
    // .equalTo("photo", getInstanceWithoutData(PARSE_PHOTOS, 'PcC5wmnUDJ'))
    // .limit(countPerTime).find()).map(fromParseRecord)

    // Step2: pull all users objects each async task.
    const _userRecords = (await getUsersParameters().find()).map(fromParseUser)
    for (let i = 0; i < _userRecords.length; i++) {
        UserService.refreshLocalUser(_userRecords[i])
    }

    debugger

    // Step3: save all recorded objects.
    for (let i = 0; i < records.length; i++) {
        const recorderParseObjectInstance = records[i];
        if (checkRecordedObjectExist(recorderParseObjectInstance) === false) {
            continue;
        }

        const isSuccess = await saveRecord(recorderParseObjectInstance, i)

        if (!isSuccess) {// Some error, then break it.
            debugger
            break;
        }
    }
}

/**
 * Perhaps, the recorded parse objects had been removed.
 * But it's recorder still exist on the server.
 *
 * So here, check whether contains the recorded objects firstly.
 */
function checkRecordedObjectExist(recorderParseObjectInstance) {
    const recordType = recorderParseObjectInstance.recordType;
    const recordedObject = recorderParseObjectInstance[recordType];

    return !!recordedObject;
}



