/**
 * Created by leezhihua on 2018/7/1
 * @flow
 * */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

export default class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let props = this.props.data;
        return (
            <View style={styles.container}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})