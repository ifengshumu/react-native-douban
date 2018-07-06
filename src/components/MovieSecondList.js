/**
 * Created by leezhihua on 2018/6/25
 * @flow
 * */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import MovieSecondItem from './MovieSecondItem';

let host = 'https://api.douban.com/v2/movie/';
let start = 0;
export default class MovieSecondList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies:[],
            loading: true,
            refreshing: false,
            hasMore:false,
        };
    }
    componentDidMount() {
        this.fetchData();
    }

    //请求数据
    fetchData = () => {
        //'Top250':GET请求，默认数据结构，可以刷新
        // '口碑榜',:POST请求，自有数据结构，不可以刷新
        // '北美票房榜':GET请求,数据结构同上,不可以刷新
        // '新片榜':POST请求，默认数据结构，不可以刷新
        let formData = new FormData();
        formData.append('apikey','0b2bdeda43b5688921839c8ecb20399b')
        formData.append('city','北京')
        formData.append('client','something')
        let type = this.props.type;
        let url = `${host}${type}?start=${start}&count=20`;
        console.log(url);
        let params = null;
        if (type === 'weekly'||type === 'new_movies') {
            params = {
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body:formData,
            };
        }
        fetch(url, params)
            .then((response)=>response.json())
            .then((res)=>{
                //Top250
                if (type === 'top250') {
                    let subjects:Array = [];
                    if (start === 0) {
                        subjects = res.subjects;
                    } else {
                        subjects = this.state.movies.concat(res.subjects);
                    }
                    start = res.count+res.start;
                    let hasMore = false;
                    if (start < res.total) {
                        hasMore = true;
                        start++;
                    }
                    this.setState({movies:subjects,loading:false,refreshing:false,hasMore:hasMore})
                }
                //口碑榜 or 北美票房榜
                if (type === 'weekly' || type === 'us_box') {
                    let subjects:Array = res.subjects;
                    let object = [];
                    subjects.map(value => {
                        object.push(value.subject);
                    })
                    this.setState({movies:object,loading:false})
                }
                //新片榜
                if (type === 'new_movies') {
                    let subjects:Array = res.subjects;
                    this.setState({movies:subjects,loading:false})
                }
            })
            .catch((error)=>{
                console.log(error);
        });
    }
    //下拉刷新
    refreshData = ()=> {
        start = 0;
        this.setState({refreshing:true})
        this.fetchData();
    }
    //上拉加载
    loadMoreData = ()=> {
        if (this.state.hasMore) {
            this.fetchData();
        }
    }
    //唯一key
    renderKeyExtractor = (item, index) => index.toString();
    render() {
        return (
            <View>
                {this.state.loading
                    ? <ActivityIndicator size='large' style={{marginTop:100}} />
                    : <FlatList
                        data={this.state.movies}
                        refreshing={this.state.refreshing}
                        onRefresh={this.refreshData}
                        onEndReached={this.loadMoreData}
                        onEndReachedThreshold={0.1}
                        keyExtractor={this.renderKeyExtractor}
                        getItemLayout={(data, index) =>({length: 200, offset: (200 + 1) * index, index })}
                        renderItem={({item,index})=> {
                            return <MovieSecondItem item={item} index={index}/>
                        }}
                    />
                }
            </View>
        )
    }
}
MovieSecondList.propTypes = {
    type:PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },


})