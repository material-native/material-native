'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {colors, shades, typo, RectRipple, CircleRipple, BorderlessRipple} from '../material-native';

export default class Ripples extends PureComponent {
	static navigationOptions = {
		title: 'Ripples',
	};

	render() {
		return (
			<ScrollView style={styles.root} contentContainerStyle={styles.container}>
				<Text style={styles.subhead}>Rect</Text>
				<RectRipple style={styles.rect}>
					<Text style={styles.text}>Press me</Text>
				</RectRipple>
				<RectRipple style={styles.rect} onLongPress={() => {}}>
					<Text style={styles.text}>Long press me</Text>
				</RectRipple>
				<Text style={styles.subhead}>Circle</Text>
				<CircleRipple style={styles.circle} />
				<Text style={styles.subhead}>Borderless</Text>
				<BorderlessRipple style={styles.rect}>
					<Text style={styles.text}>Press me</Text>
				</BorderlessRipple>
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
		// paddingVertical: 8,
		paddingHorizontal: 8,
	},
	subhead: {
		...typo.subhead,
		color: shades.dark.primaryText,
		paddingHorizontal: 8,
		paddingVertical: 16,
		flexDirection: 'row',
	},
	text: {
		...typo.body1,
		color: shades.dark.primaryText,
	},
	rect: {
		height: 48,
		paddingHorizontal: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},
	circle: {
		height: 48,
		width: 48,
		borderRadius: 48/2,
		backgroundColor: colors.pink500,
		alignSelf: 'flex-start',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
