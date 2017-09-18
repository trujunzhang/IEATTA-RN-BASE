/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    StatusBar,
    Navigator,
    Dimensions,
    AppRegistry
} from 'react-native'

import {
    Button,
    Container,
    List,
    ListItem,
    Content,
    Icon,
    Header,
} from "native-base";

const {Text} = require('F8Text')
const ProfilePicture = require('../../common/ProfilePicture')
const {logOutWithPrompt} = require('../../actions')
const MenuItem = require('../../tabs/MenuItem')
const F8Colors = require('F8Colors')

const {
    MENU_HOME_TABS_USER_INFO,
} = require('../../lib/constants').default


const styles = StyleSheet.create({
    drawer: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
    },
    header: {
        padding: 20,
        justifyContent: 'flex-end',
    },
    rowItem: {
        height: 80
    },
    name: {
        marginTop: 10,
        color: 'white',
        fontSize: 12,
    },
    loginPrompt: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    loginText: {
        fontSize: 12,
        color: F8Colors.lightText,
        textAlign: 'center',
        marginBottom: 10,
    },
});


class DrawBar extends React.Component {
    static navigationOptions = {
        header: null
    };

    openProfileSettings() {
        // this.refs.drawer.closeDrawer();
        // this.props.navigator.push({shareSettings: true});
    }

    renderNavigationView() {
        const {username} = this.props.currentUser;

        return (
            <View style={styles.drawer}>

                <MenuItem
                    title="Home"
                    icon={"home"}
                    selectedIcon={"home"}
                    selected={this.props.tab === 'main'}
                />
                <MenuItem
                    title="User"
                    icon={"user-o"}
                    selectedIcon={"user-o"}
                    selected={this.props.tab === 'info'}
                />
            </View>
        );
    }

    render() {
        const {username} = this.props.currentUser;
        return (
            <Container>
                <Content>
                    <Image
                        style={{
                            flex: 1,
                            alignSelf: "stretch",
                        }}
                        resizeMode="contain"
                        source={require('../../tabs/img/drawer-header.png')}>
                        <View style={{
                            marginTop: 80,
                            marginLeft: 20,
                        }}>
                            <TouchableOpacity onPress={this.openProfileSettings}>
                                <ProfilePicture user={this.props.currentUser} size={80}/>
                            </TouchableOpacity>
                            <Text style={styles.name}>
                                {username}
                            </Text>

                        </View>
                    </Image>
                    <List>

                        <ListItem button onPress={() => this.props.navigation.navigate('Home')}>
                            <View style={styles.rowItem}>
                                <Icon active name="arrow-back" style={{color: '#ccc'}}/>
                                <Text>{'Home'}</Text>
                            </View>
                        </ListItem>

                        <ListItem button onPress={() => this.props.navigation.navigate(MENU_HOME_TABS_USER_INFO)}>
                            <View style={styles.rowItem}>
                                <Text>{'User Info'}</Text>
                            </View>
                        </ListItem>

                    </List>

                </Content>
            </Container>
        )
    }
}

const {connect} = require('react-redux')

function select(store) {
    return {
        currentUser: store.user,
    }
}

function actions(dispatch) {
    return {
        logOut: () => dispatch(logOutWithPrompt()),
    };
}


module.exports = connect(select, actions)(DrawBar)