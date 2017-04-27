'use strict';
import React, {PureComponent} from 'react';
import {StackNavigator} from 'react-navigation';
import {Home, Colors, Typography} from './screens';
import {colors, shades} from './material-native';

export default class App extends PureComponent {
	render() {
		return (
			<Navigator />
		);
	}
}

const Navigator = StackNavigator({
	Home: {
		screen: Home,
	},
	Colors: {
		screen: Colors,
	},
	Typography: {
		screen: Typography,
	},
}, {
	initialRouteName: 'Home',
	navigationOptions: ({navigationOptions}) => ({
		headerTintColor: shades.light.primaryText,
		...navigationOptions,
		headerStyle: {
			backgroundColor: colors.blue500,
			...navigationOptions.headerStyle,
		},
	}),
});
