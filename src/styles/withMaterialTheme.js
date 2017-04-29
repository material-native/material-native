'use strict';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import MaterialTheme from './MaterialTheme';

export default function withMaterialTheme(BaseComponent) {
	// @todo Wrap static and instance methods
	class WrappedComponent extends Component { // eslint-disable-line react/require-optimization
		static contextTypes = {
			materialTheme: PropTypes.instanceOf(MaterialTheme),
		};

		componentWillMount() {
			// @todo Wrap instance methods here
		}

		render() {
			return (
				<BaseComponent
					{...this.props}
					materialTheme={this.context.materialTheme || MaterialTheme.defaultTheme} />
			);
		}
	}

	// @todo Wrap static and prototype here

	WrappedComponent.displayName = `withMaterialTheme(${BaseComponent.displayName || BaseComponent.name || 'Component'})`;

	return WrappedComponent;
}
