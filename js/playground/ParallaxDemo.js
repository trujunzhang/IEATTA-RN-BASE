/*
 * This example demonstrates how to use ParallaxScrollView within a ScrollView component.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    ListView,
    PixelRatio,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';


class ParallaxDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }).cloneWithRows([
                'Simplicity Matters',
                'Hammock Driven Development',
                'Value of Values',
                'Are We There Yet?',
                'The Language of the System',
                'Design, Composition, and Performance',
                'Clojure core.async',
                'The Functional Database',
                'Deconstructing the Database',
                'Hammock Driven Development',
                'Value of Values'
            ])
        };
    }

    renderRow(rowData) {
        return (
            <View key={rowData} style={styles.row}>
                <Text style={styles.rowText}>
                    {rowData}
                </Text>
            </View>
        )
    }


    renderBackground() {
        return (
            <View key="background">
                <Image
                    style={{flexGrow: 1, height: PARALLAX_HEADER_HEIGHT}}
                       source={{uri: 'https://i.ytimg.com/vi/P-NZei5ANaQ/maxresdefault.jpg'}}>

                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,.4)',
                    }}/>

                </Image>

            </View>
        )
    }


    renderForeground() {
        return (

            <View key="parallax-header" style={styles.parallaxHeader}>
                <Text style={{fontSize: 25, color: '#fff', fontWeight: 'bold'}}>
                    Welcome to react-native-hero!</Text>
                <Text style={{fontSize: 14, color: '#27ae60'}}>Simplified Hero Units 🎉!</Text>
            </View>

        )
    }

    renderStickyHeader() {
        return (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>Rich Hickey Talks</Text>
            </View>
        )
    }

    renderFixedHeader() {
        return (
            <View key="fixed-header" style={styles.fixedSection}>
                <Text style={styles.fixedSectionText}>
                    Scroll to top
                </Text>
            </View>
        )
    }

    render() {

        return (
            <ListView
                ref="ListView"
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind()}
                renderScrollComponent={props => (

                    <ParallaxScrollView
                        headerBackgroundColor="#333"
                        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                        backgroundSpeed={10}

                        renderBackground={this.renderBackground.bind(this)}
                        renderForeground={this.renderForeground.bind(this)}
                        renderStickyHeader={this.renderStickyHeader.bind(this)}
                        renderFixedHeader={this.renderFixedHeader.bind(this)}

                    />
                )}
            />
        );
    }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },

    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: 300,
        justifyContent: 'flex-end'
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeaderSection: {
        flexGrow: 1,
        height: PARALLAX_HEADER_HEIGHT
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 180,
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
});

module.exports = ParallaxDemo;

