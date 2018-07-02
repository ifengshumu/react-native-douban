/**
 * Created by leezhihua on 2018/7/2
 * @flow
 * */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import PropTypes from 'prop-types';

export default class BTChekBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked:this.props.defaultChecked,
        };
    }

    pressCheckBox = ()=> {
        this.props.onChecked(!this.state.checked);
        this.setState({checked:!this.state.checked})
    }

    render() {
        let props = this.props;
        return (
            <View style={[props.style, {width:props.size, height:props.size}]}>
                <TouchableOpacity onPress={this.pressCheckBox}>
                    <Icon name={this.state.checked?'checkbox-marked-outline':'checkbox-blank-outline'} size={props.size}/>
                </TouchableOpacity>
            </View>
        )
    }
}

BTChekBox.propTypes = {
    style:PropTypes.any,
    size:PropTypes.number,
    defaultChecked:PropTypes.bool,
    onChecked:PropTypes.func,

}
BTChekBox.defaultProps = {
    size:20,
    defaultChecked:true,
}



const styles = StyleSheet.create({
    container: {

    },
})