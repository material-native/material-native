'use strict';
import React, {PureComponent} from 'react';
import CoreRipple from './CoreRipple';

/**
 * A basic ripple pre-configured for square edged rectangular ripples such as list items
 */
export default class ItemRipple extends PureComponent {
	render() {
		return (
			<CoreRipple
				maskBorderRadius={0}
				{...this.props} />
		);
	}
}
