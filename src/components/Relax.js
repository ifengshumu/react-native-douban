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
    ScrollView
} from 'react-native';
import BTCarousel from '../Commons/BTCarousel';
import RelaxItem from './RelaxItem';

let bannerImages = [
    'https://img13.360buyimg.com/da/jfs/t5575/308/4215648119/104001/4c2ab0ee/5949e860Nece99102.jpg',
    'https://img1.360buyimg.com/da/jfs/t6307/99/1563752093/86633/5412833d/59536981N52b023fe.jpg',
    'https://m.360buyimg.com/mobilecms/s720x322_jfs/t5584/79/5196470758/139932/a1884201/595b53ddN56b7d1d0.jpg!q70.jpg',
    'https://img12.360buyimg.com/da/jfs/t5599/172/4238994500/103343/e2fa3cc7/5949e93aN5f43ed41.jpg',
    'https://m.360buyimg.com/mobilecms/s720x322_jfs/t6427/336/1988125013/110199/4cfec2e1/595b56b9N62f0f19c.jpg!q70.jpg',
    'https://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
    'https://images3.c-ctrip.com/rk/apph5/C1/201505/app_home_ad49_640_128.png',
    'https://images3.c-ctrip.com/rk/apph5/D1/201506/app_home_ad05_640_128.jpg'
];

let bgcolors = [];
let titles = ['衣','食','住','行'];
let images = ['tshirt-crew','food-fork-drink','hotel','airplane']
let first = ['服装','大餐','海外','火车'];
let second = ['名牌','小吃','公寓','汽车'];
let thrid = ['箱包','周边','客栈','飞机'];
let fourth = ['特价','特产','团购.特惠','自驾.专车'];

export default class Relax extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectItemIndex:0,
        };
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <BTCarousel swiperHeight={150}
                            style={{marginTop:10}}
                            imageData={bannerImages}
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

                {
                    titles.map((value, index) => {
                        return (
                            <RelaxItem style={[styles.item, {backgroundColor:`#${Math.floor(Math.random()*0xffffff).toString(16)}`}]}
                                       key={index}
                                       title={value}
                                       image={images[index]}
                                       firstSubTitle={first[index]}
                                       secondSubTitle={second[index]}
                                       thridSubTitle={thrid[index]}
                                       fourthSubTitle={fourth[index]}
                                       onClickItem={(t,i)=>{
                                           alert(i+t);
                                        }}
                            />
                        )
                    })
                }
            </ScrollView>
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
    },
    item: {
        margin:10,
        height:85,
        borderRadius:5,
    },
})