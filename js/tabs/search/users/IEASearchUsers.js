/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Dimensions,
    Keyboard,
    Platform
} from 'react-native'


const F8Colors = require('F8Colors')
const F8SearchBar = require('F8SearchBar')

const UserCell = require('./UserCell')

const {queryUsers} = require('../../../actions')
const {delayEvent} = require('../../../lib/utils')

const {goBackPage, onCellItemPress} = require('../../../tabs/filter/navigatorApp')
import {Container, Header, Content, List, ListItem, Body} from 'native-base'


/**
 * The states were interested in
 */
const {
    MENU_ITEM_ADD_OR_EDIT_USER,
    MODEL_FORM_TYPE_EDIT,
} = require('../../../lib/constants').default


class IEASearchUsers extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    constructor(props) {
        super(props);

        this.state = {
            sections: {
                USERS: []
            }
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            sections: {
                USERS: nextProps.appModel.searchUsers
            }
        })
    }

    componentWillBlur() {

        debugger

        Keyboard.dismiss();
    }

    componentWillMount() {
        this.props.dispatch(queryUsers())
    }

    handleSearch(input) {
        const {dispatch} = this.props;

        delayEvent(function () {
            dispatch(queryUsers({search: input}))
        }, 700)
    }

    render() {
        const {props, onPress} = this;
        const {sections} = this.state;
        const users = sections.USERS;
        return (
            <Container>

                <F8SearchBar
                    onBack={() => {
                        goBackPage(this.props)
                    }}
                    handleSearch={this.handleSearch.bind(this)}
                    placeholder={"Search Users"}/>

                <Content>
                    <List>
                        {
                            users.map(function (user) {
                                return (
                                    <ListItem onPress={() => onPress(props, user)}
                                              key={user.objectId}
                                              style={{
                                                  height: F8Colors.UserRowHeight,
                                              }}>
                                        <UserCell key={user.objectId} user={user} {...props}/>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Content>
            </Container>
        )
    }

    onPress(props, user) {
        onCellItemPress(props, MENU_ITEM_ADD_OR_EDIT_USER, {
            model: user,
            modelType: MODEL_FORM_TYPE_EDIT
        })
    }

}


const {connect} = require('react-redux')

function select(store) {
    return {
        appModel: store.appModel,
        currentUser: store.user,
    }
}

module.exports = connect(select)(IEASearchUsers)


