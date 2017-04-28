'use strict';
/**
 * Typography styles
 * https://material.io/guidelines/style/typography.html
 */
import {Platform} from 'react-native';

const fontFamily = Platform.OS === 'ios'
	// @todo Confirm this uses 'San Francisco', if not we'll need to apply the correct fontFamily
	? 'System'
	: 'Roboto,Noto,sans-serif';

const fontFamilyLight = Platform.OS === 'ios'
	? fontFamily
	: 'sans-serif-light';

/**
 * Styles for a "Light" font
 * Provides fontFamily and fontWeight
 */
export const fontLight = {
	fontFamily: fontFamilyLight,
	fontWeight: '300',
};

/**
 * Styles for a "Regular" font
 * Provides fontFamily and fontWeight
 */
export const fontRegular = {
	fontFamily,
	fontWeight: '400',
};

/**
 * Styles for a "Medium" font
 * Provides fontFamily and fontWeight
 */
export const fontMedium = {
	fontFamily,
	fontWeight: '500',
};

/**
 * Styles for a "Bold" font
 * Provides fontFamily and fontWeight
 *
 * WARNING: fontMedium should be used instead, fontBold is for use in non-English languages with "Tall"
 scripts */
export const fontBold = {
	fontFamily,
	fontWeight: '600',
};

/**
 * "Display 4" typography class styles
 */
export const display4 = {
	...fontLight,
	fontSize: 112,
	letterSpacing: -0.044,
	lineHeight: 120,
};

/**
 * "Display 3" typography class styles
 */
export const display3 = {
	...fontRegular,
	fontSize: 56,
	letterSpacing: -0.026,
	lineHeight: 60,
};

/**
 * "Display 2" typography class styles
 */
export const display2 = {
	...fontRegular,
	fontSize: 45,
	letterSpacing: -0.018,
	lineHeight: 48,
};

/**
 * "Display 1" typography class styles
 */
export const display1 = {
	...fontRegular,
	fontSize: 34,
	letterSpacing: -0.01,
	lineHeight: 40,
};

/**
 * "Headline" typography class styles
 */
export const headline = {
	...fontRegular,
	fontSize: 24,
	letterSpacing: -0.012,
	lineHeight: 32,
};

/**
 * "Title" typography class styles
 */
export const title = {
	...fontMedium,
	fontSize: 20,
	lineHeight: 28,
};

/**
 * "Subhead" typography class styles
 */
export const subhead = {
	...fontRegular,
	fontSize: 16,
	lineHeight: 24,
};

/**
 * "Body 2" typography class styles
 */
export const body2 = {
	...fontMedium,
	fontSize: 14,
	lineHeight: 24,
};

/**
 * "Body 1" typography class styles
 */
export const body1 = {
	...fontRegular,
	fontSize: 14,
	lineHeight: 20,
};

/**
 * "Caption" typography class styles
 */
export const caption = {
	...fontRegular,
	fontSize: 12,
	letterSpacing: 0.011,
	lineHeight: 20,
};

/**
 * "Button" typography class styles
 */
export const button = {
	...fontMedium,
	fontSize: 14,
	letterSpacing: 0.018,
	lineHeight: 24,
};

/**
 * "Dense" script (Chinese, Japanese, and Korean) style overrides for typography classes
 * Can be merged with the associated typography class styles to apply overrides
 */
export const denseOverrides = {
	display4: {},
	display3: {},
	display2: {},
	display1: {},
	headline: {},
	title: {fontSize: title.fontSize + 1},
	subhead: {fontSize: subhead.fontSize + 1},
	body2: {fontSize: body2.fontSize + 1},
	body1: {fontSize: body1.fontSize + 1},
	caption: {fontSize: caption.fontSize + 1},
	button: {fontSize: button.fontSize + 1},
};

/**
 * Typography class styles combined with style overrides for "Dense" scripts (Chinese, Japanese, and Korean)
 */
export const dense = {
	display4: {...display4, ...denseOverrides.display4},
	display3: {...display3, ...denseOverrides.display3},
	display2: {...display2, ...denseOverrides.display2},
	display1: {...display1, ...denseOverrides.display1},
	headline: {...headline, ...denseOverrides.headline},
	title: {...title, ...denseOverrides.title},
	subhead: {...subhead, ...denseOverrides.subhead},
	body2: {...body2, ...denseOverrides.body2},
	body1: {...body1, ...denseOverrides.body1},
	caption: {...caption, ...denseOverrides.caption},
	button: {...button, ...denseOverrides.button},
};

/**
 * "Tall" script (South and Southeast Asian and Middle Eastern languages, including Arabic, Hindi, and Thai) style overrides for typography classes
 * Can be merged with the associated typography class styles to apply overrides
 */
export const tallOverrides = {
	display4: {...fontRegular},
	display3: {},
	display2: {},
	display1: {},
	headline: {},
	title: {fontSize: title.fontSize + 1, ...fontBold},
	subhead: {fontSize: subhead.fontSize + 1},
	body2: {fontSize: body2.fontSize + 1, ...fontBold},
	body1: {fontSize: body1.fontSize + 1},
	caption: {fontSize: caption.fontSize + 1},
	button: {fontSize: button.fontSize + 1, ...fontBold},
};

/**
 * Typography class styles combined with style overrides for "Tall" scripts (South and Southeast Asian and Middle Eastern languages, including Arabic, Hindi, and Thai)
 */
export const tall = {
	display4: {...display4, ...tallOverrides.display4},
	display3: {...display3, ...tallOverrides.display3},
	display2: {...display2, ...tallOverrides.display2},
	display1: {...display1, ...tallOverrides.display1},
	headline: {...headline, ...tallOverrides.headline},
	title: {...title, ...tallOverrides.title},
	subhead: {...subhead, ...tallOverrides.subhead},
	body2: {...body2, ...tallOverrides.body2},
	body1: {...body1, ...tallOverrides.body1},
	caption: {...caption, ...tallOverrides.caption},
	button: {...button, ...tallOverrides.button},
};
