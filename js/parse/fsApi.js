'use strict'

const RNFS = require('react-native-fs')

/**
 * The states were interested in
 */
const {
    PARSE_ORIGINAL_IMAGES,
    PARSE_THUMBNAIL_IMAGES
} = require('../lib/constants').default

export function configureImageFolder() {
    const originalFold = `${RNFS.DocumentDirectoryPath}/${PARSE_ORIGINAL_IMAGES}`
    const thumbnailFold = `${RNFS.DocumentDirectoryPath}/${PARSE_THUMBNAIL_IMAGES}`

    console.log(originalFold)
    console.log(thumbnailFold)

    RNFS.mkdir(originalFold)
    RNFS.mkdir(thumbnailFold)
}


export async function existLocalImage(photoId, type = PARSE_THUMBNAIL_IMAGES) {
    let localImageExist = false;
    const localImagePath = getLocalImagePath(photoId, type);

    await RNFS.exists(
        localImagePath
    ).then((localExist) => {
        localImageExist = localExist;
    })

    return localImageExist;
}


export async function downloadPhoto(photoId, url, type = PARSE_THUMBNAIL_IMAGES) {
    await RNFS.downloadFile({
        fromUrl: url,
        toFile: getLocalImagePath(photoId, type)
    }).promise.then(() => {
    }).catch(err => {
        debugger
    })
}

export function getLocalImagePath(id, type = PARSE_THUMBNAIL_IMAGES) {
    return `${RNFS.DocumentDirectoryPath}/${type}/${id}.jpg`;
}

/**
 * The local stored image path after taken a photo.
 * @param id
 */
export function getLocalTakenPhotoImagePath(id) {
    return getLocalImagePath(id)
}

