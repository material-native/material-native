'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import withMaterialTheme from '../styles/withMaterialTheme';
import CircleHighlight from '../touchable/CircleHighlight';
import CoreRadio from './CoreRadio';

/**
 * Standalone radio button with no label intended to be used alone with not linked to a parent touchable
 */
class Radio extends PureComponent {
	static defaultProps = {
		checked: false,
	};

	onPress = (e) => {
		this.props.onPress && this.props.onPress(e);
		this.props.onChangeChecked && this.props.onChangeChecked(!this.props.checked);
	};

	render() {
		const {
			onPress, // eslint-disable-line no-unused-vars
			style,
			...checkboxProps
		} = this.props;
		const {
			materialTheme,
			disabled,
			checked,
			accent,
			colorized: colorizedOverride,
		} = checkboxProps;

		const colorized = colorizedOverride || materialTheme.checkbox.colorized;
		const normalProps = materialTheme.checkbox.theme === 'dark' ? {light: true} : {dark: true};
		const tintProps = accent ? {accent: true} : {primary: true};

		const rippleProps = (
			(disabled && normalProps) ||
			(checked && tintProps) ||
			(colorized ? tintProps : normalProps)
		);

		// @todo Use disabled to disable ripple/press
		return (
			<CircleHighlight
				{...rippleProps}
				pointerEvents='box-only'
				style={[
					style,
					styles.root
				]}
				onPress={this.onPress}>
				<CoreRadio
					{...checkboxProps} />
			</CircleHighlight>
		);
	}
}

export default withMaterialTheme(Radio);

const styles = StyleSheet.create({
	root: {
		width: 48,
		height: 48,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
