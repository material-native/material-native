'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {colors, shades, typo, MaterialText, Icon, RectRipple, CircleRipple, CircleHighlight, BorderlessRipple} from '../material-native';

export default class Ripples extends PureComponent {
	static navigationOptions = {
		title: 'Ripples',
	};

	render() {
		return (
			<ScrollView style={styles.root} contentContainerStyle={styles.container}>
				<MaterialText subhead secondary style={styles.subhead}>Rect</MaterialText>
				<RectRipple pointerEvents='box-only' style={styles.rect}>
					<MaterialText>Press me</MaterialText>
				</RectRipple>
				<RectRipple pointerEvents='box-only' style={styles.rect} onLongPress={() => {}}>
					<MaterialText>Long press me</MaterialText>
				</RectRipple>

				<MaterialText subhead secondary style={styles.subhead}>Circle</MaterialText>
				<CircleRipple pointerEvents='box-only' style={styles.circle}>
					<Icon light name='touch-app' />
				</CircleRipple>

				<MaterialText subhead secondary style={styles.subhead}>Circle Highlight</MaterialText>
				<CircleHighlight pointerEvents='box-only' style={styles.circleHighlight}>
					<Icon name='touch-app' />
				</CircleHighlight>

				<MaterialText subhead secondary style={styles.subhead}>Borderless</MaterialText>
				<BorderlessRipple pointerEvents='box-only' style={styles.rect}>
					<MaterialText>Press me</MaterialText>
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
		paddingHorizontal: 8,
		paddingVertical: 16,
		flexDirection: 'row',
	},
	rect: {
		height: 48,
		paddingHorizontal: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},
	circle: {
		height: 56,
		width: 56,
		borderRadius: 56/2,
		backgroundColor: colors.pink500,
		alignSelf: 'flex-start',
		alignItems: 'center',
		justifyContent: 'center',
	},
	circleHighlight: {
		height: 48,
		width: 48,
		borderRadius: 48/2,
		alignSelf: 'flex-start',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
