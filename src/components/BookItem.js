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
} from 'react-native';

export default class BookItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let props = this.props.item;
        return (
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
                        <Text style={styles.content}>价格：{props.price}</Text>
                        :
                        <Text style={styles.content}>价格：免费</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:10,
        backgroundColor: 'rgb(237,241,238)',
    },
    image: {
        width:(SCREEN_WIDTH-40)/2,
        height:280,
        borderRadius:10,
    },
    title: {
        width:(SCREEN_WIDTH-40)/2,
        marginTop:10,
        fontSize:15,
        fontWeight:'bold',
        color:'black',
    },
    content: {
        width:(SCREEN_WIDTH-40)/2,
        marginTop:5,
        fontSize:13,
        color:'gray',
    },

})