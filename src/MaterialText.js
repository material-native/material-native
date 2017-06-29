'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, Text} from 'react-native';
import withMaterialTheme from './styles/withMaterialTheme';
import * as typo from './styles/typo';
import shades from './styles/shades';

/**
 * Horizontal MaterialText line
 */
class MaterialText extends PureComponent {
	render() {
		const {
			materialTheme,
			style,
			// Typo class
			display4,
			display3,
			display2,
			display1,
			headline,
			title,
			subhead,
			body2,
			body1, // eslint-disable-line no-unused-vars
			caption,
			button,
			// Script size
			dense,
			tall,
			// Shade / color
			secondary,
			disabled,
			hint,
			color: colorOverride,
			// Theme
			dark,
			light,
			...textProps, // eslint-disable-line comma-dangle
		} = this.props;

		let typoClass, typoClasses, color;

		if ( dense ) typoClasses = typo.dense;
		else if ( tall ) typoClasses = typo.tall;
		else typoClasses = typo;

		if ( display4 ) typoClass = 'display4';
		else if ( display3 ) typoClass = 'display3';
		else if ( display2 ) typoClass = 'display2';
		else if ( display1 ) typoClass = 'display1';
		else if ( headline ) typoClass = 'headline';
		else if ( title ) typoClass = 'title';
		else if ( subhead ) typoClass = 'subhead';
		else if ( body2 ) typoClass = 'body2';
		else if ( caption ) typoClass = 'caption';
		else if ( button ) typoClass = 'button';
		else typoClass = 'body1';

		if ( colorOverride ) {
			color = colorOverride;
		} else if ( dark || light ) {
			const theme = dark ? 'dark' : 'light';
			if ( secondary ) color = shades[theme].secondaryText;
			else if ( disabled ) color = shades[theme].disabledText;
			else if ( hint ) color = shades[theme].hintText;
			else color = shades[theme].primaryText;
		} else {
			if ( secondary ) color = materialTheme.text.secondaryColor;
			else if ( disabled ) color = materialTheme.text.disabledColor;
			else if ( hint ) color = materialTheme.text.hintColor;
			else color = materialTheme.text.primaryColor;
		}

		return (
			<Text
				{...textProps}
				style={[
					{
						...typoClasses[typoClass],
						color,
					},
					style
				]} />
		);
	}
}

export default withMaterialTheme(MaterialText);
