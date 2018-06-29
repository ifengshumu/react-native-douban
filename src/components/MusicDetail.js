/**
 * Created by leezhihua on 2018/6/28
 * @flow
 * */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    WebView,
} from 'react-native';

export default class MusicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url:''
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    //请求数据
    fetchData = () => {
        let url = `https://api.douban.com/v2/music/${this.props.id}`;
        console.log(url);
        fetch(url)
            .then((response)=>response.json())
            .then((res)=>{
                this.setState({url:res.mobile_link})
            }).catch((error)=>{
            console.log(error);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    source={{uri:this.state.url}}
                    scalesPageToFit={true}
                    bounces={true}
                />
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