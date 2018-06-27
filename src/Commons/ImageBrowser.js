/**
 * Created by leezhihua on 2018/6/26
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
import  ImageViewer from 'react-native-image-zoom-viewer'

export default class ImageBrowser extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageViewer
                    imageUrls={this.props.images} // 照片路径
                    enableImageZoom={true} // 是否开启手势缩放
                    index={this.props.index} // 初始显示第几张
                    failImageSource={this.props.placeholderImage} // 加载失败图片
                    onChange={this.props.onchange} // 图片切换时触发
                    onClick={() => { // 图片单击事件
                        Actions.pop();
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})