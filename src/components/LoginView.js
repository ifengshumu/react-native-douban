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
    Button,
    TouchableOpacity
} from 'react-native';
import LoginInput from '../Commons/LoginInput';
import BTButton from '../Commons/BTButton';

export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getPhoneNumber = ()=> {

    }
    getVerifyCode = ()=> {

    }




    render() {
        return (
            <View>
                <LoginInput image={'phone'}
                            placeholder='请输入手机号'
                            maxLength={11}
                            secureTextEntry={false}
                            keyboardType={'phone-pad'}
                            onChangeText={this.getPhoneNumber}
                />
                {
                    this.props.isNeedVerifyCode ?
                        <View>
                            <LoginInput image={'comment'}
                                        placeholder='请输入验证码'
                                        isNeedVerifyCode={true}
                                        onGetVerifyCode={this.getVerifyCode}
                                        maxLength={6}
                                        secureTextEntry={false}
                            />
                        </View>
                        :
                        <View>
                            <LoginInput image={'key'}
                                        placeholder='请输入密码'
                                        maxLength={18}
                                        secureTextEntry={true}
                            />
                            <View style={{alignItems:'flex-end'}}>
                                <BTButton style={styles.forgetpwdBtn}
                                          title={'忘记密码?'}
                                          titleStyle={styles.forgetpwd}
                                          onPress={()=>{}}
                                />
                            </View>
                        </View>
                }
                <BTButton title='登录'
                          style={styles.loginBtn}
                          titleStyle={styles.login}
                          onPress={()=>alert('登录')}
                />
                <View style={styles.regbtnView}>
                    <BTButton title={'注册账号'}
                              titleStyle={[styles.forgetpwd, styles.regtitle]}
                    />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    forgetpwdBtn: {
        margin:10,
        height:30,
    },
    forgetpwd: {
        color:'#ff7000',
        fontSize:15,
        margin:5,
        textDecorationLine:'underline'
    },
    loginBtn: {
        margin:50,
        height:50,
        backgroundColor:'#ff7000',
        borderRadius:25,
        borderColor:'transparent',
    },
    login: {
        fontSize:30,
        color:'white',
    },
    regbtnView: {
        alignItems:'center',
        height:40,
    },
    regtitle: {
        fontSize:20,
    }
})