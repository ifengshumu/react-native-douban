/**
 * Created by leezhihua on 2018/6/28
 * @flow
 * */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
} from 'react-native';
import Star from '../Commons/Star';

export default class SearchMusicCell extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let props = this.props.item;
        return (
            <TouchableHighlight onPress={()=>Actions.SearchMusicDetail({url:props.mobile_link})} underlayColor={'rgb(239,218,181)'}>
                <View style={styles.container}>
                    <Image
                        source={{uri:props.image}}
                        resizeMode={'stretch'}
                        style={styles.image}
                    />
                    <View style={{flex:3}}>
                        <Text style={styles.title}>{props.title}</Text>
                        {/*演唱者*/}
                        {
                            props.author && props.author.length
                                ?
                                <Text style={styles.content}>演唱者：{props.author.map((v)=>v.name).join('/')}</Text>
                                :
                                <Text style={styles.content}>演唱者：未知</Text>
                        }
                        {/*标签*/}
                        {
                            props.tags && props.tags.length
                                ?
                                <Text style={styles.content}>标签：{props.tags.map((v)=>v.name).join('/')}</Text>
                                :
                                <Text style={styles.content}>标签：无</Text>
                        }
                    </View>
                    <View style={styles.rate}>
                        <Text>豆瓣评分</Text>
                        <Text style={{marginTop:5}}>{props.rating.average}</Text>
                        <Star style={{marginTop:5}} value={props.rating.average}/>
                        <Text style={{marginTop:5}}>{props.rating.numRaters}人评价</Text>
                    </View>
                </View>
            </TouchableHighlight>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        backgroundColor: 'rgb(237,241,238)',
    },
    image: {
        flex:1.5,
        height:150,
        margin:10,
        borderRadius:10,
    },
    title: {
        marginTop:5,
        fontSize:15,
        fontWeight:'bold',
        color:'black',
    },
    content: {
        marginTop:5,
        fontSize:13,
        color:'gray',
    },
    rate: {
        flex: 1,
        marginTop: 30,
        marginBottom:30,
        marginLeft:5,
        marginRight: 5,
        borderRadius: 10,
        shadowRadius: 5,
        shadowColor: 'gray',
        shadowOffset: {width: 15, height: 15},
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
})