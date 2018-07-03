/**
 * Created by leezhihua on 2018/6/28
 * @flow
 * */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    WebView,
} from 'react-native';

export default class SearchMusicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.loading
                        ?
                        <ActivityIndicator size='large' color={'purple'} style={{marginTop:100}}/>
                        :
                        <WebView
                            source={{uri: this.props.url}}
                            scalesPageToFit={true}
                            bounces={true}
                            onLoadEnd={()=>this.setState({loading:false})}
                        />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})