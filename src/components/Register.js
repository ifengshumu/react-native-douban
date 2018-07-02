import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
} from 'react-native';
import LoginInput from "../Commons/LoginInput";
import BTButton from '../Commons/BTButton';
import BTChekBox from '../Commons/BTChekBox';

export default class Register extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle:`${navigation.state.params.headerTitle}`,
    });
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            checked:true,
        };
    }

    render() {
        console.log(this.props.navTitle);
        return (
            <ScrollView style={styles.container}
                        keyboardDismissMode={'on-drag'}>
                <View>
                    <LoginInput style={styles.inputView}
                                image={'phone'}
                                placeholder='请输入手机号'
                                isNeedVerifyCode={true}
                                maxLength={11}
                    />
                    <LoginInput style={styles.inputView}
                                image={'comment'}
                                placeholder='请输入验证码'
                                maxLength={6}
                    />
                    <LoginInput style={styles.inputView}
                                image={'key'}
                                placeholder='请输入密码(6-16个字符)'
                                maxLength={16}
                                secureTextEntry={true}
                    />
                    <LoginInput style={styles.inputView}
                                image={'key'}
                                placeholder='请确认密码(6-16个字符)'
                                maxLength={16}
                                secureTextEntry={true}
                    />

                    <BTButton title={this.props.headerTitle === '注册账号' ? '注册' : '确定'}
                              style={styles.bottomBtn}
                              disabled={!this.state.checked}
                              diabledBackgroundColor={'gray'}
                              titleStyle={{fontSize: 30, color: '#fff'}}
                              onPress={()=>alert('登录')}
                    />
                    {
                        this.props.headerTitle === '注册账号'
                            ?
                            <View style={{flexDirection: 'row', alignItems:'center'}}>
                                <BTChekBox style={styles.checkbox}
                                           size={20}
                                           defaultChecked={true}
                                           onChecked={(checked)=>{
                                               this.setState({checked:checked})
                                           }}
                                />
                                <Text style={styles.regText}>
                                    我已阅读并同意备胎好车商家版《用户注册协议》
                                </Text>
                            </View>
                            :
                            null
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navBarTitle: {
        fontSize: 20,
        color: 'black',
    },
    bottomBtn: {
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
        height: 50,
        backgroundColor: '#ff7000',
        borderRadius: 25,
        borderColor: 'transparent',
    },
    checkbox: {
        marginTop: 10,
        marginLeft: 30,
    },
    regText: {
        marginTop: 10,
        marginLeft: 5,
        fontSize: 13,
        color: 'gray',
    }
});