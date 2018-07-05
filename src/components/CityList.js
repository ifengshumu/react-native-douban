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
    TouchableHighlight,
    SectionList,
    ActivityIndicator,
} from 'react-native';

let start = 0;
let citys = [];
export default class CityList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            citys:[]
        };
    }

    componentDidMount() {
        BTStorage.load('citys',(object,error)=>{
            if (object) {
                this.setState({citys:object, loading:false});
            } else {
                console.log('城市数据取出错误'+error);
            }
        })
    }

    //返回区头视图
    renderSection = (info) => {
        return (
            <View style={[styles.center, {backgroundColor:'orange'}]}>
                <Text style={styles.header}>{info.section.key}</Text>
            </View>
        )
    }
    //返回cell
    renderItem = (info) => {
        return (
            <TouchableHighlight onPress={()=>Actions.pop({refresh:({'city':info.item.name})})} underlayColor={'yellow'}>
                <View style={styles.center}>
                    <Text style={styles.item}>{info.item.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }
    //分隔线
    renderSeparator = () => (
        <View style={{ height:1, backgroundColor:'gray',opacity:0.3 }}></View>
    );
    //唯一标识key
    renderExtractor = (item,index)=> {
        return index.toString();
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.loading
                        ? <ActivityIndicator size='large' color={'purple'} style={{marginTop:100}} />
                        :<SectionList
                            sections={this.state.citys}
                            renderSectionHeader={this.renderSection}
                            renderItem={this.renderItem}
                            ItemSeparatorComponent={this.renderSeparator}
                            keyExtractor = {this.renderExtractor}
                        />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    center: {
        justifyContent:'center',
    },
    header: {
        flex:1,
        marginLeft:20,
        height: 50,
        color: 'white',
        fontSize: 30
    },
    item: {
        margin:20,
        backgroundColor: "#ffffff",
        color: '#5C5C5C',
        fontSize: 20,
    },

})