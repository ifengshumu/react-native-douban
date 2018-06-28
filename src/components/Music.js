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
    FlatList,
    Keyboard,
} from 'react-native';
import BTSearchBar from '../Commons/BTSearchBar'
import MusicItem from './MusicItem';

export default class Music extends Component {
    constructor(props) {
        super(props);
        this.state = {
            music:[],
            searchText:'',
            start:0,
            hasMore:false,
        };
    }

    //请求数据
    fetchData = (text) => {
        let url = `https://api.douban.com/v2/music/search?q=${encodeURI(text)}&apikey=0b2bdeda43b5688921839c8ecb20399b&start=${this.state.start}&count=10`;
        console.log(url);
        fetch(url)
            .then((response)=>response.json())
            .then((res)=>{
                // console.log(res);
                let music:Array = this.state.music.concat(res.musics);
                let start = res.count+res.start;
                let hasMore = false;
                if (start < res.total) {
                    hasMore = true;
                    start++;
                }
                Keyboard.dismiss();
                this.setState({music:music,start:start,hasMore:hasMore,searchText:text})
            }).catch((error)=>{
            console.log(error);
        });
    }

    //上拉加载
    loadMoreData = ()=> {
        if (this.state.hasMore) {
            this.fetchData(this.state.searchText);
        }
    }
    //自定义分割线
    renderSeparator = () => (
        <View style={{ height:1, backgroundColor:'gray',opacity:0.3 }}></View>
    );

    render() {
        return (
            <View style={styles.container}>
                <BTSearchBar
                    enableSearchInput={true}
                    showCancel={true}
                    placeholder={'请输入歌曲名'}
                    onSearch={(text)=>this.fetchData(text)}
                    onCancelSearch={()=>Keyboard.dismiss()}
                />
                <FlatList
                    data={this.state.music}
                    onEndReached={this.loadMoreData}
                    onEndReachedThreshold={0.1}
                    keyExtractor={(item, index) => index.toString()}
                    getItemLayout={(item, index) =>({length: 150, offset: (150 + 1) * index, index })}
                    ItemSeparatorComponent={this.renderSeparator}
                    renderItem={({item})=> {
                        return <MusicItem item={item}/>
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'white',
        paddingTop:25,
    },
})