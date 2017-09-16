import {combineReducers} from "redux";
import drawer from "./drawer";

module.exports = combineReducers({
    drawer,
    config: require('./config'),
    user: require('./user'),
    appModel: require('./appModel'),
    editModel: require('./editModel/editModelReducer'),
    auth: require('./auth/authReducer'),
});
