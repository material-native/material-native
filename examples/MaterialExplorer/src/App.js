'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Home, Colors, Typography, Icons} from './screens';
import {colors, shades} from './material-native';

export default class App extends PureComponent {
	render() {
		return (
			<View style={styles.root}>
				<StatusBar
					barStyle="light-content" />
				<Navigator />
			</View>
		);
	}
}


const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
});

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
	Icons: {
		screen: Icons,
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
