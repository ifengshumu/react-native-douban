import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
} from 'react-native';

import LoginInput from "../Commons/LoginInput";

export default  class RegisterViewController extends Component {
	// 构造
	  constructor(props) {
	    super(props);
	    // 初始状态
	    this.state = {};
	  }

	render() {
		return (
			<View style={styles.container}>
				<NavigationBar title={this.props.titleText}
				               titleStyle={styles.navBarTitle}
				               style={{height:64, backgroundColor:'white'}}
				               statusBarStyle={'default'}
				               rightView={
					               <TouchableOpacity onPress={()=>Actions.pop()}>
						               <Text style={{marginRight:10, fontSize:15}}>关闭</Text>
					               </TouchableOpacity>
				               }
				               leftView={
					               <TouchableOpacity onPress={()=>Actions.pop()}>
						               <Image
							               source={global.Images.Back}
							               style={{width:15, height:20, marginLeft:10}}
						               />
					               </TouchableOpacity>
				               }
				/>
				<View style={{marginTop:64}}>
					<LoginInput style={styles.inputView}
								image={global.Images.Phone}
								foucusImage={global.Images.Phone_A}
					            placeholder='请输入手机号'
					            isNeedVerifyCode={true}
					            getVerifyCode={()=>{

					            }}
					            maxLength={11}
					/>
					<LoginInput style={styles.inputView}
								image={global.Images.PCode}
								foucusImage={global.Images.PCode_A}
					            placeholder='请输入验证码'
					            maxLength={6}
					/>
					<LoginInput style={styles.inputView}
								image={global.Images.PWD}
								foucusImage={global.Images.PWD_A}
					            placeholder='请输入密码(6-16个字符)'
					            maxLength={16}
					            secureTextEntry={true}
					/>
					<Button title={this.props.titleText==='注册账号'?'注册':'确定'}
					        style={styles.bottomBtn}
					        titleStyle={{fontSize:30, color:'#fff'}}
					/>
					{
						this.props.titleText === '注册账号'
							?
							<View style={{flexDirection:'row'}}>
								<Checkbox style={styles.checkbox}
								          defaultChecked={true}
								          checkedIcon={global.Images.Check}
								          uncheckedIcon={global.Images.UnCheck}
								/>
								<Text style={styles.regText}>
									我已阅读并同意备胎好车商家版《用户注册协议》
								</Text>
							</View>
							:
							null
					}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	navBarTitle: {
		fontSize:20,
		color:'black',
	},
	bottomBtn: {
		marginTop:50,
		marginLeft:10,
		marginRight:10,
		height:50,
		backgroundColor:'#ff7000',
		borderRadius:25,
		borderColor:'transparent',
	},
	checkbox: {
		marginTop:15,
		marginLeft:30,
		width:15,
		height:15,
	},
	regText: {
		marginTop:15,
		marginLeft:5,
		fontSize:13,
		color:'gray',
	}
});