const {getLocalImagePath} = require('../parse/fsApi')

/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    Image,
} from 'react-native'

/**
 * The states were interested in
 */
const {
    PARSE_ORIGINAL_IMAGES,
    PARSE_THUMBNAIL_IMAGES,
    SECTION_PHOTOS_BROWSER_FOR_RESTAURANT,
    SECTION_PHOTOS_BROWSER_FOR_EVENT,
    SECTION_PHOTOS_BROWSER_FOR_RECIPE,
    SECTION_PHOTOS_BROWSER_FOR_USER
} = require('../lib/constants').default

const Photos = {
    configure: {
        photoTypes: {
            SECTION_PHOTOS_BROWSER_FOR_RESTAURANT: 'restaurant',
            SECTION_PHOTOS_BROWSER_FOR_EVENT: 'event',
            SECTION_PHOTOS_BROWSER_FOR_RECIPE: 'recipe',
            SECTION_PHOTOS_BROWSER_FOR_USER: 'user'
        }
    }
}

Photos.getMedia = function (photos) {
    return photos.map((item, index) => {
        return {
            photo: `file://${getLocalImagePath(item.objectId, PARSE_THUMBNAIL_IMAGES)}`,
            caption: '',
        }
    })
}

Photos.getPhotoType = function (sectionType) {
    const photoTypes = Photos.configure.photoTypes;
    return photoTypes[sectionType];
}

Photos.generateBackground = function (component, model) {
    const self = component;
    const localImagePath = getLocalImagePath(model.listPhotoId)
    if (model.listPhotoId === '') {
        self.state = {
            backgroundImage: {
                localImagePath: localImagePath,
                width: 348,
            }
        }
    } else {
        self.state = {
            backgroundImage: null
        }
        Image.getSize(
            `file://${localImagePath}`,
            (width, height) => {
                // debugger
                self.setState({
                    backgroundImage: {
                        localImagePath: localImagePath,
                        width: width,
                    }
                })
            },
            (error) => {
                self.state = {
                    backgroundImage: {
                        localImagePath: localImagePath,
                        width: 348,
                    }
                }
            }
        )
    }
}

export default Photos;
