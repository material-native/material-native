'use strict';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import MaterialTheme from './MaterialTheme';

export default class ThemeProvider extends PureComponent {
	static childContextTypes = {
		materialTheme: PropTypes.instanceOf(MaterialTheme).isRequired,
	};

	state = {};

	getChildContext() {
		return {
			materialTheme: this.props.theme || this.state.theme || this.context.materialTheme || MaterialTheme.defaultTheme,
		};
	}

	render() {
		return React.Children.only(this.props.children);
	}
}
