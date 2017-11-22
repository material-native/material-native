'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import withMaterialTheme from './styles/withMaterialTheme';
import {withMeasurementForwarding} from './util';
import * as typo from './styles/typo';
import shades from './styles/shades';

/**
 * Section heading
 */
class Subheader extends PureComponent {
	static defaultProps = {
		inset: false,
		lines: 1,
	};

	render() {
		const {
			materialTheme,
			style,
			textStyle,
			inset,
			text,
			lines,
			secondary,
			color: colorOverride,
			dark,
			light,
			...textProps
		} = this.props;

		let color;
		if ( colorOverride ) {
			color = colorOverride;
		} else if ( dark || light ) {
			const theme = dark ? 'dark' : 'light';
			if ( secondary ) color = shades[theme].secondaryText;
			else color = shades[theme].primaryText;
		} else {
			if ( secondary ) color = materialTheme.text.secondaryColor;
			else color = materialTheme.text.primaryColor;
		}

		return (
			<View
				ref={this._setMeasureRef}
				style={[
					styles.container,
					inset && styles.inset,
					style,
					styles.containerOverrides
				]}>
				<Text
					{...textProps}
					numberOfLines={lines}
					style={[
						styles.text,
						textStyle,
						{color}
					]}>
					{text}
				</Text>
			</View>
		);
	}
}

export default withMaterialTheme(withMeasurementForwarding(Subheader));

const styles = StyleSheet.create({
	container: {
		height: 48,
		paddingHorizontal: 16,
	},
	containerOverrides: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	inset: {
		paddingRight: 16,
		paddingLeft: 72,
	},
	text: {
		...typo.fontMedium,
		fontSize: 14,
	},
});
