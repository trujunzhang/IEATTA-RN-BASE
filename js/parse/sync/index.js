const {pullFromServer} = require('./pull_from_server')
const {pushToServer} = require('./push_to_server')

const {ConfigureService} = require('../realmApi').default

const RECORDS_COUNT_PUSH = 20
const RECORDS_COUNT_PULL = 40

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
export default class AsyncParse {
    constructor() {
        this.lastRecordUpdatedData = ConfigureService.getLastRecordUpdatedAt()
    }

    async startScheduledTask() {
        console.log("scheduled Task...")

        // How to async all data between the local and the parse server.
        // Step1: push the local to the parse server firstly.
        // await pushToServer(RECORDS_COUNT_PUSH)

        // Step2: pull the new recorders than the local updatedAt to the local.
        // Maybe new recorders contain some objects that pushed minutes ago.
        // await pullFromServer(RECORDS_COUNT_PULL, this.lastRecordUpdatedData)

    }
}


