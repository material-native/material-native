'use strict';
import React, {PureComponent} from 'react';
import ActionList from './ActionList';
import {StyleSheet, Text} from 'react-native';
import withMaterialTheme from '../styles/withMaterialTheme';
import {withMeasurementForwarding, filterProps, PRESS_HANDLERS, LAYOUT_PROPS} from '../util';
import CoreRipple from '../touchable/CoreRipple';
import * as typo from '../styles/typo';
import {
	largePrimaryTextShade,
	largeDisabledTextShade,
	largeActiveIconShade,
	largeInactiveIconShade,
} from '../styles/contrast';

/**
 * Material Design buttons for actions in the navigation app bar.
 */
class ActionButton extends PureComponent {
	static List = ActionList;

	static defaultProps = {
		disabled: false,
		narrow: false,
		borderless: false,
	};

	render() {
		const {
			materialTheme,
			disabled,
			icon,
			text,
			hitSlop,
			accessibilityLabel,
			narrow,
			borderless,
			primary,
			accent,
			tintColor: tintColorOverride,
			style,
			...props
		} = this.props;
		const [pressHandlers, layoutProps] = filterProps(props, PRESS_HANDLERS, LAYOUT_PROPS);

		const backgroundColorContext = materialTheme.appBar.background;
		const tintColor = (
			tintColorOverride
			|| (primary && materialTheme.palette.primary)
			|| (accent && materialTheme.palette.accent)
		);

		let content, rippleProps;
		if ( icon ) {
			const color = disabled
				? largeInactiveIconShade(backgroundColorContext)
				: tintColor || largeActiveIconShade(backgroundColorContext);

			rippleProps = {
				borderless,
				rippleLocation: 'center',
				maskBorderRadiusInPercent: 100,
			};

			content = React.cloneElement(icon, {
				color,
			});
		} else if ( text ) {
			const color = disabled
				? largeDisabledTextShade(backgroundColorContext)
				: tintColor || largePrimaryTextShade(backgroundColorContext);

			rippleProps = {
				borderless,
				maskBorderRadius: 2,
			};

			content = (
				<Text
					style={[
						styles.text,
						{color}
					]}>
					{text}
				</Text>
			);
		}

		return (
			<CoreRipple
				ref={this._setMeasureRef}
				pointerEvents='box-only'
				accessibilityComponentType='button'
				accessibilityTraits={disabled ? 'disabled' : 'button'}
				accessibilityLabel={accessibilityLabel}
				{...(disabled ? {} : pressHandlers)}
				{...layoutProps}
				hitSlop={hitSlop}
				style={[
					style,
					styles.root,
					icon && narrow && styles.narrow
				]}
				{...rippleProps}>
				{content}
			</CoreRipple>
		);
	}
}

export default withMaterialTheme(withMeasurementForwarding(ActionButton));

const styles = StyleSheet.create({
	root: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	narrow: {
		width: 10,
	},
	text: {
		...typo.button,
		textAlign: 'center',
		lineHeight: 20,
	},
});
