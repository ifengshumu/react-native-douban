import React from 'react';
import {StyleSheet} from 'react-native';
import {
	Scene,
	Router,
	Tabs,
	Modal,
} from 'react-native-router-flux'
import TabIcon from './TabIcon';

import Movie from '../components/Movie';
import MovieSearch from '../components/MovieSearch';
import MovieDetail from '../components/MovieDetail';
import CityList from '../components/CityList';
import ImageBrowser from './ImageBrowser';

import Search from '../components/Search';
import SearchMusicDetail from "../components/SearchMusicDetail";
import SearchBookDetail from '../components/SearchBookDetail';

import Relax from '../components/Relax';

import Mine from '../components/Mine';
import Register from '../components/Register';
import Animation from '../components/Animation';

export default BTRouter = () => (
	<Router>
		<Modal>
            <Tabs
                key="tabBar"        // 唯一标识
                wrap={true}         // 自动使用自己的导航栏包装每个场景
                showLabel={false}   // 显示文字
                tabBarStyle={styles.tabBarStyle} // tabBar的样式
                swipeEnabled={false}// 是否可以滑动
                headerMode='screen' // 页面切换方式
                icon={TabIcon}      // 自定义Icon显示方式
                lazy={true}         // 是否默认渲染tabbar
                tabBarPosition={'bottom'}// tabbar在顶部还是底部，iOS默认底部，安卓默认顶部
                activeTintColor='red'       // 选中tabbar图标的颜色
                inactiveTintColor='gray'// 未选中tabbar图标的颜色
                // activeBackgroundColor='white'   // 选中tabbar的背景色
                // inactiveBackgroundColor='white' // 未选中tabbar的背景色
            >
                <Scene key="Movie"
                       title='电影'
                       image={'film'}
                       component={Movie}
                       hideNavBar
                />
                <Scene key="Search"
                       title='搜索'
                       image={'search'}
                       component={Search}
                       hideNavBar
                />
                <Scene key="Relax"
                       title='休闲'
                       image={'suitcase'}
                       component={Relax}
                />
                <Scene key="Mine"
                       title='我的'
                       image={'user'}
                       component={Mine}
                       hideNavBar
                />
            </Tabs>
			<Scene
				key="MovieSearch"
				component={MovieSearch}
				gesturesEnabled={true}
				// backButtonImage={Images.Back}
				hideNavBar
				onExit={() => console.log('onExit')}
				onLeft={Actions.pop}
			/>
            <Scene
                key="MovieDetail"
                title='电影'
                component={MovieDetail}
                gesturesEnabled={true}
                onLeft={Actions.pop}
                backButtonTintColor={'white'}
            />
            <Scene
                key="ImageBrowser"
                component={ImageBrowser}
                gesturesEnabled={true}
                hideNavBar
                onLeft={Actions.pop}
            />
            <Scene
                key="SearchMusicDetail"
                title='音乐'
                component={SearchMusicDetail}
                gesturesEnabled={true}
                backButtonTintColor={'red'}
                onLeft={Actions.pop}
            />
            <Scene
                key="SearchBookDetail"
                title='图书'
                component={SearchBookDetail}
                gesturesEnabled={true}
                backButtonTintColor={'red'}
                onLeft={Actions.pop}
            />
            <Scene
                key="CityList"
                title='城市'
                component={CityList}
                gesturesEnabled={true}
                backButtonTintColor={'red'}
                onLeft={Actions.pop}
            />
            <Scene
                key="Register"
                component={Register}
                gesturesEnabled={true}
                backButtonTintColor={'red'}
                onLeft={Actions.pop}
            />
            <Scene
                key="Animation"
                title='动画'
                component={Animation}
                gesturesEnabled={true}
                backButtonTintColor={'red'}
                onLeft={Actions.pop}
            />
		</Modal>
	</Router>
);
const styles = StyleSheet.create({
	tabBarStyle: {
		backgroundColor: '#eee',
		height:49,
	},
});