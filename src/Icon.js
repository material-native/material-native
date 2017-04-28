'use strict';
import React, {PureComponent} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function createIconComponent(VectorIcon) {
	class Icon extends PureComponent {
		render() {
			const {size, ...props} = this.props;
			// @todo Support themes and accept an `inactive` prop

			return (
				<VectorIcon
					{...props}
					size={size || 24} />
			);
		}
	}

	return Icon;
}

export const Icon = createIconComponent(MaterialIcons);
Icon.displayName = 'Icon';

export const CommunityIcon = createIconComponent(MaterialCommunityIcons);
CommunityIcon.displayName = 'CommunityIcon';
