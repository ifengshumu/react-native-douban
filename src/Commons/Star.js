/**
 * Created by leezhihua on 2018/6/22
 * @flow
 * */
'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Star extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    renderStars = () => {
        const {value, showRate, width, height} = this.props;
        const results = [];
        let flag = true;
        if (value <= 0) {
            return <Text style={styles.smallFont}>暂无评分</Text>;
        }
        let star = [];
        if (typeof(value) === 'number') {
            star = value.toFixed(1).toString().split('.');
        } else  {
            star = value.split('.');
        }
        for (let i = 1; i < 6; i++) {
            if (star[0] < 2) {
                if (flag) {
                    flag = false;
                    results.push(<Icon key={i} name={'ios-star-half'} size={18} color={'rgb(255,183,18)'}/>)
                    // results.push(<Image key={i} style={{width: width, height: height}}
                    //                     source={require('../img/star-half.png')}/>);
                } else {
                    results.push(<Icon key={i} name={'ios-star-outline'} size={18} color={'rgb(255,183,18)'}/>)
                    // results.push(<Image key={i} style={{width: width, height: height}}
                    //                     source={require('../img/star-empty.png')}/>);
                }
            } else  {
                if (i*2 <= star[0]) {
                    results.push(<Icon key={i} name={'ios-star'} size={18} color={'rgb(255,183,18)'}/>)
                    // results.push(<Image key={i} style={{width: width, height: height}}
                    //                     source={require('../img/star-full.png')}/>);
                } else {
                    if (flag && (star[1] >= 5 || star[0] % 2 >= 1)) {
                        flag = false;
                        results.push(<Icon key={i} name={'ios-star-half'} size={18} color={'rgb(255,183,18)'}/>)
                        // results.push(<Image key={i} style={{width: width, height: height}}
                        //                     source={require('../img/star-half.png')}/>);
                    } else {
                        results.push(<Icon key={i} name={'ios-star-outline'} size={18} color={'rgb(255,183,18)'}/>)
                        // results.push(<Image key={i} style={{width: width, height: height}}
                        //                     source={require('../img/star-empty.png')}/>);
                    }
                }
            }
        }
        showRate && results.push(<Text key={100} style={styles.rating}>{value}</Text>)
        return results;

    }

    render() {
        return (
            <View style={[styles.star, this.props.style]}>
                {this.renderStars()}
            </View>
        );
    }
}

Star.defaultProps = {
    value: 0,
    width: 12,
    height: 12
};
Star.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    showRate:PropTypes.bool,
};

const styles = StyleSheet.create({
    smallFont: {
        lineHeight: 20,
        color: '#A6A6A6',
        fontSize: 12
    },
    star: {
        marginRight: 2,
        flexDirection: 'row',
        alignItems:'center',
    },
    rating: {
        marginLeft:5,
        color: '#A6A6A6',
        fontSize: 15
    }
})
