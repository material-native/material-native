'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, Text} from 'react-native';
import withMaterialTheme from '../styles/withMaterialTheme';
import {filterProps, LAYOUT_PROPS} from '../util';
import RectRipple from '../touchable/RectRipple';
import CoreRadio from './CoreRadio';
import * as typo from '../styles/typo';

/**
 * Radio with a label right beside it, useful for horizontal lists of options
 */
class LabeledRadio extends PureComponent {
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
			labelColor: labelColorOverride,
			label,
			...checkboxProps
		} = this.props;
		const {
			materialTheme,
			...props
		} = checkboxProps;
		const [layoutProps] = filterProps(props, LAYOUT_PROPS);

		const isRTL = false; // @todo support RTL

		const normalProps = materialTheme.checkbox.theme === 'dark' ? {light: true} : {dark: true};
		const labelColor = labelColorOverride || materialTheme.checkbox.labelColor;

		// @todo Use disabled to disable ripple/press
		return (
			<RectRipple
				ref={this._setRef}
				{...normalProps}
				{...layoutProps}
				pointerEvents='box-only'
				style={[
					style,
					styles.root
				]}
				onPress={this.onPress}>
				<CoreRadio
					style={styles.checkbox}
					{...checkboxProps} />
				<Text
					suppressHighlighting
					numberOfLines={1}
					style={[
						styles.label,
						isRTL ? styles.labelRTL : styles.labelLTR,
						{
							color: labelColor,
						}
					]}>
					{label}
				</Text>
			</RectRipple>
		);
	}
}

export default withMaterialTheme(LabeledRadio);

const styles = StyleSheet.create({
	root: {
		height: 48,
		flexDirection: 'row',
		alignItems: 'center',
	},
	checkbox: {
		marginHorizontal: (48 - 24) / 2,
	},
	label: {
		...typo.body1,
		marginHorizontal: (48 - 24) / 2,
	},
	labelLTR: {
		marginLeft: 0,
	},
	labelRTL: {
		marginRight: 0,
	},
});
