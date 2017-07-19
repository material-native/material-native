'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {
	Home,
	Colors,
	Typography,
	Icons,
	Ripples,
	Buttons,
	Toggles,
	TextFields,
	Avatars,
} from './screens';
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
	Ripples: {
		screen: Ripples,
	},
	Buttons: {
		screen: Buttons,
	},
	Toggles: {
		screen: Toggles,
	},
	TextFields: {
		screen: TextFields,
	},
	Avatars: {
		screen: Avatars,
	},
}, {
	initialRouteName: 'Home',
	navigationOptions: ({navigationOptions}) => ({
		headerTintColor: shades.light.primaryText,
		...navigationOptions,
		headerStyle: {
			backgroundColor: theme.appBar.background,
			...navigationOptions.headerStyle,
		},
	}),
});
