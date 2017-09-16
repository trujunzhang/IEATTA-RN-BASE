'use strict'

const Repository = require('../parse/realmObjects').default
import Records from '../lib/records'
import AppConstants from '../lib/appConstants'

const {
    getFirstRealmLocalObjectByUniqueId,
} = require('../parse/realmUtiles').default

export default class RealmWriter {

    constructor(record) {
        this.record = record;
        this.recordType = record.recordType;
        this.recordParseModel = record[this.recordType];
    }

    writeParseRecord() {
        const {objectSchemaName} = AppConstants.realmObjects[this.recordType]

        const lastRealmObject = getFirstRealmLocalObjectByUniqueId(objectSchemaName, this.record)
        if (!!lastRealmObject) {// Exist
            this._updateRealmObject(lastRealmObject, objectSchemaName, this.recordParseModel)
        } else {// New
            // The 'realmData' is an object that will be saved on the realm database.
            const realmData = Records.getRealmData(objectSchemaName, this.recordParseModel)
            this._saveRealmData(objectSchemaName, realmData)
        }
    }

    _updateRealmObject(lastRealmObject, objectSchemaName, recordParseModel) {
        if (Records.needUpdateLocalRealmObject(lastRealmObject, recordParseModel) || true) {
            Repository.write(() => {
                // First of all, update the 'updatedAt' firstly.
                lastRealmObject.updatedAt = recordParseModel.updatedAt;
                // Then, update different objects.
                Records.updateObject(lastRealmObject, objectSchemaName, recordParseModel);
            })
        }
    }

    /**
     *
     * @param objectSchemaName
     * @param realmData: It is an object that converted from different ParseModelObject.
     * @private
     */
    _saveRealmData(objectSchemaName, realmData) {
        Repository.write(() => {
            Repository.create(objectSchemaName, realmData)
        })
    }

}
