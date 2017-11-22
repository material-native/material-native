'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import withMaterialTheme from '../styles/withMaterialTheme';
import {withMeasurementForwarding, filterProps, PRESS_HANDLERS, LAYOUT_PROPS} from '../util';
import CircleHighlight from '../touchable/CircleHighlight';
import elevation from '../styles/elevation';
import {largePrimaryTextShade} from '../styles/contrast';

class FAB extends PureComponent {
	static defaultProps = {
		disabled: false,
	};

	render() {
		const {
			materialTheme,
			icon,
			mini,
			solid: solidOverride,
			primary,
			accent,
			tintColor: tintColorOverride,
			style,
			...props
		} = this.props;
		const [pressHandlers, layoutProps] = filterProps(props, PRESS_HANDLERS, LAYOUT_PROPS);

		if ( icon && !React.isValidElement(icon) ) throw new TypeError('icon must be a react element');

		let backgroundColor, color;
		const tintColor = (
			tintColorOverride
			|| (primary && materialTheme.button.tintColor)
			|| (accent && materialTheme.button.accentColor)
		);

		// Raised buttons default to solid when primary, accent, or custom tint colors are passed
		const solid = typeof solidOverride === 'boolean' ? solidOverride : !!tintColor;

		if ( solid ) {
			backgroundColor = tintColor || materialTheme.button.tintColor;
			color = largePrimaryTextShade(backgroundColor);
		} else {
			backgroundColor = materialTheme.palette.container;
			color = tintColor || materialTheme.text.primaryColor;
		}

		return (
			// CircleHighlight is currently used insdead of CircleRipple due to ReactNative Android's overflow bug
			<CircleHighlight
				ref={this._setMeasureRef}
				pointerEvents='box-only'
				{...pressHandlers}
				{...layoutProps}
				style={[
					styles.base,
					style,
					styles.root,
					mini && styles.mini,
					elevation(6),
					{
						backgroundColor,
					}
				]}>
				{React.isValidElement(icon) && React.cloneElement(icon, {
					color,
				})}
			</CircleHighlight>
		);
	}
}

export default withMaterialTheme(withMeasurementForwarding(FAB));

const styles = StyleSheet.create({
	base: {
		alignSelf: 'flex-start',
	},
	root: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: 56,
		height: 56,
		borderRadius: 56/2,
	},
	mini: {
		width: 40,
		height: 40,
		borderRadius: 40/2,
	},
});
