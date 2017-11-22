'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import withMaterialTheme from '../styles/withMaterialTheme';
import {filterProps, LAYOUT_PROPS} from '../util';
import CircleHighlight from '../touchable/CircleHighlight';
import CoreCheckbox from './CoreCheckbox';

/**
 * Standalone checkbox with no label intended to be used alone with not linked to a parent touchable
 */
class Checkbox extends PureComponent {
	static defaultProps = {
		checked: false,
	};

	onPress = (e) => {
		this.props.onPress && this.props.onPress(e);
		this.props.onChangeChecked && this.props.onChangeChecked(!this.props.checked);
	};

	_setRef = (ref) => this._ref = ref;
	measure(...args) { return this._ref.measure(...args); }
	measureInWindow(...args) { return this._ref.measureInWindow(...args); }
	measureLayout(...args) { return this._ref.measureLayout(...args); }

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
			indeterminate,
			accent,
			colorized: colorizedOverride, // unchecked box has active color
			...props
		} = checkboxProps;
		const [layoutProps] = filterProps(props, LAYOUT_PROPS);

		const colorized = colorizedOverride || materialTheme.checkbox.colorized;
		const normalProps = materialTheme.checkbox.theme === 'dark' ? {light: true} : {dark: true};
		const tintProps = accent ? {accent: true} : {primary: true};

		const rippleProps = (
			(disabled && normalProps) ||
			((checked || indeterminate) && tintProps) ||
			(colorized ? tintProps : normalProps)
		);

		// @todo Use disabled to disable ripple/press
		return (
			<CircleHighlight
				ref={this._setRef}
				{...rippleProps}
				{...layoutProps}
				pointerEvents='box-only'
				style={[
					style,
					styles.root
				]}
				onPress={this.onPress}>
				<CoreCheckbox
					{...checkboxProps} />
			</CircleHighlight>
		);
	}
}

export default withMaterialTheme(Checkbox);

const styles = StyleSheet.create({
	root: {
		width: 48,
		height: 48,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
