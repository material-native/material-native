'use strict';
import Observable from 'any-observable';
import PropTypes from '../PropTypes';
import React, {PureComponent} from 'react';
import MaterialTheme from './MaterialTheme';

const defaultTheme = new MaterialTheme();

export default class ThemeProvider extends PureComponent {
	static childContextTypes = {
		materialThemeObservable: PropTypes.Observable.isRequired,
	};

	static contextTypes = {
		materialThemeObservable: PropTypes.Observable,
	};

	getChildContext() {
		return {
			materialThemeObservable: this.observable,
		};
	}

	componentWillMount() {
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
		this.handleThemeChange(nextProps);
	}

	componentWillUnmount() {
		if ( this._parentSubscription ) {
			this._parentSubscription.unsubscribe();
		}
	}

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

	handleThemeChange(props) {
		const baseTheme = props.theme || this.parentMaterialTheme || defaultTheme;

		// @todo Handle extend prop here

		if ( baseTheme !== this.materialTheme ) {
			this.materialTheme = baseTheme;
			this.observers.forEach((observer) => observer.next(this.materialTheme));
		}
	}

	render() {
		return React.Children.only(this.props.children);
	}
}
