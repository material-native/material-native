'use strict';
import React, {PureComponent} from 'react';
import {withMeasurementForwarding} from '../util';
import CoreRipple from './CoreRipple';

/**
 * A basic ripple pre-configured for square edged rectangular ripples such as list items
 */
export default withMeasurementForwarding(class ItemRipple extends PureComponent {
	render() {
		return (
			<CoreRipple
				ref={this._setMeasureRef}
				maskBorderRadius={0}
				{...this.props} />
		);
	}
});
