'use strict';
import React, {PureComponent} from 'react';
import {withMeasurementForwarding} from '../util';
import CoreRipple from './CoreRipple';

/**
 * A basic ripple pre-configured for semi-round rectangular ripples such as buttons
 */
export default withMeasurementForwarding(class RectRipple extends PureComponent {
	render() {
		return (
			<CoreRipple
				ref={this._setMeasureRef}
				maskBorderRadius={2}
				{...this.props} />
		);
	}
});
