/**
 * Created by leezhihua on 2018/6/25
 * @flow
 * */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Keyboard,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import BTSearchBar from '../Commons/BTSearchBar';
import MovieItem from './MovieItem';

export default class SearchMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies:[],
            loading: false,
            start:0,
            hasMore:false,
            searchText:'',
        };
    }
    componentWillUnmount() {
        Keyboard.dismiss();
    }
    cancelSearch = ()=> {
        Keyboard.dismiss();
        Actions.pop();
    }
    //搜索
    searchData = (text)=> {
        let start = this.state.start;
        if (text != this.state.searchText) start = 0;
        // encodeURI(text)
        let url = `https://api.douban.com/v2/movie/search?q=${text}&apikey=0b2bdeda43b5688921839c8ecb20399b&client=something&start=${start}&count=10`;
        console.log(url);
        fetch(url)
            .then((response)=>response.json())
            .then((res)=>{
                let subjects:Array = [];
                if (start === 0) {
                    subjects = res.subjects;
                } else {
                    subjects = this.state.subjects.concat(res.subjects);
                }
                let hasMore = false;
                if (start < res.total) {
                    hasMore = true;
                    start += 11;
                }
                this.setState({movies:subjects,loading:false,start:start,hasMore:hasMore,searchText:text})
            })
            .catch((error)=>{
                console.log(error);
            });
    }
    //上拉加载
    loadMoreData = ()=> {
        if (this.state.hasMore) {
            this.searchData(this.state.searchText);
        }
    }
    //唯一key
    renderKeyExtractor = (item, index) => index.toString();
    //自定义分割线
    renderSeparator = () => (
        <View style={{ height:5, backgroundColor:'gray',opacity:0.3 }}></View>
    );
    render() {
        return (
            <View style={styles.container}>
                <BTSearchBar
                    showCancel={true}
                    placeholder={'输入电影名、演员名'}
                    enableSearchInput={true}
                    onSearch={(text)=>{this.searchData(text)}}
                    onCancelSearch={this.cancelSearch}
                />
                {this.state.loading
                    ? <ActivityIndicator size='large' style={{marginTop:100}} />
                    : <FlatList
                        data={this.state.movies}
                        onEndReached={this.loadMoreData}
                        onEndReachedThreshold={0.1}
                        keyboardDismissMode={'on-drag'}
                        keyExtractor={this.renderKeyExtractor}
                        getItemLayout={(data, index) =>({length: 120, offset: (120 + 5) * index, index })}
                        ItemSeparatorComponent={this.renderSeparator}
                        renderItem={({item})=> {
                            return <MovieItem item={item} type={2}/>
                        }}
                    />
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop:25,
    },
})