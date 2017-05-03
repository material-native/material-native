'use strict';
import React, {PureComponent} from 'react';
import CoreRipple from './CoreRipple';

/**
 * A basic ripple pre-configured for semi-round rectangular ripples such as buttons
 */
export default class RectRipple extends PureComponent {
	render() {
		return (
			<CoreRipple
				maskBorderRadius={2}
				{...this.props} />
		);
	}
}
