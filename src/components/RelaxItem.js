import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
    ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BTButton from '../Commons/BTButton';

export default class RelaxItem extends Component {
	// 构造
	  constructor(props) {
	    super(props);
	    // 初始状态
	    this.state = {};
	  }
	  render() {
	  	return (
	  		<View style={[styles.container, this.props.style]}>
			    <View style={styles.titleView}>
				    <Text style={styles.title}>{this.props.title}</Text>
                    <Icon name={this.props.image} size={40}/>
			    </View>
			    <View style={[styles.subTitleView, styles.rightLine]}>
                    <BTButton style={[styles.rightView, styles.bottomLine]}
                              title={this.props.firstSubTitle}
                              titleStyle={styles.subTitle}
                              onPress={()=>this.props.onClickItem(this.props.firstSubTitle,0)}
                    />
                    <BTButton style={styles.rightView}
                              title={this.props.secondSubTitle}
                              titleStyle={styles.subTitle}
                              onPress={()=>this.props.onClickItem(this.props.secondSubTitle,1)}
                    />
			    </View>
			    <View style={styles.subTitleView}>
                    <BTButton style={[styles.rightView, styles.bottomLine]}
                              title={this.props.thridSubTitle}
                              titleStyle={styles.subTitle}
                              onPress={()=>this.props.onClickItem(this.props.thridSubTitle,2)}
                    />
                    <BTButton style={styles.rightView}
                              title={this.props.fourthSubTitle}
                              titleStyle={styles.subTitle}
                              onPress={()=>this.props.onClickItem(this.props.fourthSubTitle,3)}
                    />
			    </View>
		    </View>
	    )
	  }

}

RelaxItem.propTypes = {
    style:ViewPropTypes.style,
    title:PropTypes.string,
    image:PropTypes.string,
    firstSubTitle:PropTypes.string,
    secondSubTitle:PropTypes.string,
    thridSubTitle:PropTypes.string,
    fourthSubTitle:PropTypes.string,
    onClickItem:PropTypes.func,
}


const styles = StyleSheet.create({
	container: {
		flex:1,
		flexDirection:'row',
        backgroundColor:'black',
	},
	titleView: {
		flex:1,
		marginTop:0,
		marginBottom:0,
		borderRightColor:'white',
		borderRightWidth:0.5,
        justifyContent:'center',
        alignItems:'center',
	},
	title: {
		fontSize:20,
        fontWeight:'bold'
    },
	subTitleView: {
		flex:1,
		marginTop:0,
		marginBottom:0,
	},
	rightLine: {
		borderRightColor:'white',
		borderRightWidth:0.5,
	},
	bottomLine: {
		borderBottomColor:'white',
		borderBottomWidth:0.5,
	},
	rightView: {
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	subTitle: {
		color:'white',
		fontSize:15,
		fontWeight:'bold',
	}


})