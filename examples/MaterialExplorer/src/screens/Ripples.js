'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {colors, withMaterialStyles, MaterialText, Subheader, Icon, RectRipple, CircleRipple, CircleHighlight, BorderlessRipple} from '../material-native';

class Ripples extends PureComponent {
	static navigationOptions = {
		title: 'Ripples',
	};

	render() {
		const {materialStyles} = this.props;

		return (
			<ScrollView style={materialStyles.root} contentContainerStyle={styles.container}>
				<Subheader
					style={styles.subhead}
					secondary
					text='Rect' />
				<RectRipple pointerEvents='box-only' style={styles.rect}>
					<MaterialText>Press me</MaterialText>
				</RectRipple>
				<RectRipple pointerEvents='box-only' style={styles.rect} onLongPress={() => {}}>
					<MaterialText>Long press me</MaterialText>
				</RectRipple>

				<Subheader
					style={styles.subhead}
					secondary
					text='Circle' />
				<CircleRipple pointerEvents='box-only' style={styles.circle}>
					<Icon light name='touch-app' />
				</CircleRipple>

				<Subheader
					style={styles.subhead}
					secondary
					text='Circle' />
				<CircleHighlight pointerEvents='box-only' style={styles.circleHighlight}>
					<Icon name='touch-app' />
				</CircleHighlight>

				<Subheader
					style={styles.subhead}
					secondary
					text='Borderless' />
				<BorderlessRipple pointerEvents='box-only' style={styles.rect}>
					<MaterialText>Press me</MaterialText>
				</BorderlessRipple>
			</ScrollView>
		);
	}
}

export default withMaterialStyles((materialTheme) => ({
	root: {
		flex: 1,
		backgroundColor: materialTheme.palette.container,
	},
}))(Ripples);

const styles = StyleSheet.create({
	container: {
		// paddingVertical: 8,
		paddingHorizontal: 8,
	},
	subhead: {
		paddingHorizontal: 8,
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
