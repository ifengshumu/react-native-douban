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
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform,
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
        let RNButton = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback;
        if (posi === 'top' || posi === 'left') {
            //图片、文字
            if (hasAll) {
                return (
                    <RNButton style={this.props.style}
                              underlayColor={this.props.underlayColor}
                              onLongPress={this.props.onLongPress}
                              onPress={this.props.onPress}>
                        {
                            this.renderTopOrLeftImageButton()
                        }
                    </RNButton>
                )
            } else {
                return this.renderSingle()
            }
        } else {
            //图片、文字
            if (hasAll) {
                return (
                    <RNButton style={this.props.style}
                              underlayColor={this.props.underlayColor}
                              onLongPress={this.props.onLongPress}
                              onPress={this.props.onPress}>
                        {
                            this.renderRightOrBottomImageButton()
                        }
                    </RNButton>
                )
            } else {
                return this.renderSingle()
            }
        }
    }

    renderSingle = ()=> {
        let RNButton = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback;
        //只有图片
        if (this.props.image && !this.props.title) {
            return (
                <RNButton style={this.props.style}
                          underlayColor={this.props.underlayColor}
                          onLongPress={this.props.onLongPress}
                          onPress={this.props.onPress}>
                    <View style={styles.container}>
                        <Image style={this.props.imageStyle}
                               source={{uri: this.props.image}}
                        />
                    </View>
                </RNButton>
            )
        }
        //只有文字
        if (!this.props.image && this.props.title) {
            return (
                <RNButton style={this.props.style}
                          underlayColor={this.props.underlayColor}
                          onLongPress={this.props.onLongPress}
                          onPress={this.props.onPress}>
                    <View style={styles.container}>
                        <Text style={this.props.titleStyle}>{this.props.title}</Text>
                    </View>
                </RNButton>
            )
        }
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
    style:PropTypes.any,
    imageStyle:PropTypes.any,
    titleStyle:PropTypes.any,
    onPress:PropTypes.func,
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