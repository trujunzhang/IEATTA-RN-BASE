/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image
} from 'react-native';

const md5 = require('blueimp-md5')

const RNFS = require('react-native-fs')

const downloadUrl = 'http://lorempixel.com/400/200/'
const downloadLargeUrl = 'http://ipv4.download.thinkbroadband.com/100MB.zip'
const downloadRedirectUrl = 'http://buz.co/rnfs/download-redirect.php'

const downloadHeaderUrl = 'http://buz.co/rnfs/download-tester.php'
const downloadHeaderPath = RNFS.DocumentDirectoryPath + '/headers.json'

let jobId = -1;

class RNFSApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            output: 'Doc folder: ' + RNFS.DocumentDirectoryPath,
            imagePath: {
                uri: ''
            }
        }
    }

    downloadFileTest(background, url, localFileName) {
        if (jobId !== -1) {
            this.setState({output: 'A download is already in progress'});
        }

        const progress = data => {
            const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
            const text = `Progress ${percentage}%`;
            this.setState({output: text});
        };

        const begin = res => {
            this.setState({output: 'Download has begun'});
        };

        const progressDivider = 1;

        this.setState({imagePath: {uri: ''}});

        // Random file name needed to force refresh...
        // const downloadDest = `${RNFS.DocumentDirectoryPath}/${((Math.random() * 1000) | 0)}.jpg`;
        const downloadDest = `${RNFS.DocumentDirectoryPath}/${localFileName}.jpg`;

        const ret = RNFS.downloadFile({
            fromUrl: url,
            toFile: downloadDest,
            begin,
            progress,
            background,
            progressDivider
        });

        jobId = ret.jobId;

        debugger

        ret.promise.then(res => {
            this.setState({output: JSON.stringify(res)});
            this.setState({imagePath: {uri: 'file://' + downloadDest}});

            jobId = -1;
        }).catch(err => {
            this.showError(err)
        });
    }

    stopDownloadTest() {
        if (jobId !== -1) {
            RNFS.stopDownload(jobId);
        } else {
            this.setState({output: 'There is no download to stop'});
        }
    }

    downloadHeaderTest() {
        const headers = {
            'foo': 'Hello',
            'bar': 'World'
        };

        // Download the file then read it, it should contain the headers we sent
        RNFS.downloadFile({fromUrl: downloadHeaderUrl, toFile: downloadHeaderPath, headers}).promise.then(res => {
            return RNFS.readFile(downloadHeaderPath, 'utf8');
        }).then(content => {
            const headers = JSON.parse(content);

            this.assert('Should contain header for foo', headers['HTTP_FOO'], 'Hello');
            this.assert('Should contain header for bar', headers['HTTP_BAR'], 'World');

            this.setState({output: 'Headers downloaded successfully'});
        }).catch(err => this.showError(err));
    }

    assert(name, val, exp) {
        if (exp !== val) throw new Error(name + ': "' + String(val) + '" should be "' + String(exp) + '"');
        this.setState({output: name});
    }

    getFSInfoTest() {
        return RNFS.getFSInfo().then(info => {
            this.setState({output: JSON.stringify(info)});
        });
    }

    appendTest() {
        const f1 = RNFS.DocumentDirectoryPath + '/f1';
        const f2 = RNFS.DocumentDirectoryPath + '/f2';

        return Promise.resolve().then(() => {
            return RNFS.unlink(f1).then(() => {
            }, () => void 0 /* Ignore error */);
        }).then(() => {
            return RNFS.unlink(f2).then(() => {
            }, () => void 0 /* Ignore error */);
        }).then(() => {
            return RNFS.writeFile(f1, 'foo © bar 𝌆 baz', 'utf8');
        }).then(() => {
            return RNFS.appendFile(f1, 'baz 𝌆 bar © foo', 'utf8');
        }).then(() => {
            return RNFS.appendFile(f2, 'baz 𝌆 bar © foo', 'utf8');
        }).then(() => {
            return RNFS.readFile(f1, 'utf8').then(contents => {
                this.assert('Read F1', contents, 'foo © bar 𝌆 bazbaz 𝌆 bar © foo');
            });
        }).then(() => {
            return RNFS.readFile(f2, 'utf8').then(contents => {
                this.assert('Read F2', contents, 'baz 𝌆 bar © foo');
            });
        }).then(() => {
            this.assert('Tests Passed', true, true);
        }).catch(err => this.showError(err));
    }

    showError(err) {
        this.setState({output: `ERROR: Code: ${err.code} Message: ${err.message}`});
    }

    render() {
        return (
            <View style={styles.container} collapsable={false}>
                <View style={styles.panes}>
                    <View style={styles.leftPane}>
                        <TouchableHighlight >
                            <View style={styles.button}>
                                <Text style={styles.text}>Mocha Test</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.downloadFileTest.bind(this, false, downloadUrl, 'step1') }>
                            <View style={styles.button}>
                                <Text style={styles.text}>DL File</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.downloadFileTest.bind(this, true, downloadUrl, 'step1') }>
                            <View style={styles.button}>
                                <Text style={styles.text}>DL File (BG) </Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={this.downloadFileTest.bind(this, false, downloadRedirectUrl, 'step2') }>
                            <View style={styles.button}>
                                <Text style={styles.text}>DL File (302) </Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={this.downloadFileTest.bind(this, false, downloadLargeUrl, 'step3') }>
                            <View style={styles.button}>
                                <Text style={styles.text}>DL File (Big) </Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.rightPane}>
                        <TouchableHighlight onPress={this.stopDownloadTest}>
                            <View style={styles.button}>
                                <Text style={styles.text}>Stop Download</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight >
                            <View style={styles.button}>
                                <Text style={styles.text}>Upload File</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.downloadHeaderTest}>
                            <View style={styles.button}>
                                <Text style={styles.text}>DL Headers</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.getFSInfoTest}>
                            <View style={styles.button}>
                                <Text style={styles.text}>Get FS Info</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>{this.state.output}</Text>

                    <Image style={styles.image} source={this.state.imagePath}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        backgroundColor: '#F5FCFF',
    },
    panes: {
        flexDirection: 'row',
    },
    leftPane: {
        flex: 1,
    },
    rightPane: {
        flex: 1,
    },
    button: {
        height: 32,
        backgroundColor: '#CCCCCC',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
    },
    image: {
        width: 400,
        height: 200,
    },
});

module.exports = RNFSApp
