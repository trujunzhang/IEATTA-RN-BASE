import Records from '../lib/records'
import AppConstants from '../lib/appConstants'

const {
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

async function saveNewRecorderAsParseInstance(recordType, onlineParseObjectInstance) {
    const recorder = createParseInstance(PARSE_RECORDS)

    recorder.set('recordType', recordType)
    recorder.set('flag', "1")
    debugger

    recorder.set(recordType, onlineParseObjectInstance);

    await recorder.save()
}

export default {
    // Update the model's record after saved it.
    saveNewRecorderAsParseInstance,
}
