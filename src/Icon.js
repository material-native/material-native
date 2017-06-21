'use strict';
import React, {PureComponent} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import withMaterialTheme from './styles/withMaterialTheme';
import shades from './styles/shades';

export function createIconComponent(VectorIcon, displayName='Icon') {
	class Icon extends PureComponent {
		static defaultProps = {
			inactive: false,
			size: 24,
		};

		render() {
			const {
				materialTheme,
				inactive,
				size,
				primary,
				accent,
				dark,
				light,
				color: explicitColor,
				style,
				...props
			} = this.props;

			let color, opacity, fadeStyle;
			if ( explicitColor ) {
				color = explicitColor; // @todo Handle inactive/should this fade?
			} else if ( primary ) {
				color = this.props.materialTheme.palette.primary;
				opacity = inactive ? shades.opacity.dark.inactiveIcon : shades.opacity.dark.activeIcon; // @fixme autodetect dark/light
			} else if ( accent ) {
				color = this.props.materialTheme.palette.accent;
				opacity = inactive ? shades.opacity.dark.inactiveIcon : shades.opacity.dark.activeIcon; // @fixme autodetect dark/light
			} else if ( dark ) {
				color = inactive ? shades.dark.inactiveIcon : shades.dark.activeIcon;
			} else if ( light ) {
				color = inactive ? shades.light.inactiveIcon : shades.light.activeIcon;
			} else {
				color = inactive ? materialTheme.icon.inactiveColor : materialTheme.icon.activeColor;
			}

			if ( opacity ) {
				fadeStyle = {opacity};
			}

			return (
				<VectorIcon
					{...props}
					style={[fadeStyle, style]}
					color={color}
					size={size} />
			);
		}
	}
	Icon.displayName = displayName;

	return withMaterialTheme(Icon);
}

export const Icon = createIconComponent(MaterialIcons, 'Icon');
export const CommunityIcon = createIconComponent(MaterialCommunityIcons, 'CommunityIcon');
