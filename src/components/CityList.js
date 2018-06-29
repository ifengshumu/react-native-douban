/**
 * Created by leezhihua on 2018/6/29
 * @flow
 * */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    SectionList,
    ActivityIndicator,
} from 'react-native';

let start = 0;
let citys = [];
export default class CityList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            citys:[]
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    //请求城市数据
    fetchData = () => {
        let url = `https://api.douban.com/v2/loc/list?apikey=0b2bdeda43b5688921839c8ecb20399b&start=${start}&count=100`;
        console.log(url);
        fetch(url)
            .then((response)=>response.json())
            .then((res)=>{
                citys = citys.concat(res.locs);
                start = res.count+res.start;
                let hasMore = false;
                if (start < res.total) {
                    hasMore = true;
                    start++;
                }
                if (hasMore) {
                    this.fetchData();
                } else {
                    let sections = new Map();
                    let keys =[];
                    citys.map((v, i) => {
                        let key = v.uid.charAt(0).toUpperCase();
                        let isChinese = /^[\u4e00-\u9fa5]/.test(v.name.charAt(0));
                        if (sections.has(key)) {
                            if (isChinese) {
                                let cityA = sections.get(key);
                                cityA.push(v);
                            }
                        } else {
                            if (isChinese && key != '1') {
                                let cityA = [];
                                cityA.push(v);
                                keys.push(key);
                                sections.set(key, cityA);
                            }
                        }
                    })
                    keys.sort((v1, v2)=>{
                        if (v1 > v2) return 1;
                        if (v1 < v2) return -1;
                    })
                    let cityData = [];
                    keys.map((value, index) => {
                        cityData.push({key:value, data:sections.get(value)});
                    })
                    this.setState({citys:cityData, loading:false});
                }
            })
            .catch((error)=>{
                console.log(error);
        });
    }

    //返回区头视图
    renderSection = (info) => {
        return (
            <View style={[styles.center, {backgroundColor:'orange'}]}>
                <Text style={styles.header}>{info.section.key}</Text>
            </View>
        )
    }
    //返回cell
    renderItem = (info) => {
        return (
            <TouchableHighlight onPress={()=>Actions.pop({refresh:({'city':info.item.name})})} underlayColor={'yellow'}>
                <View style={styles.center}>
                    <Text style={styles.item}>{info.item.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }
    //分隔线
    renderSeparator = () => (
        <View style={{ height:1, backgroundColor:'gray',opacity:0.3 }}></View>
    );
    //唯一标识key
    renderExtractor = (item,index)=> {
        return index.toString();
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.loading
                        ? <ActivityIndicator size='large' color={'purple'} style={{marginTop:100}} />
                        :<SectionList
                            sections={this.state.citys}
                            renderSectionHeader={this.renderSection}
                            renderItem={this.renderItem}
                            ItemSeparatorComponent={this.renderSeparator}
                            keyExtractor = {this.renderExtractor}
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
    },
    center: {
        justifyContent:'center',
    },
    header: {
        flex:1,
        marginLeft:20,
        height: 50,
        color: 'white',
        fontSize: 30
    },
    item: {
        margin:20,
        backgroundColor: "#ffffff",
        color: '#5C5C5C',
        fontSize: 20,
    },

})