/**
 * Created by leezhihua on 2018/7/1
 * @flow
 * */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
} from 'react-native';
import Star from '../Commons/Star';
import BTButton from '../Commons/BTButton';

export default class SearchBookDetail extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle:`${navigation.state.params.headerTitle}`,
    });
    constructor(props) {
        super(props);
        this.state = {
            introNum: 2,
        };
    }

    render() {
        let data = this.props.data;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.imageView}>
                    <Image style={{width: 270, height: 385}} source={{uri: data.images.small}}/>
                </View>
                <View>
                    {/*作者*/}
                    {
                        data.author && data.author.length
                            ?
                            <Text style={styles.content}>作者：{data.author.map((v)=>v).join('/')}</Text>
                            :
                            <Text style={styles.content}>作者：未知</Text>
                    }
                    {/*原作名*/}
                    {
                        data.origin_title && <Text style={styles.content}>原作名：{data.origin_title}</Text>
                    }
                    {/*译者*/}
                    {
                        (data.translator && data.translator.length) &&
                        <Text style={styles.content}>译者：{data.translator.map((v)=>v).join('/')}</Text>
                    }
                    {/*出版社*/}
                    {
                        data.publisher &&
                            <Text style={styles.content}>出版社：{data.publisher}</Text>
                    }
                    {/*出版日期*/}
                    {
                        data.pubdate &&
                        <Text style={styles.content}>出版日期：{data.pubdate}</Text>
                    }
                    {/*页数*/}
                    {
                        data.pages &&
                        <Text style={styles.content}>页数：{data.pages}</Text>
                    }
                    {/*价格*/}
                    {
                        data.price &&
                        <Text style={styles.content}>价格：￥{data.price}</Text>
                    }
                    {/*评分*/}
                    {
                        data.rating.average &&
                        <View style={{flexDirection: 'row',alignItems:'center'}}>
                            <Text style={styles.content}>评分：</Text>
                            <Star value={data.rating.average} showRate={true}/>
                        </View>
                    }
                </View>
                <View style={styles.line}/>
                <View style={{margin: 10}}>
                    <Text style={styles.subTitle}>内容简介</Text>
                    <Text style={{marginTop: 5}} numberOfLines={this.state.introNum}
                          ellipsizeMode={'tail'}>{data.summary}</Text>
                    {this.state.introNum != 0 &&
                    <View style={styles.foldup}>
                        <BTButton style={{height:20}}
                                   title={'展开'}
                                   titleStyle={{color:'green'}}
                                   onPress={() => this.setState({introNum: 0})}/>
                    </View>
                    }
                </View>
                <View style={{margin: 10}}>
                    <Text style={styles.subTitle}>作者简介</Text>
                    <Text style={{marginTop: 5}} numberOfLines={0}>{data.author_intro}</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageView: {
        backgroundColor: '#2A362C',
        height: 430,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        margin:5,
        fontSize:15,
        color:'gray',
    },
    line: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        height: 1,
        backgroundColor: 'gray',
        opacity: 0.3
    },
    subTitle: {
        fontSize:15,
        fontWeight:'bold',
        color:'black',
    },
    foldup: {
        alignItems: 'flex-end',
        marginTop:-18,
        marginRight:-5
    },
    actorV: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
    author:{
        width:40,
        height:40,
        borderRadius:20,
        flex:1,
    },
    reviewV: {
        margin:10,
        flex:8,
    },
    reviewCount: {
        position:'absolute',
        right:0,
        color:'#9B9B9B',

    },
})