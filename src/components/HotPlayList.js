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
    ActivityIndicator,
    FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import MovieItem from './MovieItem';

let start = 0;
export default class HotPlayList extends Component {
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
        this.fetchData();
    }
    //请求数据
    fetchData = () => {
        let url = `${this.props.requestURL}?start=${start}&count=10`;
        console.log(url);
        let type = this.props.requestURL.includes('in_theaters')?0:1;
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
                console.log(subjects);
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
                            return <MovieItem item={item} type={this.state.type}/>
                        }}
                    />
                }
            </View>
        )
    }
}

HotPlayList.propTypes = {
    requestURL:PropTypes.string.isRequired,
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
    },
})