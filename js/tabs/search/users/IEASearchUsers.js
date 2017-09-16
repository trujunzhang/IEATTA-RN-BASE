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
    Platform
} from 'react-native'

import {Container, Header, Left, Item, Input, Icon, Button, Text} from 'native-base'

const F8SearchBar = require('F8SearchBar')
const PureListView = require('PureListView')

const UserCell = require('./UserCell')

const {goBackPage} = require('../../../tabs/filter/navigatorApp')
const {queryUsers} = require('../../../actions')
const {delayEvent} = require('../../../lib/utils')

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

    componentWillMount() {
        this.props.dispatch(queryUsers())
    }

    renderRow = (user: Object,
                 sectionID: number | string,
                 rowID: number | string) => {
        return (<UserCell key={user.objectId} user={user} {...this.props}/>)
    }

    handleSearch(input) {
        const {dispatch} = this.props;

        delayEvent(function () {
            dispatch(queryUsers({search: input}))
        }, 700)
    }


    render() {
        return (
            <Container>
                <F8SearchBar
                    onBack={() => {
                        goBackPage(this.props)
                    }}
                    handleSearch={this.handleSearch.bind(this)}
                    placeholder={"Search Users"}
                />

                <PureListView
                    {...this.props}
                    haveParallaxView={false}
                    data={this.state.sections}
                    renderRow={this.renderRow.bind(this)}
                    renderFooter={this.renderFooter.bind(this)}
                />
            </Container>
        )
    }

    renderFooter() {
        return (<View style={{height: 60}}/>)
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


