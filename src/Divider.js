'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import withMaterialTheme from './styles/withMaterialTheme';
import shades from './styles/shades';

/**
 * Horizontal divider line
 */
class Divider extends PureComponent {
	static defaultProps = {
		inset: false,
	};

	render() {
		const {
			materialTheme,
			style,
			inset,
			dark,
			light,
		} = this.props;

		const color = dark || light
			? shades[dark ? 'dark' : 'light'].dividers
			: materialTheme.divider.color;

		return (
			<View
				style={[
					style,
					styles.line,
					inset && styles.inset,
					{
						backgroundColor: color,
					}
				]} />
		);
	}
}

export default withMaterialTheme(Divider);

const styles = StyleSheet.create({
	line: {
		height: 1,
	},
	inset: {
		marginLeft: 72,
	}
});
