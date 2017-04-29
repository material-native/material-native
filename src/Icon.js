'use strict';
import React, {PureComponent} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import withMaterialTheme from './styles/withMaterialTheme';

export function createIconComponent(VectorIcon, displayName='Icon') {
	class Icon extends PureComponent {
		static defaultProps = {
			inactive: false,
			size: 24,
		};

		render() {
			const {materialTheme, inactive, size, color, ...props} = this.props;
			const themeColor = inactive ? materialTheme.icon.inactiveColor : materialTheme.icon.activeColor;

			return (
				<VectorIcon
					{...props}
					color={color || themeColor}
					size={size} />
			);
		}
	}
	Icon.displayName = displayName;

	return withMaterialTheme(Icon);
}

export const Icon = createIconComponent(MaterialIcons, 'Icon');
export const CommunityIcon = createIconComponent(MaterialCommunityIcons, 'CommunityIcon');
