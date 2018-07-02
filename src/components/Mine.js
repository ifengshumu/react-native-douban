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
} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import LoginView from './LoginView';

export default class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
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
                    <View tabLabel='密码登录' style={{marginTop:5}}>
                        <LoginView/>
                    </View>
                    <View tabLabel='短信登录' style={{marginTop:5}}>
                        <LoginView isNeedVerifyCode={true}/>
                    </View>
                </ScrollableTabView>
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