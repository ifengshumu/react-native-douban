/**
 * Created by leezhihua on 2018/6/25
 * @flow
 * */
'use strict';

import React, {Component} from 'react';
import {
    View,
    Image,
    ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';

import Swiper from 'react-native-swiper';

export default class BTCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={[this.props.style, {height:this.props.swiperHeight}]}>
                <Swiper height = {this.props.swiperHeight}
                        loop={true}
                        autoplay={true}
                        autoplayTimeout={this.props.autoScrollTimeInterval}
                        showsPagination={this.props.showPageControl}
                        dotColor={this.props.dotColor}
                        activeDotColor={this.props.activeDotColor}
                        onIndexChanged={this.props.onScrollToIndex}
                        onTouchStart={(e, state, context)=>{this.props.onClickIndex(state.index)}}>
                    {
                        this.props.imageData.map((value, index) => {
                            return (
                                <Image style={{height: this.props.swiperHeight}}
                                       key = {index}
                                       resizeMode='stretch'
                                       source={{uri: value}}
                                />)
                        })
                    }
                </Swiper>
            </View>
        )
    }
}

BTCarousel.propTypes = {
    style: ViewPropTypes.style,
    imageData:PropTypes.array,
    swiperHeight: PropTypes.number.isRequired,
    autoScrollTimeInterval: PropTypes.number,
    showPageControl:PropTypes.bool,
    dotColor:PropTypes.string,
    activeDotColor:PropTypes.string,
    onScrollToIndex:PropTypes.func,
    onClickIndex:PropTypes.func,
}
