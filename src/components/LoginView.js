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
    TouchableOpacity,
    Modal,
} from 'react-native';
import LoginInput from '../Commons/LoginInput';
import BTButton from '../Commons/BTButton';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone:'',
            password:'',
            verifyCode:'',
            show:false,
        };
    }

    getPhoneNumber = (text)=> {
        this.setState({phone:text});
    }
    getPassword = (text)=> {
        this.setState({password:text});
    }


    requestVerifyCode = ()=> {

    }
    getVerifyCode = (text)=> {
        this.setState({verifyCode:text});
    }
    loginAction = ()=> {
        if (this.props.isNeedVerifyCode) {
            if (this.state.phone.length && this.state.verifyCode) {
                console.log('调用登录API');
            } else {
                alert(!this.state.phone.length?'请输入手机号':'请输入验证码');
            }
        } else {
            if (this.state.phone.length && this.state.password) {
                console.log('调用登录API');
            } else {
                alert(!this.state.phone.length?'请输入手机号':'请输入密码');
            }
        }
    }

    showTips = ()=> {
        this.setState({show:!this.state.show})
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
                                        onGetVerifyCode={this.requestVerifyCode}
                                        maxLength={6}
                                        secureTextEntry={false}
                                        keyboardType={'number-pad'}
                                        onChangeText={this.getVerifyCode}
                            />
                        </View>
                        :
                        <View>
                            <LoginInput image={'key'}
                                        placeholder='请输入密码'
                                        maxLength={18}
                                        secureTextEntry={true}
                                        onChangeText={this.getPassword}
                            />
                            <View style={{alignItems:'flex-end'}}>
                                <BTButton style={styles.forgetpwdBtn}
                                          title={'忘记密码?'}
                                          titleStyle={styles.forgetpwd}
                                          onPress={()=>Actions.Register({headerTitle:'修改密码'})}
                                />
                            </View>
                        </View>
                }
                <BTButton title='登录'
                          style={styles.loginBtn}
                          titleStyle={styles.login}
                          onPress={this.loginAction}
                />
                <View style={styles.regbtnView}>
                    <BTButton title={'注册账号'}
                              titleStyle={[styles.forgetpwd, styles.regtitle]}
                              onPress={()=>Actions.Register({headerTitle:'注册账号'})}
                    />
                </View>
                <BTButton style={[styles.loginBtn,{margin:10}]}
                          title={'动画'}
                          titleStyle={styles.login}
                          onPress={()=>Actions.Animation()}/>
                <TouchableOpacity
                    style={{alignItems:'center'}}
                    onPress={this.showTips}
                >
                    <Icon name={'question'} size={30}/>
                </TouchableOpacity>
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={this.state.show}
                    onShow={() => {}}
                    onRequestClose={() => {}} >
                    <View style={styles.modalStyle}>
                        <View style={styles.subView}>
                            <Text style={styles.titleText}>
                                提示
                            </Text>
                            <Text style={styles.contentText}>
                                Modal显示的View 多行了超出一行了会怎么显示，就像这样显示了很多内容该怎么显示，看看效果
                            </Text>
                            <View style={styles.horizontalLine} />
                            <View style={styles.buttonView}>
                                <TouchableOpacity underlayColor='transparent'
                                                  style={styles.buttonStyle}
                                                  onPress={this.showTips}>
                                    <Text style={styles.buttonText}>
                                        取消
                                    </Text>
                                </TouchableOpacity>
                                <View style={styles.verticalLine} />
                                <TouchableOpacity underlayColor='transparent'
                                                  style={styles.buttonStyle}
                                                  onPress={this.showTips}>
                                    <Text style={styles.buttonText}>
                                        确定
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
    },



    // modal的样式
    modalStyle: {
        // backgroundColor:'black',
        // opacity:0.2,
        alignItems: 'center',
        justifyContent:'center',
        flex:1,
    },
    // modal上子View的样式
    subView:{
        marginLeft:60,
        marginRight:60,
        backgroundColor:'white',
        opacity:1,
        alignSelf: 'stretch',
        justifyContent:'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor:'#ccc',
    },
    // 标题
    titleText:{
        marginTop:10,
        marginBottom:5,
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
    },
    // 内容
    contentText:{
        margin:8,
        fontSize:14,
        textAlign:'center',
    },
    // 水平的分割线
    horizontalLine:{
        marginTop:5,
        height:0.5,
        backgroundColor:'#ccc',
    },
    // 按钮
    buttonView:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonStyle:{
        flex:1,
        height:44,
        alignItems: 'center',
        justifyContent:'center',
    },
    // 竖直的分割线
    verticalLine:{
        width:0.5,
        height:44,
        backgroundColor:'#ccc',
    },
    buttonText:{
        fontSize:16,
        color:'#3393F2',
        textAlign:'center',
    },
})