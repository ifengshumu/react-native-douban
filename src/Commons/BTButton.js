/**
 * Created by leezhihua on 2018/6/13
 *
 * */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

export default class BTButton extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    render() {
        return this.layoutViews();
    }
    layoutViews = ()=> {
        let posi = this.props.imagePosition;
        let hasAll = this.props.image && this.props.title;
        let RNButton = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
        //图片、文字
        if (hasAll) {
            return (
                <RNButton style={[this.props.style, this.props.disabled && {backgroundColor:this.props.diabledBackgroundColor}]}
                          disabled={this.props.disabled}
                          onPress={this.props.onPress}>
                    {
                        posi === 'top' || posi === 'left'
                            ? this.renderTopOrLeftImageButton()
                            : this.renderRightOrBottomImageButton()
                    }
                </RNButton>
            )
        } else {
            return this.renderSingle()
        }
    }

    //只有图片or只有文字
    renderSingle = ()=> {
        let RNButton = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
        return (
            <RNButton style={[this.props.style, this.props.disabled && {backgroundColor:this.props.diabledBackgroundColor}]}
                      disabled={this.props.disabled}
                      onPress={this.props.onPress}>
                <View style={styles.container}>
                    {
                        this.props.image && !this.props.title
                            ?
                            <Image style={this.props.imageStyle}
                                   source={{uri: this.props.image}}/>
                            :
                            <Text style={this.props.titleStyle}>{this.props.title}</Text>
                    }
                </View>
            </RNButton>
        )
    }

    //上图下文 or 左图右文
    renderTopOrLeftImageButton = ()=> {
        return (
            <View style={[styles.container, this.props.imagePosition==='left' && styles.rowStyle]}>
                <Image style={this.props.imageStyle}
                       source={{uri: this.props.image}}
                />
                <Text style={this.props.titleStyle}>{this.props.title}</Text>
            </View>
        )
    }
    //左文右图 or 上文下图
    renderRightOrBottomImageButton = ()=> {
        return (
            <View style={[styles.container, this.props.imagePosition==='right' && styles.rowStyle]}>
                <Text style={this.props.titleStyle}>{this.props.title}</Text>
                <Image style={this.props.imageStyle}
                       source={{uri: this.props.image}}
                />
            </View>
        )
    }
}
BTButton.propTypes = {
    imagePosition:PropTypes.oneOf('top','right','bottom','left'),
    image:PropTypes.string,
    title:PropTypes.string,
    diabledBackgroundColor:PropTypes.string,
    style:ViewPropTypes.style,
    imageStyle:Image.propTypes.style,
    titleStyle:Text.propTypes.style,
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',

    },
    rowStyle: {
        flexDirection:'row',
    }
})