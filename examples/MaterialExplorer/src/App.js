'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Home, Colors, Typography, Icons} from './screens';
import {colors, shades, getMaterialTheme, ThemeProvider} from './material-native';

const theme = getMaterialTheme({
	theme: 'light',
	primary: colors.blue500,
	darkPrimary: colors.blue700,
});

export default class App extends PureComponent {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<View style={styles.root}>
					<StatusBar
						backgroundColor={theme.statusBar.background}
						barStyle={theme.statusBar.barStyle} />
					<Navigator />
				</View>
			</ThemeProvider>
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
			backgroundColor: theme.palette.appBar,
			...navigationOptions.headerStyle,
		},
	}),
});
