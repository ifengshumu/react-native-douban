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
    TouchableHighlight,
} from 'react-native';
import Star from '../Commons/Star';

export default class SeekMoviesItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let props = this.props.item;
        let index = this.props.index;
        return (
            <View>
                <View style={styles.sortView}>
                    <View style={styles.leftLine}></View>
                    <Text style={styles.sort}>{index+1}</Text>
                    <View style={styles.rightLine}></View>
                </View>
                <TouchableHighlight onPress={()=>Actions.MovieDetail({'id':props.id})}
                                    underlayColor={'gray'}>
                    <View>
                        <View style={styles.movieContnet}>
                            <Image
                                source={{uri:props.images.large}}
                                style={styles.imageStyle}
                            />
                            <View style={{flex:3}}>
                                <Text style={styles.titleStyle}>{props.title}</Text>
                                <Star style={{marginTop:5}} value={props.rating.average}/>
                                <Text style={styles.contentStyle}>导演：{props.directors.map((v)=>v.name).join('/')}</Text>
                                <Text style={styles.contentStyle}>主演：{props.casts.map((v)=>v.name).join('/')}</Text>
                            </View>
                        </View>
                        <Text style={styles.id}>影片ID:{props.id}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    sortView: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    leftLine: {
        width:50,
        height:1,
        backgroundColor:'gray'
    },
    rightLine: {
        width:50,
        height:1,
        backgroundColor:'gray'
    },
    sort: {
        marginLeft:10,
        marginRight:10,
        color:'red',
        fontSize:15,
        fontWeight:'bold',
    },
    movieContnet:{
        margin:20,
        borderRadius:5,
        borderWidth:1,
        borderColor:'gray',
        flexDirection:'row',
    },
    imageStyle: {
        flex:1,
        width:80,
        height:110,
        margin:10,
    },
    titleStyle: {
        marginTop:5,
        fontSize:15,
        fontWeight:'bold',
        color:'black',
    },
    contentStyle: {
        marginTop:5,
        fontSize:13,
        color:'gray',
    },
    bottomStyle: {
        marginTop:5,
        fontSize:13,
        color:'black',
    },
    id: {
        marginTop:-10,
         marginLeft:20,
    }
})