'use strict';
import Observable from 'zen-observable';
import PropTypes from '../PropTypes';
import React, {PureComponent} from 'react';
import MaterialTheme from './MaterialTheme';

const defaultTheme = new MaterialTheme();

export default class ThemeProvider extends PureComponent {
	static contextTypes = {
		materialThemeObservable: PropTypes.Observable,
	};

	static childContextTypes = {
		materialThemeObservable: PropTypes.Observable.isRequired,
		memoizedMaterialStyles: PropTypes.func,
	};

	getChildContext() {
		return {
			materialThemeObservable: this.observable,
			memoizedMaterialStyles: this.memoizedMaterialStyles,
		};
	}

	componentWillMount() {
		// materialTheme
		if ( this.context.materialThemeObservable ) {
			this._parentSubscription = this.context.materialThemeObservable.subscribe({
				next: (theme) => {
					this.parentMaterialTheme = theme;
					this.handleThemeChange(this.props);
				},
				complete: () => {
					delete this._parentSubscription;
				},
			});
		} else {
			this.handleThemeChange(this.props);
		}
	}

	componentWillReceiveProps(nextProps) {
		// materialTheme
		this.handleThemeChange(nextProps);
	}

	componentWillUnmount() {
		if ( this._parentSubscription ) {
			this._parentSubscription.unsubscribe();
		}
	}

	// materialTheme
	observable = new Observable((observer) => {
		if ( this.materialTheme ) {
			observer.next(this.materialTheme);
		}

		this.observers.add(observer);

		return () => {
			this.observers.delete(observer);
		};
	});

	observers = new Set();

	materialTheme = undefined;
	parentMaterialTheme = undefined;

	// materialTheme
	handleThemeChange(props) {
		const baseTheme = props.theme || this.parentMaterialTheme || defaultTheme;

		// @todo Handle extend prop here

		if ( baseTheme !== this.materialTheme ) {
			this.materialTheme = baseTheme;
			this.observers.forEach((observer) => observer.next(this.materialTheme));
		}
	}

	// styleCache
	materialStyleCache = new Map();

	memoizedMaterialStyles = (materialTheme, mapThemeToStyles) => {
		let cache = this.materialStyleCache.get(mapThemeToStyles);
		if ( cache && cache.materialTheme === materialTheme ) {
			return cache.styles;
		}

		// @note If possible in the future, styles in `cache` can be unloaded at this point

		const cacheStyles = mapThemeToStyles(materialTheme);

		for ( const key in cacheStyles ) {
			Object.freeze(cacheStyles[key]);
		}
		Object.freeze(cacheStyles);

		cache = {
			materialTheme,
			styles: cacheStyles,
		};

		this.materialStyleCache.set(mapThemeToStyles, cache);

		return cache.styles;
	};

	// boilerplate
	render() {
		return React.Children.only(this.props.children);
	}
}
