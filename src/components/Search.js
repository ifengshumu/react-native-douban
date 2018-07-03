/**
 * Created by leezhihua on 2018/7/3
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BTSearchBar from '../Commons/BTSearchBar';
import SearchMusicCell from './SearchMusicCell';
import SearchBookCell from './SearchBookCell';


let sinals = ['音乐', '图书'];
let placeholders = ['请输入歌曲名称、歌手名字', '请输入图书名称、作者名字'];
let types = ['music', 'book'];
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: 0,
            placeholder: placeholders[0],
            data:[],
            type:'',
            searchText:'',
            start:0,
            hasMore:false,
        };
    }

    //切换搜索类型
    pressSinal = (index) => {
        this.setState({selectIndex: index, placeholder: placeholders[index],data:[]})
        this.fetchData(this.state.searchText, index);
    }

    //请求数据
    fetchData = (text, index) => {
        let start = this.state.start;
        let type = types[index];
        if (text != this.state.searchText || type != this.state.type) start = 0;
        let url = `https://api.douban.com/v2/${type}/search?q=${text}&apikey=0b2bdeda43b5688921839c8ecb20399b&start=${start}&count=10`;
        console.log(url);
        fetch(url)
            .then((response)=>response.json())
            .then((res)=>{
                let data:Array = [];
                let resData = index===0?res.musics:res.books;
                if (start === 0) {
                    data = resData;
                } else {
                    data = this.state.data.concat(resData);
                }
                let hasMore = false;
                if (start < res.total) {
                    hasMore = true;
                    start += 11;
                }
                this.setState({data:data,type:type,start:start,hasMore:hasMore,searchText:text})
            })
            .catch((error)=>{
                console.log(error);
            });
    }


    //上拉加载
    loadMoreData = ()=> {
        if (this.state.hasMore) {
            this.fetchData(this.state.searchText,this.state.selectIndex);
        }
    }
    //自定义分割线
    renderSeparator = () => (
        <View style={{ height:5, backgroundColor:'gray',opacity:0.3 }}></View>
    );

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                    {
                        sinals.map((value, index) => {
                            return (
                                <View style={styles.topsinal} key={index}>
                                    <Text
                                        style={[styles.sinal, {color: this.state.selectIndex === index ? 'red' : 'black'}]}
                                        onPress={() => this.pressSinal(index)}>
                                        {value}
                                    </Text>
                                    <Icon name={this.state.selectIndex === index ? 'menu-up' : null}
                                          size={15}
                                          color={this.state.selectIndex === index ? 'red' : 'black'}/>
                                </View>
                            )
                        })
                    }
                </View>
                <BTSearchBar
                    enableSearchInput={true}
                    placeholder={this.state.placeholder}
                    onSearch={(text) => this.fetchData(text, this.state.selectIndex)}
                    onCancelSearch={() => Keyboard.dismiss()}
                />
                <FlatList
                    data={this.state.data}
                    onEndReached={this.loadMoreData}
                    onEndReachedThreshold={0.001}
                    key={this.state.selectIndex===0?'music':'book'}
                    numColumns={this.state.selectIndex===0?1:2}
                    columnWrapperStyle={this.state.selectIndex===1&&{marginLeft:10}}
                    keyboardDismissMode={'on-drag'}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    renderItem={this.state.selectIndex === 0 ? ({item})=> {
                        return <SearchMusicCell item={item}/>
                    } : ({item})=> {
                        return <SearchBookCell item={item}/>
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
        paddingTop: 30,
    },
    topsinal: {
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sinal: {
        fontSize: 20,
    }
})