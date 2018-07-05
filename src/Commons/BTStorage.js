/**
 * Created by leezhihua on 2018/6/29
 * @flow
 *
 * */
'use strict';

import React, {Component} from 'react';
import {
    AsyncStorage
} from 'react-native';
import Storage from 'react-native-storage';
import BTStorageSync from './BTStorageSync';


let storage;

export default class BTStorage extends Component {
    static initStorage() {
         if (storage === undefined) {
             storage = new Storage({
                 // 最大容量，默认值1000条数据循环存储
                 size: 1000,
                 // 存储引擎，如果不指定则数据只会保存在内存中，重启后即丢失
                 storageBackend: AsyncStorage,
                 // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
                 defaultExpires: null,
                 // 读写时在内存中缓存数据。默认启用。
                 enableCache: true,
                 // 如果storage中没有相应数据，或数据已过期，则会调用相应的sync方法，无缝返回最新数据。
                 // 你可以在构造函数这里就写好sync的方法；或是写到另一个文件里，进行导入
                 // 或是在任何时候，直接对storage.sync进行赋值修改
                 sync: BTStorageSync
             })
         }
         return storage;
    }

    static isInit(){
        if(storage === undefined){
            throw "请先调用initStorage()进行初始化";
        }
    }

    /**
     * 存储数据
     * @key：保存的key值,相当于数据库的表名
     * @id：数据id,相当于主键
     * @object：保存的value
     * @expires：有效时间，
     * */
    static saveEntry(key,id,object,expiress) {
        this.isInit();
        storage.save({
            key:key,
            id:id,
            data:object,
            expires:expiress?expiress:null,
        })
    }

    /**
     * 查询数据
     * @key：查询的key值,相当于数据库的表名
     * @id：数据id,相当于主键
     * @params 无数据时sync的参数
     * @callBack 回调callBack(data,error)
     * */
    static loadEntry(key,id,params,callBack) {
        this.isInit();
        storage.load({
            key: key,
            id:id,
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true,
            // 你还可以给sync方法传递额外的参数
            syncParams:{fetchOptions:params},
        }).then(data => {
            callBack(data,null);
        }).catch(err => {
            callBack(null,err);
            // 如果没有找到数据且没有sync方法，或者有其他异常，则在catch中返回
            console.warn(JSON.stringify(err));
        });
    }

    /**
     * 移除数据
     * @key：要移除的key值,相当于数据库的表名
     * @id：数据id,相当于主键
     * */
    static removeEntry(key,id){
        this.isInit();
        storage.remove({
            key: key,
            id:id
        });
    }


    /**
     * 存储数据
     * */
    static save(key,object,expiress) {
        this.saveEntry(key,undefined,object,expiress);
    }

    /**
     * 查询数据
     * */
    static load(key,callBack){
        this.loadEntry(key,undefined,null,callBack);
    }

    /**
     * 移除数据
     * */
    static remove(key){
        this.removeEntry(key,undefined);
    }



    /**
     * 查询key下所有数据
     * @key：查询key
     * */
    static loadAll(key,callBack){
        this.isInit();
        storage.getAllDataForKey(key)
            .then(data=>{
            callBack(callBack,null);
        })
            .catch(err=>{
                callBack(null,err);
            })
    }

    /**
     * 移除key下所有数据
     * @key：要移除的key
     * */
    static removeAll(key){
        this.isInit();
        storage.clearMapForKey(key);
    }







}

