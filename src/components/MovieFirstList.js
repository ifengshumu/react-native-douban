/**
 * Created by leezhihua on 2018/6/22
 * @flow
 * */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    DeviceEventEmitter,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import MovieFirstItem from './MovieFirstItem';

let host = 'https://api.douban.com/v2/movie/';
let start = 0;
export default class MovieFirstList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies:[],
            loading: true,
            refreshing: false,
            hasMore:false,
            type:0,
        };
    }

    componentDidMount() {
        this.noti = DeviceEventEmitter.addListener('citychange', (city)=>{
            start = 0;
            this.setState({refreshing:true})
            this.fetchData(city)
        });
        this.fetchData();
    }

    componentWillUnmount() {
        this.noti.remove();
    }
    //请求数据
    fetchData = (city) => {
        let url = `${host}${this.props.type}?apikey=0b2bdeda43b5688921839c8ecb20399b&start=${start}&count=10`;
        let type = 1;
        if (this.props.type.includes('in_theaters')) {
            url = `${host}${this.props.type}?city=${city}&apikey=0b2bdeda43b5688921839c8ecb20399b&start=${start}&count=10`;
            type = 0;
        }
        console.log(url);
        fetch(url)
            .then((response)=>response.json())
            .then((res)=>{
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
                this.setState({movies:subjects,loading:false,refreshing:false,hasMore:hasMore,type:type})
        }).catch((error)=>{
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
    //自定义分割线
    renderSeparator = () => (
        <View style={{ height:5, backgroundColor:'gray',opacity:0.3 }}></View>
    );
    render() {
        return (
            <View>
                {this.state.loading
                    ? <ActivityIndicator size='large' style={{marginTop:100}} />
                    : <FlatList
                        data={this.state.movies}
                        onRefresh={this.refreshData}
                        refreshing={this.state.refreshing}
                        onEndReached={this.loadMoreData}
                        onEndReachedThreshold={0.1}
                        keyExtractor={this.renderKeyExtractor}
                        getItemLayout={(data, index) =>({length: 120, offset: (120 + 5) * index, index })}
                        ItemSeparatorComponent={this.renderSeparator}
                        renderItem={({item})=> {
                            return <MovieFirstItem item={item} type={this.state.type}/>
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
        backgroundColor: 'green',
    },
})