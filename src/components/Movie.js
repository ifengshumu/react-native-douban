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
    DeviceEventEmitter
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import BTSearchBar from '../Commons/BTSearchBar';
import MovieFirstList from './MovieFirstList';
import MovieSecondList from './MovieSecondList';

let tabs = ['正在热映', '即将上映', 'Top250', '口碑榜', '北美票房榜', '新片榜'];
let type = ['in_theaters', 'coming_soon', 'top250', 'weekly', 'us_box', 'new_movies'];
export default class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '杭州'
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.city) {
            this.setState({city: nextProps.city})
            DeviceEventEmitter.emit('citychange', nextProps.city);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <BTSearchBar
                    showCity={true}
                    city={this.state.city}
                    placeholder={'搜索电影名、演员名'}
                    onLocation={() => {
                        Actions.CityList();
                    }}
                    onSearch={() => Actions.MovieSearch()}
                />
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar/>}
                    page={0}
                    tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
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
                                      style={{marginTop: 5}}>
                                    {
                                        index < 2
                                            ?
                                            <MovieFirstList type={type[index]}/>
                                            :
                                            <MovieSecondList type={type[index]}/>
                                    }
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
        paddingTop: 25,
    },
    tabBarUnderlineStyle: {
        backgroundColor: 'red',
        height: 2,
    }
})