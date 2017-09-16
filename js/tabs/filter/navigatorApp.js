const {
    MENU_DETAILED_RESTAURANT_PAGE,
    // More Cell menus
    MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
    MENU_ITEM_SEARCH_RESTAURANTS,
    MENU_ITEM_MANAGE_FRIENDS,
    MENU_ITEM_READ_REVIEWS,
    // Model Form Type
    MODEL_FORM_TYPE_NEW,
    MODEL_FORM_TYPE_EDIT,
} = require('../../lib/constants').default


export function goBackPage(props) {
    const {navigation} = props;
    navigation.goBack()
}

export function onCellItemPress(props, tag, passProps) {
    const {navigate} = props.navigation;
    let morePassProps = passProps;
    switch (tag) {
        case MENU_ITEM_ADD_OR_EDIT_RESTAURANT: {
            morePassProps = Object.assign({}, passProps, {
                modelType: MODEL_FORM_TYPE_NEW
            })
        }
    }
    navigate(tag, morePassProps)
}

