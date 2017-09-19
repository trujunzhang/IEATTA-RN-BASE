
export function goBackPage(props) {
    const {navigation} = props;
    navigation.goBack()
}

export function onCellItemPress(props, tag, passProps) {
    const {navigate} = props.navigation;
    navigate(tag, passProps)
}

