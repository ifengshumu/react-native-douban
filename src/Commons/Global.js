/**
 * Created by leezhihua on 2018/6/25
 * @flow
 * */
'use strict';

import React from 'react';

import {Actions} from 'react-native-router-flux';

import { Dimensions, PixelRatio, Platform} from 'react-native';

import BTStorage from './BTStorage';

import BTFetch from './BTFetch';

// 通过系统API获得屏幕宽高
let { height, width } = Dimensions.get('window');

// 系统是iOS
global.iOS = (Platform.OS === 'ios');
// 系统是安卓
global.Android = (Platform.OS === 'android');
// 获取屏幕宽度
global.SCREEN_WIDTH = width;
// 获取屏幕高度
global.SCREEN_HEIGHT = height;
// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get();
// router跳转的方法
global.Actions = Actions;
//存储
BTStorage.initStorage();
global.BTStorage = BTStorage;
global.BTFetch = BTFetch;