const F8Colors = require('F8Colors')
const React = require('React')
const Platform = require('Platform')
const StyleSheet = require('StyleSheet')
const {Text} = require('F8Text')
const TouchableOpacity = require('TouchableOpacity')
const View = require('View')
const Image = require('Image')
const ToolbarAndroid = require('ToolbarAndroid')


const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

export default StyleSheet.create({
    toolbarContainer: {
        paddingTop: STATUS_BAR_HEIGHT,
    },
    toolbar: {
        height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
    },
    header: {
        backgroundColor: 'transparent',
        paddingTop: STATUS_BAR_HEIGHT,
        height: HEADER_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    subTitleText: {
        color: 'white',
        fontWeight: '400',
        fontSize: 12,
        marginTop: 0
    },
    leftItem: {
        flex: 1,
        alignItems: 'flex-start',
    },
    centerItem: {
        flex: 2,
        alignItems: 'center',
    },
    rightItem: {
        flex: 1,
        alignItems: 'flex-end',
    },
    itemWrapper: {
        padding: 11,
    },
    itemText: {
        letterSpacing: 1,
        fontSize: 12,
        color: 'white',
    },
});

