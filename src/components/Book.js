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
    Keyboard,
    FlatList,
} from 'react-native';
import BTSearchBar from '../Commons/BTSearchBar';
import BookItem from './BookItem';

export default class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books:[],
            searchText:'',
            start:0,
            hasMore:false,
        };
    }

    //请求数据
    fetchData = (text) => {
        let start = this.state.start;
        if (text != this.state.searchText) start = 0;
        let url = `https://api.douban.com/v2/book/search?q=${text}&apikey=0b2bdeda43b5688921839c8ecb20399b&start=${start}&count=10`;
        console.log(url);
        fetch(url)
            .then((response)=>response.json())
            .then((res)=>{
                let books:Array = [];
                if (start === 0) {
                    books = res.books;
                } else {
                    books = this.state.books.concat(res.books);
                }
                let hasMore = false;
                if (start < res.total) {
                    hasMore = true;
                    start += 11;
                }
                this.setState({books:books,start:start,hasMore:hasMore,searchText:text})
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
        <View style={{ height:5, backgroundColor:'gray',opacity:0.3 }}></View>
    );

    render() {
        return (
            <View style={styles.container}>
                <BTSearchBar
                    enableSearchInput={true}
                    showCancel={true}
                    placeholder={'请输入图书名称'}
                    onSearch={(text)=>this.fetchData(text)}
                    onCancelSearch={()=>Keyboard.dismiss()}
                />
                <FlatList
                    data={this.state.books}
                    onEndReached={this.loadMoreData}
                    onEndReachedThreshold={0.001}
                    numColumns={2}
                    // columnWrapperStyle={styles.twoColumns}
                    keyboardDismissMode={'on-drag'}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    renderItem={({item})=> {
                        return <BookItem item={item}/>
                    }}
                />
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
    twoColumns: {
        margin:10,
        borderWidth:2,
        borderColor:'orange',
    }
})