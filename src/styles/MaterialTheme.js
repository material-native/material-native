'use strict';
import * as colors from './colors';
import shades from './shades';
import {detectTheme} from './wcag';
const F = Object.freeze;

function normalizeTheme(theme) {
	return theme === 'dark' ? 'dark' : 'light';
}

function inverse(theme) {
	return theme === 'dark' ? 'light' : 'dark';
}

const themeTones = F({
	light: F({
		statusBar: colors.grey300,
		barStyle: 'dark-content',
		appBar: colors.grey100,
		background: colors.grey50,
		container: colors.white,
	}),
	dark: F({
		statusBar: colors.black,
		barStyle: 'light-content',
		appBar: colors.grey900,
		background: '#303030',
		container: colors.grey800,
	}),
});

export default class MaterialTheme {
	constructor(settings) {
		this.settings = settings || {};
		// @todo recursively freeze settings
		this._applyDefaults();
		this._buildTheme();
		this._freeze();
	}

	_applyDefaults() {
		this.settings.theme = normalizeTheme(this.settings.theme);
	}

	_buildTheme() {
		const {theme} = this.settings;
		const inverseTheme = inverse(theme);

		this.themeTone = theme;
		this.inverseThemeTone = inverseTheme;

		this.palette = {
			primary: this.settings.primary || colors.indigo500,
			darkPrimary: this.settings.darkPrimary || colors.indigo700,
			accent: this.settings.accent || colors.pinkA200,
			background: themeTones[theme].background,
			container: themeTones[theme].container,
			error: this.settings.error || colors.redA400,
		};

		this.defaultToolbar = Object.assign({
			theme,
			background: themeTones[theme].appBar,
		}, this.settings.defaultToolbar || {});

		const appBarTheme = normalizeTheme((this.settings.appBar && this.settings.appBar.theme) || detectTheme(this.palette.primary || this.defaultToolbar.background));
		this.appBar = Object.assign({}, this.defaultToolbar, {
			theme: appBarTheme,
			background: this.palette.primary || this.defaultToolbar.background,
		}, this.settings.appBar || {});

		this.statusBar = Object.assign({
			background: this.palette.darkPrimary || themeTones[inverse(appBarTheme)].statusBar,
			translucentBackground: shades.dark.statusBar,
			barStyle: themeTones[inverse(appBarTheme)].barStyle,
		}, this.settings.statusBar || {});

		this.text = Object.assign({
			primaryColor: shades[inverseTheme].primaryText,
			secondaryColor: shades[inverseTheme].secondaryText,
			disabledColor: shades[inverseTheme].disabledText,
			hintColor: shades[inverseTheme].hintText,
			primaryOpacity: shades.opacity[inverseTheme].primaryText,
			secondaryOpacity: shades.opacity[inverseTheme].secondaryText,
			disabledOpacity: shades.opacity[inverseTheme].disabledText,
			hintOpacity: shades.opacity[inverseTheme].hintText,
		}, this.settings.text || {});

		this.divider = Object.assign({
			color: shades[inverseTheme].dividers,
		}, this.settings.divider || {});

		this.icon = Object.assign({
			activeColor: shades[inverseTheme].activeIcon,
			inactiveColor: shades[inverseTheme].inactiveIcon,
			activeOpacity: shades.opacity[inverseTheme].activeIcon,
			inactiveOpacity: shades.opacity[inverseTheme].inactiveIcon,
		}, this.settings.icon || {});

		this.button = Object.assign({
			accentColor: this.palette.accent,
			tintColor: this.palette.primary,
			disabledBackground: shades[inverseTheme].dividers,
			disabledColor: shades[inverseTheme].disabledText,
		}, this.settings.button || {});

		this.checkbox = Object.assign({
			animated: false,
			colorized: false,
			theme: inverseTheme,
			disabledColor: shades[inverseTheme].disabledText,
			normalColor: shades[inverseTheme].secondaryText,
			tintColor: this.palette.primary,
			accentColor: this.palette.accent,
			labelColor: shades[inverseTheme].primaryText,
		}, this.settings.input || {});

		this.input = Object.assign({
			theme: inverseTheme,
			tintColor: this.palette.primary,
			errorColor: this.palette.error,
		}, this.settings.input || {});

		this.dialog = Object.assign({
			underlay: 'rgba(0, 0, 0, 0.5)',
			background: this.palette.background,
			divider: shades[inverseTheme].dividers,
			title: this.text.primaryColor,
			contentColor: this.text.primaryColor,
			optionTextColor: this.text.primaryColor,
			disabledColor: this.text.disabledColor,
			tintColor: this.palette.primary,
		}, this.settings.dialog || {});
	}

	_freeze() {
		Object.freeze(this); // @todo recursive
	}

	/**
	 * Create a new theme object that inherits settings from another
	 */
	extend(settings) {
		// @todo immutably merge `this.settings` with `settings` and pass that to `new MaterialTheme()`
	}
}

export function getMaterialTheme(settings) {
	return new MaterialTheme(settings);
}
