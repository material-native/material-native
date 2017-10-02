'use strict';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import hoistNonReactMethods from 'hoist-non-react-methods';
import MaterialTheme from './MaterialTheme';

const defaultTheme = new MaterialTheme();

export default function withMaterialTheme(BaseComponent) {
	class Wrapper extends Component { // eslint-disable-line react/require-optimization
		static contextTypes = {
			materialTheme: PropTypes.instanceOf(MaterialTheme),
		};

		_setMainRef = (ref) => {
			this._mainRef = ref;
		};

		render() {
			return (
				<BaseComponent
					ref={this._setMainRef}
					{...this.props}
					materialTheme={this.context.materialTheme || defaultTheme} />
			);
		}
	}

	Wrapper.displayName = `withMaterialTheme(${BaseComponent.displayName || BaseComponent.name || 'Component'})`;

	return hoistNonReactMethods(Wrapper, BaseComponent, (component) => component._mainRef);
}
