'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import withMaterialTheme from './styles/withMaterialTheme';
import * as colors from './styles/colors';
import * as typo from './styles/typo';
import {largePrimaryTextShade} from './styles/wcag';

class Avatar extends PureComponent {
	static defaultProps = {
		size: 40,
		color: colors.grey500,
	};

	render() {
		const {
			style,
			size,
			color,
			image,
			icon,
			text,
			textColor: textColorOverride,
		} = this.props;

		if ( typeof image === 'string' ) throw new TypeError('image must be a react element, not a string');
		if ( typeof icon === 'string' ) throw new TypeError('icon must be a react element, not a string');

		const borderRadius = size / 2;
		const textColor = textColorOverride || largePrimaryTextShade(color);

		let avatar;

		if ( image ) {
			avatar = React.cloneElement(image, {
				style: {
					width: size,
					height: size,
					borderRadius,
				},
			});
		} else if ( icon ) {
			avatar = React.cloneElement(icon, {
				color: textColor,
				size: 0.6 * size,
			});
		} else if ( text ) {
			// Standard text size is 18dp in a 40dp avatar, use that to calculate the text size for this avatar size
			const textHeight = (18/40) * size;
			// A font size of 18dp actually results in avatar text about 13db high, so calculate the font size with that adjustment
			const fontSize = (18/13) * textHeight;

			avatar = (
				<Text
					suppressHighlighting
					numberOfLines={1}
					style={[
						styles.text,
						{
							color: textColor,
							fontSize,
						}
					]}>
					{text}
				</Text>
			);
		}

		if ( !avatar ) {
			return null;
		}

		return (
			<View
				style={[
					style,
					styles.container,
					{
						width: size,
						height: size,
						borderRadius,
					},
					!image && {backgroundColor: color}
				]}>
				{avatar}
			</View>
		);
	}
}

export default withMaterialTheme(Avatar);

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		...typo.fontLight,
		textAlign: 'center',
		textAlignVertical: 'center',
		includeFontPadding: false,
	},
});
