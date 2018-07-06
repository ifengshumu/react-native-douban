/**
 * Created by leezhihua on 2018/7/5
 * @flow
 * */
'use strict';

import React from 'react';

let start = 0;
let citys = [];


const sync = {

    // sync里的方法的名字必须和所存数据的key完全相同，eg：citys()
    // 方法接受的参数为一整个object，所有参数从object中解构取出,如下：
    // let {resolve, reject, syncParams: {fetchOptions}} = params;
    // 请求需要的参数都在extraFetchOptions里
    // 调用resolve无缝返回结果或reject返回错误。


    //请求城市数据
    citys(params) {
        let {resolve, reject} = params;
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
                    this.citys(params);
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
                    BTStorage.save('citys', cityData);
                    resolve(cityData);
                }
            })
            .catch((error)=>{
                console.log('请求错误'+error);
                reject(error);
            });
    }
}

export default sync;