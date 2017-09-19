/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */

'use strict';


const _ = require('underscore')
import type {Action, ThunkAction} from './types'

const Records = require('../lib/records').default

const {
    RecorderService,
    PhotoService,
    newLocalRealmObject,
    updateLocalRealmObject,
} = require('../parse/realmApi').default

const {
    getLocalTakenPhotoImagePath
} = require('../parse/fsApi')

const RNFS = require('react-native-fs')

/**
 * The states were interested in
 */
const {
    QUERY_REVIEWS,
    // Rest API
    SAVE_MODEL_REQUEST,
    WRITE_MODEL_REQUEST,
    WRITE_MODEL_SUCCESS,
    WRITE_MODEL_DONE,
    PARSE_RESTAURANTS,
    PARSE_USERS,
    PARSE_RECORDS,
    PARSE_EVENTS,
    PARSE_RECIPES,
    PARSE_PHOTOS,
    PARSE_REVIEWS,
    PARSE_PEOPLE_IN_EVENTS,
    MODEL_FORM_TYPE_NEW,
    MODEL_FORM_TYPE_EDIT,
    // Take photos
    TAKEN_PHOTOS_LIST_RESET,
    TAKEN_PHOTOS_LIST_ADD,
    TAKEN_PHOTOS_LIST_SAVED,
} = require('../lib/constants').default

async function _writeRealmObject(objectSchemaName, editModelType, model: object, lastPosition): Promise<Array<Action>> {

    let _lastRealmInstance = null;
    switch (editModelType) {
        case MODEL_FORM_TYPE_NEW:
            debugger
            _lastRealmInstance = newLocalRealmObject(objectSchemaName, model, lastPosition)
            RecorderService.writeRecorder(_lastRealmInstance, objectSchemaName)
            break;
        case MODEL_FORM_TYPE_EDIT:
            debugger
            _lastRealmInstance = updateLocalRealmObject(objectSchemaName, model)
            RecorderService.writeRecorder(_lastRealmInstance, objectSchemaName)
            break;
    }

    debugger

    const action = {
        type: WRITE_MODEL_DONE,
        payload: {objectId: model.objectId, originModel: _lastRealmInstance}
    }
    return Promise.all([
        Promise.resolve(action)
    ])
}

function writeRealmObject({
                              objectSchemaName,
                              editModelType,
                              model,
                              lastPosition = {
                                  coords: {}
                              }
                          }): ThunkAction {
    debugger

    return (dispatch) => {
        const action = _writeRealmObject(objectSchemaName, editModelType, model, lastPosition)
        action.then(
            ([result]) => {
                dispatch(result)
            }
        )
        return action
    }
}

/**
 *
 * @param newPhotoInstance
 * @param localImagePath
 * android: "file:///storage/emulated/0/DCIM/IMG_20170826_195733.jpg"
 * i0S: "assets-library://asset/asset.JPG?id=717D0507-DBE8-4E12-998A-33FBA1171273&ext=JPG"
 * @param iOSVersion
 * @param needUpdateListPhotoId
 * @param lastPosition
 * @returns {Promise.<*[]>}
 * @private
 */
async function _saveTakenPhoto(newPhotoInstance, localImagePath: string, iOSVersion, needUpdateListPhotoId, lastPosition): Promise<Array<Action>> {
    const destination = getLocalTakenPhotoImagePath(newPhotoInstance.objectId)

    if (iOSVersion) {
        await RNFS.copyAssetsFileIOS(localImagePath, destination, 0, 0)
            .then((result) => {
                // debugger
            }).catch(err => {
                debugger
            })
    } else {
        await RNFS.copyFile(localImagePath.replace('file://', ''), destination)
            .then(() => {
                debugger
            }).catch(err => {
                debugger
            })
    }

    let savedTakenPhotoInstance = newLocalRealmObject(PARSE_PHOTOS, newPhotoInstance, lastPosition)
    RecorderService.writeRecorder(savedTakenPhotoInstance, PARSE_PHOTOS)

    // if (needUpdateListPhotoId) {
    // const objectId = Records.getObjectId(savedTakenPhotoInstance, savedTakenPhotoInstance.photoType)
    // PhotoService.updateListPhotoId(savedTakenPhotoInstance, objectId)
    // }

    const action = {
        type: TAKEN_PHOTOS_LIST_SAVED,
        payload: {savedTakenPhotoInstance}
    }
    return Promise.all([
        Promise.resolve(action)
    ])
}

function saveTakenPhoto(newPhotoInstance, localImagePath: string, iOSVersion, needUpdateListPhotoId, lastPosition): ThunkAction {
    return (dispatch) => {
        const action = _saveTakenPhoto(newPhotoInstance, localImagePath, iOSVersion, needUpdateListPhotoId, lastPosition)
        action.then(
            ([result]) => {
                dispatch(result)
            }
        )
        return action
    }
}


export default {
    // Write for new/update.
    writeRealmObject,
    // Create new Photo
    saveTakenPhoto,
}
