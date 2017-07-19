'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import withMaterialTheme from '../styles/withMaterialTheme';
import {Icon} from '../Icon';

/**
 * Internal implementation of a radio button icon that simply swaps between icons
 */
class BasicRadioRenderer extends PureComponent {
	render() {
		const {checked, color} = this.props;

		return (
			<Icon
				name={
					checked
						? 'radio-button-checked'
						: 'radio-button-unchecked'
				}
				color={color} />
		);
	}
}

/**
 * Internal implementation of a radio button with an animation similar to the checkbox implementation
 * used in Google's own Android apps.
 * @todo Implement
 */
const AnimatedRadioRenderer = BasicRadioRenderer;

/**
 * Base radio button without a touchable area or any other functionality.
 */
class CoreRadio extends PureComponent {
	static defaultProps = {
		disabled: false,
		checked: false,
		indeterminate: false,
		accent: false,
	};

	render() {
		const {
			materialTheme,
			disabled,
			checked,
			accent,
			animated: animatedOverride,
			colorized: colorizedOverride, // unchecked box has active color
			disabledColor: disabledColorOverride,
			normalColor: normalColorOverride,
			tintColor: tintColorOverride,
			style,
		} = this.props;

		const animated = animatedOverride || materialTheme.checkbox.animated;
		const colorized = colorizedOverride || materialTheme.checkbox.colorized;
		const disabledColor = disabledColorOverride || materialTheme.checkbox.disabledColor;
		const normalColor = normalColorOverride || materialTheme.checkbox.normalColor;
		const tintColor = tintColorOverride || (accent ? materialTheme.checkbox.accentColor : materialTheme.checkbox.tintColor);

		const color = (
			(disabled && disabledColor) ||
			(checked && tintColor) ||
			(colorized ? tintColor : normalColor)
		);
		const RadioRenderer = animated ? AnimatedRadioRenderer : BasicRadioRenderer;

		return (
			<View
				style={[
					style,
					styles.root
				]}>
				<RadioRenderer
					{...{checked, color}} />
			</View>
		);
	}
}

export default withMaterialTheme(CoreRadio);

const styles = StyleSheet.create({
	root: {
		width: 24,
		height: 24,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
