'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, Text} from 'react-native';
import withMaterialTheme from '../styles/withMaterialTheme';
import {withMeasurementForwarding, filterProps, PRESS_HANDLERS, LAYOUT_PROPS} from '../util';
import RectRipple from '../touchable/RectRipple';
import elevation from '../styles/elevation';
import * as typo from '../styles/typo';
import {largePrimaryTextShade} from '../styles/contrast';

const defaultHitSlop = {
	top: 6, bottom: 6,
	left: 0, right: 0,
};

/**
 * Basic rounded rectangular Material Design buttons.
 * Handles both flat and raised button styles, but not special button types such as Floating Action Buttons.
 */
class Button extends PureComponent {
	static defaultProps = {
		disabled: false,
	};

	render() {
		const {
			materialTheme,
			disabled,
			text,
			hitSlop,
			accessibilityLabel,
			raised,
			solid: solidOverride,
			primary,
			accent,
			disabledColor: disabledColorOverride,
			tintColor: tintColorOverride,
			style,
			...props
		} = this.props;
		const [pressHandlers, layoutProps] = filterProps(props, PRESS_HANDLERS, LAYOUT_PROPS);

		let backgroundColor, color;
		if ( raised ) {
			const tintColor = (
				tintColorOverride
				|| (primary && materialTheme.button.tintColor)
				|| (accent && materialTheme.button.accentColor)
			);

			// Raised buttons default to solid when primary, accent, or custom tint colors are passed
			const solid = typeof solidOverride === 'boolean' ? solidOverride : !!tintColor;

			if ( solid ) {
				backgroundColor = (
					(disabled && materialTheme.button.disabledBackground)
					|| tintColor
					|| materialTheme.button.tintColor
				);
				color = disabled
					? materialTheme.button.disabledColor
					: largePrimaryTextShade(backgroundColor);
			} else {
				backgroundColor = (
					(disabled && materialTheme.button.disabledBackground)
					|| materialTheme.palette.container
				);
				color = disabled
					? materialTheme.button.disabledColor
					: tintColor || materialTheme.text.primaryColor;
			}
		} else {
			color = (
				(disabled && (disabledColorOverride || materialTheme.text.disabledColor))
				|| tintColorOverride
				|| (primary && materialTheme.button.tintColor)
				|| (accent && materialTheme.button.accentColor)
				|| materialTheme.text.primaryColor
			);
		}

		return (
			<RectRipple
				ref={this._measureRef}
				pointerEvents='box-only'
				accessibilityComponentType='button'
				accessibilityTraits={disabled ? 'disabled' : 'button'}
				accessibilityLabel={accessibilityLabel}
				{...(disabled ? {} : pressHandlers)}
				{...layoutProps}
				hitSlop={hitSlop || defaultHitSlop}
				style={[
					style,
					styles.root,
					raised ? styles.raised : styles.flat,
					raised && !disabled && elevation(2),
					{
						backgroundColor,
					}
				]}>
				<Text
					suppressHighlighting
					numberOfLines={1}
					style={[
						styles.text,
						{
							color,
						}
					]}>
					{text}
				</Text>
			</RectRipple>
		);
	}
}

export default withMaterialTheme(withMeasurementForwarding(Button));

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 2,
		height: 36,
		minWidth: 88,
	},
	flat: {
		paddingHorizontal: 8,
	},
	raised: {
		paddingHorizontal: 16,
	},
	text: {
		...typo.button,
		textAlign: 'center',
		lineHeight: 20,
	},
});
