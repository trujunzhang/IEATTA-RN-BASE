import Telescope from '../components/lib/config';
const _ = require('underscore');

Telescope.settings = {
    collection: {}
};

Telescope.settings.generateTopicsArray = function (content) {
    const array = content.split('\n');
    const list = [];
    _.forEach(array, function (item) {
        if (item !== '') {
            list.push(item);
        }
    });
    return list;
};

Telescope.settings.checkTopicStatus = function (name, type) {
    let filterArray = [];
    switch (type) {
        case "blacklist":
            filterArray = Telescope.settings.getTopicsBlackList();
            break;
        case "filterlist":
            filterArray = Telescope.settings.getTopicsFilterList();
            break;
    }

    let isBannedTopic = false;
    for (let index in filterArray) {
        const keyword = filterArray[index];
        if ((new RegExp(keyword, 'i')).test(name)) {
            isBannedTopic = true;
            break;
        }
    }

    return isBannedTopic;
};

Telescope.settings.getTopicsBlackList = function () {
    return !!Telescope.settings.get("topicsBlackList") ? Telescope.settings.get("topicsBlackList") : [];
};

Telescope.settings.getTopicsFilterList = function () {
    return !!Telescope.settings.get("topicsFilterList") ? Telescope.settings.get("topicsFilterList") : [];
};

Telescope.settings.get = function (setting, defaultValue) {

    const collection = Telescope.settings.collection;

    if (typeof defaultValue !== 'undefined') { // fallback to default
        return defaultValue;
    } else { // or return undefined
        return undefined;
    }
};

export default Telescope;
