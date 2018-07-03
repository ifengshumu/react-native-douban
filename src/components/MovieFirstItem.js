/**
 * Created by leezhihua on 2018/6/22
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
import BTButton from '../Commons/BTButton';


export default class MovieFirstItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let props = this.props.item;
        let type = this.props.type;
        return (
            <TouchableHighlight onPress={()=>Actions.MovieDetail({'id':props.id})}
                                underlayColor={'yellow'}>
                <View style={styles.container}>
                    <Image
                        source={{uri:props.images.large}}
                        style={styles.imageStyle}
                    />
                    <View style={{flex:3}}>
                        <Text style={styles.titleStyle}>{props.title}</Text>
                        <Star style={{marginTop:5}} value={props.rating.average} showRate={true}/>
                        <Text style={styles.contentStyle}>导演：{props.directors.map((v)=>v.name).join('/')}</Text>
                        <Text style={styles.contentStyle}>主演：{props.casts.map((v)=>v.name).join('/')}</Text>
                        <Text style={styles.bottomStyle}>{`${props.collect_count}人${type===0?'看过':'想看'}`}</Text>
                    </View>
                    {
                        type !== 2 &&
                        <View style={styles.ticketStyle}>
                            <BTButton
                                style={styles.ticketBtnStyle}
                                title={type===0?'购票':'想看'}
                            />
                        </View>
                    }
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        backgroundColor: 'white',
    },
    imageStyle: {
        flex:1,
        width:80,
        height:100,
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
    ticketStyle: {
        flex:1,
        justifyContent:'center',
    },
    ticketBtnStyle: {
        height:30,
        borderRadius:5,
        borderWidth:1,
        borderColor:'red',
        marginLeft:5,
        marginRight:5,
    }

})