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

export default class Star extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    renderStars = () => {
        const {value, width, height} = this.props;
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
                    results.push(<Image key={i} style={{width: width, height: height}}
                                        source={require('../img/star-half.png')}/>);
                } else {
                    results.push(<Image key={i} style={{width: width, height: height}}
                                        source={require('../img/star-empty.png')}/>);
                }
            } else  {
                if (i*2 <= star[0]) {
                    results.push(<Image key={i} style={{width: width, height: height}}
                                        source={require('../img/star-full.png')}/>);
                } else {
                    if (flag && star[1] >= 5) {
                        flag = false;
                        results.push(<Image key={i} style={{width: width, height: height}}
                                            source={require('../img/star-half.png')}/>);
                    } else {
                        results.push(<Image key={i} style={{width: width, height: height}}
                                            source={require('../img/star-empty.png')}/>);
                    }
                }
            }
        }
        return results;

    }

    render() {
        return (
            <View style={[{flexDirection: 'row'}, this.props.style]}>
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
    value: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
    smallFont: {
        lineHeight: 20,
        color: '#A6A6A6',
        fontSize: 12
    },
    star: {
        marginRight: 2,
    }
})
