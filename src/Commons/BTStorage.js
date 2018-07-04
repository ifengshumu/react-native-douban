/**
 * Created by leezhihua on 2018/6/29
 * @flow
 * */
'use strict';

import React, {Component} from 'react';
import {
    AsyncStorage
} from 'react-native';
import Storage from 'react-native-storage';

let storage;
const defaultExpires = 1000*3600*24;

export default class BTStorage extends Component {
    static initStorage() {
         if (storage == undefined) {
             storage = new Storage({
                 // 最大容量，默认值1000条数据循环存储
                 size: 1000,
                 // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
                 // 如果不指定则数据只会保存在内存中，重启后即丢失
                 storageBackend: AsyncStorage,
                 // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
                 defaultExpires: defaultExpires,

                 // 读写时在内存中缓存数据。默认启用。
                 enableCache: true,
                 // 如果storage中没有相应数据，或数据已过期，
                 // 则会调用相应的sync方法，无缝返回最新数据。
                 // sync方法的具体说明会在后文提到
                 // 你可以在构造函数这里就写好sync的方法
                 // 或是写到另一个文件里，这里require引入
                 // 或是在任何时候，直接对storage.sync进行赋值修改
                 sync: this.sysncData() // 这个sync文件是要自己写
             })
         }
         return storage;
    }


    static sysncData() {

    }


    static isInit(){
        if(storage==undefined){
            throw "请先调用initStorage()进行初始化";
        }
    }

    /**
     key:保存的key值
     object：保存的value
     */
    static save(key,object) {
        this.isInit();
        storage.save({
            key:key,
            data:object,
            expires:defaultExpires
        })
    }
    /**
     key:保存的key值
     object：保存的value
     expires：有效时间，
     */
    static save(key,object,expiress) {
        this.isInit();
        console.log(key,object);
        storage.save({
            key:key,
            data:object,
            expires:expiress,
        })
    }

    /**
     key:移除的key值
     */
    static remove(key){
        this.isInit();
        storage.remove({
            key: key,
        });
    }

    /**
     key:移除全部
     移除所有"key-id"数据（但会保留只有key的数据）
     */
    static removeAll(){
        this.isInit();
        storage.clearMap();
    }


    /**
     查询数据
     */
    static load(key,callBack){
        this.loadSync(key,null,null,callBack);
    }

    static loadSync(key,params,someFlag,callBack){
        this.isInit();
        storage.load({
            key: key,
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true,
            // 你还可以给sync方法传递额外的参数
            syncParams:{ params, someFlag: someFlag},
        }).then(object => {
            callBack(object);
        }).catch(err => {
            callBack(null);
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            // console.warn(err.message);
            // switch (err.name) {
            //     case 'NotFoundError':
            //         // TODO;
            //         break;
            //     case 'ExpiredError':
            //         // TODO
            //         break;
            // }
        });
    }


}

