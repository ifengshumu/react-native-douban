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
    Dimensions,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import BTCarousel from '../Commons/BTCarousel';
import SeekMoviesList from './SeekMoviesList';

let images = [
    'https://img13.360buyimg.com/da/jfs/t5575/308/4215648119/104001/4c2ab0ee/5949e860Nece99102.jpg',
    'https://img1.360buyimg.com/da/jfs/t6307/99/1563752093/86633/5412833d/59536981N52b023fe.jpg',
    'https://m.360buyimg.com/mobilecms/s720x322_jfs/t5584/79/5196470758/139932/a1884201/595b53ddN56b7d1d0.jpg!q70.jpg',
    'https://img12.360buyimg.com/da/jfs/t5599/172/4238994500/103343/e2fa3cc7/5949e93aN5f43ed41.jpg',
    'https://m.360buyimg.com/mobilecms/s720x322_jfs/t6427/336/1988125013/110199/4cfec2e1/595b56b9N62f0f19c.jpg!q70.jpg',
];
let tabs = ['Top250','口碑榜','北美票房榜','新片榜'];
let type = ['top250','weekly','us_box','new_movies'];
export default class SeekMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectItemIndex:0,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <BTCarousel swiperHeight={150}
                            style={{marginTop:10}}
                            imageData={images}
                            autoScrollTimeInterval={1}
                            showPageControl={true}
                            dotColor={'blue'}
                            activeDotColor={'yellow'}
                            onScrollToIndex={(index)=> {

                            }}
                            onClickIndex={(index)=> {
                                alert(`你点击了${index+1}张图片`)
                            }}
                />
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar/> }
                    tabBarUnderlineStyle={{
                        backgroundColor: 'red',
                        height: 2
                    }}
                    tabBarBackgroundColor='#FFFFFF'
                    tabBarActiveTextColor='red'
                    tabBarInactiveTextColor='gray'
                    tabBarTextStyle={{fontSize: 15}}
                >
                    {
                        tabs.map((value, index) => {
                            return (
                                <View tabLabel={value}
                                      key={index}
                                      style={{marginTop:5}}>
                                    <SeekMoviesList type={type[index]}/>
                                </View>
                            )
                        })
                    }
                </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    cycleImage: {
        height:150,
        resizeMode:'stretch',
    }
})