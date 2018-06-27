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
    Button,
    ActivityIndicator,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import Video from 'react-native-video'
import Star from '../Commons/Star';
import BTButton from '../Commons/BTButton';

let host = 'https://api.douban.com/v2/movie/subject';
let images = [];
export default class MovieDetail extends Component {
    static navigationOptions = ({navigation}) => ({
        headerRight: <Button color='white' title="分享" onPress={() => alert('点击了分享')}/>,
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#2A362C',
            opacity: 1,
        }
    });

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isLoading: true,
            introNum: 2,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillUnmount() {
        images=[];
    }


    //请求数据
    fetchData = () => {
        let formData = new FormData();
        formData.append('apikey', '0b2bdeda43b5688921839c8ecb20399b')
        formData.append('city', '北京')
        formData.append('client', 'something')
        let url = `${host}/${this.props.id}`;
        console.log(url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                res.photos.map((v,i) =>images.push({url:v.image}))
                this.setState({data: res, isLoading: false})
            }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        let data = this.state.data;
        return (
            this.state.isLoading
                ?
                <ActivityIndicator size='large' style={{marginTop: 200}}/>
                :
                <ScrollView style={styles.container}>
                    <View style={styles.imageV}>
                        <Image style={{width: 270, height: 405}} source={{uri: data.images.large}}/>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 2, marginLeft: 10}}>
                            <Text style={styles.titleStyle}>{data.title}</Text>
                            <Text
                                style={styles.contentStyle}>{data.year}/{data.countries.map((v) => v).join('/')}/{data.genres.map((v) => v).join('/')}</Text>
                            <Text style={styles.contentStyle}>上映时间：{data.pubdate}(中国大陆)</Text>
                            <Text style={styles.contentStyle}>片长：{data.durations[0]}</Text>
                        </View>
                        <View style={styles.rateV}>
                            <Text>豆瓣评分</Text>
                            <Text>{data.rating.average}</Text>
                            <Star value={data.rating.average}/>
                            <Text>{data.ratings_count}人</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <BTButton style={styles.twobtn} title={'想看'} titleStyle={styles.twobtnTitle}/>
                        <BTButton style={styles.twobtn} title={'看过'} titleStyle={styles.twobtnTitle}/>
                    </View>
                    <View style={styles.line}/>
                    <View style={{margin: 10}}>
                        <Text style={styles.subTitle}>剧情简介</Text>
                        <Text style={{marginTop: 5}} numberOfLines={this.state.introNum}
                              ellipsizeMode={'tail'}>{data.summary}</Text>
                        {this.state.introNum != 0 &&
                        <BTButton style={styles.foldup}
                                  title={'展开'}
                                  titleStyle={{color:'green'}}
                                  onPress={() => this.setState({introNum: 0})}/>
                        }
                    </View>
                    <Text style={[styles.subTitle, {marginLeft:10}]}>演员</Text>
                    <ScrollView style={{marginTop:10}}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                        {
                            data.casts.map((v,i) => {
                                return (
                                    <View style={styles.actorV} key={i}>
                                        <Image style={{width: 80, height: 100}} source={{uri: v.avatars.large}}/>
                                        <Text style={{fontSize: 10, marginTop:5}}>{v.name}</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                    <Text style={[styles.subTitle, {margin:10}]}>剧照</Text>
                    <ScrollView horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                        {
                            data.photos.map((v,i) => {
                            return (
                            <View style={styles.actorV} key={i}>
                                <TouchableHighlight onPress={()=>{Actions.ImageBrowser({images:images,index:i})}}>
                                    <Image style={{width: 240, height: 126}} resizeMode={'cover'} source={{uri: v.image}}/>
                                </TouchableHighlight>
                            </View>
                            )
                        })
                        }
                    </ScrollView>
                    <View style={styles.line}/>
                    <Text style={[styles.subTitle, {margin:10}]}>评论</Text>
                    {
                        data.popular_comments.map((v,i) => {
                            return (
                                <View style={{flexDirection:'row', marginTop:10}} key={i}>
                                    <Image style={styles.author} resizeMode={'stretch'} source={{uri:v.author.avatar}}/>
                                    <View style={styles.reviewV}>
                                        <View style={{flexDirection:'row', alignItems:'center'}}>
                                            <Text style={styles.subTitle}>{v.author.name}</Text>
                                            <Star style={{marginLeft:5}} value={v.rating.value}/>
                                            <Text style={styles.reviewCount}>👍{v.useful_count}</Text>
                                        </View>
                                        <Text style={{marginTop:5}}>{v.content}</Text>
                                        <Text style={{marginTop:5}}>{v.created_at}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                    {
                        data.popular_reviews.map((v,i) => {
                            return (
                                <View style={{flexDirection:'row', marginTop:10}} key={i}>
                                    <Image style={styles.author} resizeMode={'stretch'} source={{uri:v.author.avatar}}/>
                                    <View style={styles.reviewV}>
                                        <View style={{flexDirection:'row', alignItems:'center'}}>
                                            <Text style={styles.subTitle}>{v.author.name}</Text>
                                            <Star style={{marginLeft:5}} value={v.rating.value}/>
                                            <Text style={styles.reviewCount}>👍{i*111}</Text>
                                        </View>
                                        <Text style={{marginTop:5}}>{v.summary}</Text>
                                        <Text style={{marginTop:5}}>{i+1}分钟前</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(237,241,238)',
        marginBottom:20,
    },
    imageV: {
        backgroundColor: '#2A362C',
        height: 430,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleStyle: {
        marginTop: 5,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    contentStyle: {
        marginTop: 5,
        fontSize: 13,
        color: 'gray',
    },
    rateV: {
        flex: 1,
        marginTop: 10,
        marginRight: 10,
        borderRadius: 10,
        shadowRadius: 5,
        shadowColor: 'gray',
        shadowOffset: {width: 5, height: 5},
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    twobtn: {
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        borderRadius: 10,
        borderColor: 'rgb(239,218,181)',
        borderWidth: 1,
        height: 35,
    },
    twobtnTitle: {
        color: 'rgb(239,218,181)',
        fontSize: 15,
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
        marginTop: 5,
        width:30,
        height:20,
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