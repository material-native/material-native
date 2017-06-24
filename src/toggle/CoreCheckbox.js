'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import withMaterialTheme from '../styles/withMaterialTheme';
import {Icon} from '../Icon';

/**
 * Internal implementation of a checkbox icon that simply swaps between two icons
 */
class BasicCheckboxRenderer extends PureComponent {
	render() {
		const {indeterminate, checked, color} = this.props;

		return (
			<Icon
				name={
					indeterminate
						? 'indeterminate-check-box'
						: checked
							? 'check-box'
							: 'check-box-outline-blank'
				}
				color={color} />
		);
	}
}

/**
 * Internal implementation of a checkbox with the same animation as the checkbox implementation
 * used in Google's own Android apps.
 * @todo Implement
 */
const AnimatedCheckboxRenderer = BasicCheckboxRenderer;

/**
 * Base checkbox without a touchable area or any other functionality.
 */
class CoreCheckbox extends PureComponent {
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
			indeterminate,
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
			((checked || indeterminate) && tintColor) ||
			(colorized ? tintColor : normalColor)
		);
		const CheckboxRenderer = animated ? AnimatedCheckboxRenderer : BasicCheckboxRenderer;

		return (
			<View
				style={[
					style,
					styles.root
				]}>
				<CheckboxRenderer
					{...{indeterminate, checked, color}} />
			</View>
		);
	}
}

export default withMaterialTheme(CoreCheckbox);

const styles = StyleSheet.create({
	root: {
		width: 24,
		height: 24,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
