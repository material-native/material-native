'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {colors, shades, typo} from '../material-native';

export default class Typography extends PureComponent {
	static navigationOptions = {
		title: 'Typography',
	};

	render() {
		return (
			<ScrollView style={styles.root} contentContainerStyle={styles.container}>
				<View style={styles.typoRow}>
					<Text style={styles.display4} numberOfLines={1}>Disp. 4</Text>
				</View>
				<View style={styles.typoRow}>
					<Text style={styles.display3} numberOfLines={1}>Display 3</Text>
				</View>
				<View style={styles.typoRow}>
					<Text style={styles.display2} numberOfLines={1}>Display 2</Text>
				</View>
				<View style={styles.typoRow}>
					<Text style={styles.display1} numberOfLines={1}>Display 1</Text>
				</View>
				<View style={styles.typoRow}>
					<Text style={styles.headline} numberOfLines={1}>Headline</Text>
				</View>
				<View style={styles.typoRow}>
					<Text style={styles.title} numberOfLines={1}>Title</Text>
				</View>
				<View style={styles.typoRow}>
					<Text style={styles.subhead} numberOfLines={1}>Subhead</Text>
				</View>
				<View style={styles.typoRow}>
					<Text style={styles.body2} numberOfLines={1}>Body 2</Text>
				</View>
				<View style={styles.typoRow}>
					<Text style={styles.body1} numberOfLines={1}>Body 1</Text>
				</View>
				<View style={styles.typoRow}>
					<Text style={styles.caption} numberOfLines={1}>Caption</Text>
				</View>
				<View style={styles.typoRow}>
					<Text style={styles.button} numberOfLines={1}>Button</Text>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colors.white,
	},
	container: {
		paddingVertical: 8,
	},
	typoRow: {
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
	display4: {
		...typo.display4,
		color: shades.dark.primaryText,
	},
	display3: {
		...typo.display3,
		color: shades.dark.primaryText,
	},
	display2: {
		...typo.display2,
		color: shades.dark.primaryText,
	},
	display1: {
		...typo.display1,
		color: shades.dark.primaryText,
	},
	headline: {
		...typo.headline,
		color: shades.dark.primaryText,
	},
	title: {
		...typo.title,
		color: shades.dark.primaryText,
	},
	subhead: {
		...typo.subhead,
		color: shades.dark.primaryText,
	},
	body2: {
		...typo.body2,
		color: shades.dark.primaryText,
	},
	body1: {
		...typo.body1,
		color: shades.dark.primaryText,
	},
	caption: {
		...typo.caption,
		color: shades.dark.primaryText,
	},
	button: {
		...typo.button,
		color: shades.dark.primaryText,
	},
});
