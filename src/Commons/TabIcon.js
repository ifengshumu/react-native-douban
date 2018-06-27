import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


let TabIcon = (props) => {
    return (
        <View style={styles.container}>
            <Icon name={props.image}
                  size={20}
                  color={props.tintColor}
                  style={styles.imageStyle}/>
            <Text style={[styles.textStyle, {color:props.tintColor}]}>
                {props.title}
            </Text>
        </View>
    )
};

export default TabIcon;


const styles = StyleSheet.create({
	container: {
		flex: 1,
        alignItems:'center',
        justifyContent:'center',
	},
    imageStyle: {
        marginTop:5,
    },
    textStyle: {
        marginTop:5,
        fontSize:15,
    }
})