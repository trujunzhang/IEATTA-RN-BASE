import React, {Component} from "react";

const {
    // Photo Browser
    MENU_PHOTO_BROWSER_PAGE,
    MENU_TAKE_PHOTO_PAGE,
    // Login
    MENU_LOGIN_MAIN_SCREEN,
    //
    MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
    MENU_ITEM_SEARCH_RESTAURANTS,
    MENU_ITEM_MANAGE_FRIENDS,
    MENU_ITEM_READ_REVIEWS,
    //
    MENU_HOME_TABS_HOME,
    MENU_HOME_TABS_USER_INFO,
    // Detailed
    MENU_DETAILED_RESTAURANT_PAGE,
    MENU_DETAILED_EVENT_PAGE,
    MENU_DETAILED_ORDERED_USER_PAGE,
    MENU_DETAILED_RECIPE_PAGE,
    MENU_DETAILED_REVIEW_PAGE,
    // Edit
    MENU_ITEM_ADD_OR_EDIT_EVENT,
    MENU_ITEM_ADD_OR_EDIT_RECIPE,
    MENU_ITEM_ADD_OR_EDIT_USER,
    MENU_ITEM_ADD_OR_EDIT_REVIEW,
    MENU_ITEM_READ_USER,
    MODEL_FORM_TYPE_NEW,
    MODEL_FORM_TYPE_EDIT,
    LOGIN_FORM_TYPE_MAIN
} = require('../lib/constants').default

// Login.
const LoginScreen = require('../components/lib/login/LoginScreen')
const LoginModal = require('../components/lib/login/LoginModal')

import Home from "../components/home/";
import HomeDrawerRouter from "./HomeDrawerRouter";
import {StackNavigator} from "react-navigation";

const IEANearRestaurantScene = require('../tabs/home/IEANearRestaurantScene')
const MyProfileView = require('../tabs/profile/MyProfileView')

// Detailed page.
import IEADetailedRestaurant from '../tabs/restaurant/IEADetailedRestaurant'

const IEADetailedEvent = require('../tabs/event/IEADetailedEvent')
const IEAOrderedUser = require('../tabs/orderedUser/IEAOrderedUser')
const IEADetailedRecipe = require('../tabs/recipe/IEADetailedRecipe')

// Edit.
const IEAEditRestaurant = require('../tabs/edit/restaurant/IEAEditRestaurant')
const IEAEditEvent = require('../tabs/edit/event/IEAEditEvent')
const IEAEditRecipe = require('../tabs/edit/recipe/IEAEditRecipe')
const IEAEditUser = require('../tabs/edit/user/IEAEditUser')
const IEAEditReview = require('../tabs/edit/review/IEAEditReview')

// Search.
const IEASearchRestaurants = require('../tabs/search/restaurants/IEASearchRestaurants')
const IEASearchUsers = require('../tabs/search/users/IEASearchUsers')

// Review.
const IEAReadReviews = require('../tabs/review/IEAReadReviews')
const IEADetailedReview = require('../tabs/review/IEADetailedReview')

// Photos
const IEAPhotoBrowserView = require('../components/lib/photosbrowser/IEAPhotoBrowserView')
const IEATakePhotos = require('../tabs/photos/IEATakePhotos')


HomeDrawerRouter.navigationOptions = ({navigation}) => ({
    header: null
});

export default (StackNav = StackNavigator({
    Home: {screen: Home},

    // Detailed page.
    MENU_DETAILED_RESTAURANT_PAGE: {screen: IEADetailedRestaurant},
    MENU_DETAILED_EVENT_PAGE: {screen: IEADetailedEvent},
    MENU_DETAILED_ORDERED_USER_PAGE: {screen: IEAOrderedUser},
    MENU_DETAILED_RECIPE_PAGE: {screen: IEADetailedRecipe},
    MENU_DETAILED_REVIEW_PAGE: {screen: IEADetailedReview},

    // New/Edit Model.
    MENU_ITEM_ADD_OR_EDIT_RESTAURANT: {screen: IEAEditRestaurant},
    MENU_ITEM_ADD_OR_EDIT_EVENT: {screen: IEAEditEvent},
    MENU_ITEM_ADD_OR_EDIT_RECIPE: {screen: IEAEditRecipe},
    MENU_ITEM_ADD_OR_EDIT_REVIEW: {screen: IEAEditReview},
    MENU_ITEM_ADD_OR_EDIT_USER: {screen: IEAEditUser},

    // Menu more.
    MENU_ITEM_SEARCH_RESTAURANTS: {screen: IEASearchRestaurants},
    MENU_ITEM_MANAGE_FRIENDS: {screen: IEASearchUsers},
    MENU_ITEM_READ_REVIEWS: {screen: IEAReadReviews},

    // Login Screens.
    MENU_LOGIN_MAIN_SCREEN: {screen: LoginModal},

    // Photos Browser
    MENU_PHOTO_BROWSER_PAGE: {screen: IEAPhotoBrowserView},
    MENU_TAKE_PHOTO_PAGE: {screen: IEATakePhotos},

    // Left Draw
    MENU_HOME_TABS_USER_INFO: {screen: MyProfileView},
}));
