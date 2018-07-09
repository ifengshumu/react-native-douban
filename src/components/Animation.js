/**
 * Created by leezhihua on 2018/7/9
 * @flow
 * */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Animated,
    Easing,
} from 'react-native';

export default class Animation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinValue:new Animated.Value(0),
            translateValue:new Animated.ValueXY({x:-SCREEN_WIDTH,y:0})
        };
    }

    componentDidMount() {
        this.spin();
        // this.translate();
    }
    spin = ()=> {
        this.state.spinValue.setValue(0)
        Animated.timing(
            this.state.spinValue,
            {
                toValue:1,
                duration:4000,
                easing:Easing.linear
            }
        ).start(()=>this.spin())
    }

    render() {
        //旋转-将0-1数值转换为0deg-360deg角度，旋转Image
        const rotate = this.state.spinValue.interpolate({//使用插值函数做值映射
            inputRange:[0,1],
            outputRange:['0deg','360deg']
        })
        //缩放
        const scale = this.state.spinValue.interpolate({
            inputRange:[0,1],
            outputRange:[0.5,1]
        })
        return (
            <View style={styles.container}>
                <Animated.Image
                    style={{width:227, height:200,transform:[{rotate:rotate},{scale:scale}]}}
                    source={{uri:'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems:'center',
        paddingTop:10,
    },
})