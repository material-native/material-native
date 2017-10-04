'use strict';
import PropTypes from '../PropTypes';
import React, {Component} from 'react';
import hoistNonReactMethods from 'hoist-non-react-methods';
import MaterialTheme from './MaterialTheme';

const defaultTheme = new MaterialTheme();

export default function withMaterialTheme(BaseComponent) {
	class Wrapper extends Component { // eslint-disable-line react/require-optimization
		static contextTypes = {
			materialThemeObservable: PropTypes.Observable,
		};

		state = {
			materialTheme: undefined,
		};

		componentWillMount() {
			if ( this.context.materialThemeObservable ) {
				this._parentSubscription = this.context.materialThemeObservable.subscribe({
					next: (materialTheme) => {
						this.setState({materialTheme});
					},
					complete: () => {
						delete this._parentSubscription;
					},
				});
			}
		}

		componentWillUnmount() {
			if ( this._parentSubscription ) {
				this._parentSubscription.unsubscribe();
			}
		}

		_setMainRef = (ref) => {
			this._mainRef = ref;
		};

		render() {
			return (
				<BaseComponent
					ref={this._setMainRef}
					{...this.props}
					materialTheme={this.state.materialTheme || defaultTheme} />
			);
		}
	}

	Wrapper.displayName = `withMaterialTheme(${BaseComponent.displayName || BaseComponent.name || 'Component'})`;

	return hoistNonReactMethods(Wrapper, BaseComponent, (component) => component._mainRef);
}
