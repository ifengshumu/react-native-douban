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
    TouchableOpacity,
    TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class BTSearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText:''
        };
    }
    render() {
        return (
            <View style={styles.header}>
                //定位
                {
                    this.props.showCity &&
                    <TouchableOpacity style={styles.cityStyle}
                                      onPress={this.props.onLocation}>
                        <Text>
                            {`${this.props.city} `}
                            <Icon name="chevron-down"
                                  size={15}
                                  color="gray"/>
                        </Text>
                    </TouchableOpacity>
                }
                //搜索框
                {
                    this.props.enableSearchInput ?
                        <View style={styles.inputView}>
                            <View style={styles.input}>
                                <Icon style={styles.searchIcon}
                                      name="search"
                                      size={15}
                                      color="#8B8B8B"/>
                                <TextInput
                                    style={{flex:8}}
                                    placeholder={this.props.placeholder}
                                    placeholderTextColor={'#8B8B8B'}
                                    onChangeText={this.props.onSearch}
                                    underlineColorAndroid="transparent"
                                    clearButtonMode={'while-editing'}
                                    // enablesReturnKeyAutomatically={true}
                                    // returnKeyType='search'
                                    autoFocus={true}/>
                            </View>
                            {
                                this.props.showCancel &&
                                <TouchableOpacity style={styles.cancel}
                                                  onPress={this.props.onCancelSearch}>
                                    <Text style={{color:'#73B582',fontSize:18}}>取消</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        :
                        <TouchableOpacity style={styles.searchStyle}
                                          onPress={this.props.onSearch}>
                            <Text style={styles.searchTextStyle}>
                                <Icon name="search"
                                      size={15}
                                      color="#8B8B8B"/>
                                {` ${this.props.placeholder}`}
                            </Text>
                        </TouchableOpacity>
                }
            </View>
        )
    }
}


BTSearchBar.propTypes = {
    showCity:PropTypes.bool,
    showCancel:PropTypes.bool,
    enableSearchInput:PropTypes.bool,
    city:PropTypes.string,
    onLocation:PropTypes.func,
    onSearch:PropTypes.func,
    onCancelSearch:PropTypes.func,
    placeholder:PropTypes.string,
}
BTSearchBar.defaultProps = {
    showCity:false,
    showCancel:false,
    enableSearchInput:false,
}


const styles = StyleSheet.create({
    header: {
        height: 35,
        flexDirection:'row',
        paddingLeft:10,
        paddingRight:10,
        alignItems: 'center',
    },
    cityStyle: {
        flex:1.5,
        height:30,
        marginRight:8,
        justifyContent:'center',
        alignItems:'center',
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
        backgroundColor: '#F5F5F5',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        borderRadius: 5,
        flex: 6,
    },
    searchIcon: {
        marginLeft: 10,
        marginRight: 10
    },
    cancel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchStyle: {
        backgroundColor: '#F5F5F5',
        flex:6,
        height:30,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
    },
    searchTextStyle: {
        textAlign: 'center',
        lineHeight: 25,
        color: '#8B8B8B',
        fontSize:15,
    },
});
