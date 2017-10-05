'use strict';
import PropTypes from '../PropTypes';
import React, {Component} from 'react';
import hoistNonReactMethods from 'hoist-non-react-methods';
import withMaterialTheme from './withMaterialTheme';

export default function withMaterialStyles(mapThemeToStyles) {
	return (BaseComponent) => {
		class Wrapper extends Component { // eslint-disable-line react/require-optimization
			static _defaultCachedTheme = undefined;
			static _defaultCachedStyles = undefined;

			static contextTypes = {
				memoizedMaterialStyles: PropTypes.func,
			};

			_setMainRef = (ref) => {
				this._mainRef = ref;
			};

			getStyles() {
				if ( this.context.memoizedMaterialStyles ) {
					return this.context.memoizedMaterialStyles(this.props.materialTheme, mapThemeToStyles);
				} else {
					// Handle usage without a ThemeProvider
					if ( Wrapper._defaultCachedTheme !== this.props.materialTheme || !Wrapper._defaultCachedStyles ) {
						Wrapper._defaultCachedTheme = this.props.materialTheme;
						Wrapper._defaultCachedStyles = mapThemeToStyles(this.props.materialTheme);
					}

					return Wrapper._defaultCachedStyles;
				}
			}

			render() {
				return (
					<BaseComponent
						ref={this._setMainRef}
						{...this.props}
						materialStyles={this.getStyles()} />
				);
			}
		}

		Wrapper.displayName = `withMaterialStyles(${BaseComponent.displayName || BaseComponent.name || 'Component'})`;

		return withMaterialTheme(hoistNonReactMethods(Wrapper, BaseComponent, (component) => component._mainRef));
	};
}
