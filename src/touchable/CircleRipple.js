'use strict';
import React, {PureComponent} from 'react';
import {withMeasurementForwarding} from '../util';
import CoreRipple from './CoreRipple';

/**
 * A basic ripple pre-configured for a circular ripple area such as a FAB
 */
export default withMeasurementForwarding(class CircleRipple extends PureComponent {
	render() {
		return (
			<CoreRipple
				ref={this._setMeasureRef}
				maskBorderRadiusInPercent={100}
				{...this.props} />
		);
	}
});
