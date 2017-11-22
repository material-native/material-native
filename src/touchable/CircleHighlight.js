'use strict';
import React, {PureComponent} from 'react';
import {withMeasurementForwarding} from '../util';
import CoreRipple from './CoreRipple';

/**
 * A simple touchable with a centered circle highlight instead of a full ripple.
 * Used in things like icon toggles and action bar icon buttons.
 */
export default withMeasurementForwarding(class CircleHighlight extends PureComponent {
	render() {
		return (
			<CoreRipple
				ref={this._setMeasureRef}
				rippleLocation='center'
				maskBorderRadiusInPercent={100}
				{...this.props} />
		);
	}
});
