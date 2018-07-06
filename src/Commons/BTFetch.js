/**
 * Created by leezhihua on 2018/7/6
 * @flow
 * */
'use strict';

import React, {Component} from 'react';

export default class BTFetch extends Component {
    // noinspection JSAnnotator
    static fetchURL(url,method,params,resolve,reject) {
        let body = null;
        for (let key in params) {
            if (method === 'POST') {
                body = new FormData();
                body.append(key,params[key]);
            } else {
                url = url + '?';
                url += key + '=' + params[key] + '&';
                url.substr(url.length-1,1);
            }
        }

        let formData = {
            method:method,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            //如果要设置超时需要在fetch.js的fetch函数里加上如下代码
            // if(init!=null&&init.timeout!=null) {
            //     xhr.timeout=init.timeout;
            // }
            timeout:1000*30,//30s超时
            body:body,
        };
        fetch(url, formData)
            .then((response)=>response.json())
            .then((responseJson)=>resolve(responseJson))
            .catch((error)=>reject(error))

    }
    static fetchGET(url,params) {
        return new Promise((resolve, reject) => this.fetchURL(url,'GET',params,resolve,reject))
    }

    static fetchPOST(url,params) {
        return new Promise((resolve, reject) => this.fetchURL(url,'POST',params,resolve, reject))
    }
}
