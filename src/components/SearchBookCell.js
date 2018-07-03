/**
 * Created by leezhihua on 2018/6/29
 * @flow
 * */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';

export default class SearchBookCell extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let props = this.props.item;
        return (
            <TouchableHighlight onPress={()=>Actions.SearchBookDetail({data:props,headerTitle:props.title})} underlayColor={'transparent'}>
                <View style={styles.container}>
                    <Image style={styles.image} source={{uri:props.image}}/>
                    <Text style={styles.title}>{props.title}</Text>
                    {/*作者*/}
                    {
                        props.author && props.author.length
                            ?
                            <Text style={styles.content}>作者：{props.author.map((v)=>v).join('/')}</Text>
                            :
                            <Text style={styles.content}>作者：未知</Text>
                    }
                    {/*出版社*/}
                    {
                        props.publisher
                            ?
                            <Text style={styles.content}>出版社：{props.publisher}</Text>
                            :
                            <Text style={styles.content}>出版社：无</Text>
                    }
                    {/*价格*/}
                    {
                        props.publisher
                            ?
                            <Text style={styles.content}>价格：￥{props.price}</Text>
                            :
                            <Text style={styles.content}>价格：免费</Text>
                    }
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginRight:10,
        marginTop:10,
        marginBottom:10,
        width:(SCREEN_WIDTH-30)/2,
        backgroundColor: 'rgb(237,241,238)',
    },
    image: {
        height:280,
    },
    title: {
        margin:5,
        fontSize:15,
        fontWeight:'bold',
        color:'black',
    },
    content: {
        margin:5,
        fontSize:13,
        color:'gray',
    },

})