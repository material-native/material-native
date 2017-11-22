'use strict';
import React, {PureComponent} from 'react';
import {withMeasurementForwarding} from '../util';
import CoreRipple from './CoreRipple';

/**
 * A basic ripple pre-configured to fill an area without being masked
 */
export default withMeasurementForwarding(class BorderlessRipple extends PureComponent {
	render() {
		return (
			<CoreRipple
				ref={this._setMeasureRef}
				borderless
				maskBorderRadius={0}
				{...this.props} />
		);
	}
});
