'use strict';
import React, {PureComponent} from 'react';
import {View, StatusBar} from 'react-native';
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
	Dialogs,
} from './screens';
import {colors, withMaterialStyles, shades, getMaterialTheme, ThemeProvider} from './material-native';

const theme = getMaterialTheme({
	theme: 'light',
	primary: colors.blue500,
	darkPrimary: colors.blue700,
});

class App extends PureComponent {
	render() {
		const {materialStyles} = this.props;

		return (
			<ThemeProvider theme={theme}>
				<View style={materialStyles.root}>
					<StatusBar
						backgroundColor={theme.statusBar.background}
						barStyle={theme.statusBar.barStyle} />
					<Navigator />
				</View>
			</ThemeProvider>
		);
	}
}

export default withMaterialStyles((materialTheme) => ({
	root: {
		flex: 1,
		backgroundColor: materialTheme.palette.background,
	},
}))(App);

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
	Dialogs: {
		screen: Dialogs,
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
