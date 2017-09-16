import React, { Component } from 'react';
import { StyleSheet, SectionList, View, Text } from 'react-native';

export default class SectionListViewDemo extends Component {
    _keyExtractor(item, index) {
        return item + index;
    }

    _renderItem({ item, index }) {
        return (
            <View style={styles.item}>
                <Text>{item}</Text>
            </View>
        );
    }

    _renderSectionHeader({ section }) {
        return (
            <View style={styles.sectionHeader}>
                <Text>{section.key}</Text>
            </View>
        );
    }

    render() {
        return (
            <SectionList
                sections={sectionsData}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                renderSectionHeader={this._renderSectionHeader}
                stickySectionHeadersEnabled={true}
            />
        );
    }
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    item: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#faf8f6',
    },
    sectionHeader: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#dbdbdb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#757575',
    },
});

const sectionsData = [
    {
        key: 'Animals',
        data: [
            'Alligator', 'Bonobo', 'Chinchilla', 'Duck', 'Egret',
            'Feraligatr', 'Goat', 'Horse', 'Iguana', 'Jackal',
            'Koala', 'Lemur', 'Monkey', 'Newt', 'Ostrich',
            'Pengwing', 'Quail', 'Rat', 'Salamander', 'Tiny Fish',
            'Uakari', 'Vole', 'Warthog', 'Xerus', 'Yak',
            'Zebra',
        ],
    },
    {
        key: 'Houses',
        data: [
            'Beach', 'Bird', 'Dog', 'Doll', 'Lustron',
            'of Representatives', 'Toll', 'White',
        ],
    },
    {
        key: 'Fruits',
        data: [
            'Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry',
            'Fig', 'Grapefruit', 'Hackberry', 'Imbe', 'Jackfruit',
        ],
    }
];