import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
    TextInput,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginInput extends Component {
	// 构造
	  constructor(props) {
	    super(props);
	    // 初始状态
	    this.state = {
	    	foucus:false
	    };
	  }
	  render() {
	      let props = this.props;
		  return (
			  <View style={styles.inputView}>
                  <Icon name={props.image}
                        size={20}
                        color={this.state.foucus?'red':'gray'}
                        style={{marginLeft:5}}/>
                  <TextInput style={styles.input}
                             placeholder={this.props.placeholder}
                             secureTextEntry={this.props.secureTextEntry}
                             onChangeText={this.props.onChangeText}
                             onFocus={()=>{
                                 this.setState({foucus:true})
                                 props.onFocus
                             }}
                             onBlur={()=>{
                                 this.setState({foucus:false})
                                 props.onBlur
                             }}
                             keyboardType={props.keyboardType}
                             maxLength={this.props.maxLength}
                             clearButtonMode={'while-editing'}
                             // clearTextOnFocus={true}
                  />
				  {
					  props.isNeedVerifyCode ?
						  <TouchableOpacity onPress={props.onGetVerifyCode}
						                    style={{marginRight:10}}
						  >
							  <Text style={styles.verifyCode}>获取验证码</Text>
						  </TouchableOpacity>
						  :null
				  }
			  </View>
		  )
	  }
}

const styles = StyleSheet.create({
	inputView: {
		height:50,
		marginTop:20,
		marginLeft:10,
		borderBottomColor:'#d1d1d1',
		borderBottomWidth:1,
		flexDirection:'row',
        alignItems:'center',
		// justifyContent:'space-between',
	},
	input: {
		height:30,
		flex:1,
        marginLeft:10,
		backgroundColor:'transparent',
	},
	verifyCode:{
		fontSize:12,
		color:'#333',
	}
});