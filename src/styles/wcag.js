'use strict';
import parse from 'color-parse';
import composite from 'color-composite';
import wcag from 'wcag-contrast';
import shades from './shades';

/**
 * Choose the first text color in a list with enough contrast to be used as a text color for normal text over a bg color
 * @param  {string} bg Background color to compare contrast to
 * @param  {string[]} colors The list of potential text colors
 * @return {string} The text color
 */
export function textContrast(bg, colors, size='small') {
	const contrastRatio = size === 'large' ? 3 : 4.5;
	bg = parse(bg);
	if ( bg.space !== 'rgb' ) throw new TypeError(`bg color must be in the rgb color space not ${bg.space}`);

	for ( const textShade of colors ) {
		const textShadeRGB = parse(textShade);
		if ( textShadeRGB.space !== 'rgb' ) throw new TypeError(`text color ${textShade} must be in the rgb color space not ${textShadeRGB.space}`);
		const textColor = composite.over(textShadeRGB, bg);
		if ( wcag.rgb(bg.values, textColor.values) >= contrastRatio ) {
			return textShade;
		}
	}

	return colors[0];
}

/**
 * Choose the first text color in a list with enough contrast to be used as a text color for large text over a bg color
 * Large text is text with a font size of >=24px or bold text with a font size >=18.5px
 * @param  {string} bg Background color to compare contrast to
 * @param  {string[]} colors The list of potential text colors
 * @return {string} The text color
 */
export function largeTextContrast(bg, colors) {
	return textContrast(bg, colors, 'large');
}

/**
 * Choose a material text color shade with enough contrast to be used as a text color for normal text over a bg color
 * @param  {string} bg Background color to compare contrast to
 * @param  {string} shadeType The `shade.{light/dark}.?` key to use
 * @param  {string} preferShade Shade to prefer when both shades have enough contrast
 * @return {string} The text color
 */
export function textShade(bg, shadeType, preferShade='light', size='small') {
	const colors = [shades.light[shadeType], shades.dark[shadeType]];
	if ( preferShade === 'dark' ) {
		colors.reverse();
	}

	return textContrast(bg, colors, size);
}

/**
 * Choose a material text color shade with enough contrast to be used as a text color for large text over a bg color
 * Large text is text with a font size of >=24px or bold text with a font size >=18.5px
 * @param  {string} bg Background color to compare contrast to
 * @param  {string} shadeType The `shade.{light/dark}.?` key to use
 * @param  {string} preferShade Shade to prefer when both shades have enough contrast
 * @return {string} The text color
 */
export function largeTextShade(bg, shadeType, preferShade='light') {
	return textShade(bg, shadeType, preferShade, 'large');
}

/**
 * Choose a primary text shade with enough contrast to be used as a text color for normal text over a bg color
 * @param  {string} bg Background color to compare contrast to
 * @param  {string} preferShade Shade to prefer when both shades have enough contrast
 */
export function primaryTextShade(bg, preferShade='light') {
	return textShade(bg, 'primaryText', preferShade);
}

/**
 * Choose a primary text shade with enough contrast to be used as a text color for large text over a bg color
 * Large text is text with a font size of >=24px or bold text with a font size >=18.5px
 * @param  {string} bg Background color to compare contrast to
 * @param  {string} preferShade Shade to prefer when both shades have enough contrast
 */
export function largePrimaryTextShade(bg, preferShade='light') {
	return largeTextShade(bg, 'primaryText', preferShade);
}

/**
 * Choose a secondary text shade with enough contrast to be used as a text color for normal text over a bg color
 * @param  {string} bg Background color to compare contrast to
 * @param  {string} preferShade Shade to prefer when both shades have enough contrast
 */
export function secondaryTextShade(bg, preferShade='light') {
	return textShade(bg, 'secondaryText', preferShade);
}

/**
 * Choose a secondary text shade with enough contrast to be used as a text color for large text over a bg color
 * Large text is text with a font size of >=24px or bold text with a font size >=18.5px
 * @param  {string} bg Background color to compare contrast to
 * @param  {string} preferShade Shade to prefer when both shades have enough contrast
 */
export function largeSecondaryTextShade(bg, preferShade='light') {
	return largeTextShade(bg, 'secondaryText', preferShade);
}

/**
 * Choose a disabled text shade with enough contrast to be used as a text color for normal text over a bg color
 * @param  {string} bg Background color to compare contrast to
 * @param  {string} preferShade Shade to prefer when both shades have enough contrast
 */
export function disabledTextShade(bg, preferShade='light') {
	return textShade(bg, 'disabledText', preferShade);
}

/**
 * Choose a disabled text shade with enough contrast to be used as a text color for large text over a bg color
 * Large text is text with a font size of >=24px or bold text with a font size >=18.5px
 * @param  {string} bg Background color to compare contrast to
 * @param  {string} preferShade Shade to prefer when both shades have enough contrast
 */
export function largeDisabledTextShade(bg, preferShade='light') {
	return largeTextShade(bg, 'disabledText', preferShade);
}

/**
 * Choose a hint text shade with enough contrast to be used as a text color for normal text over a bg color
 * @param  {string} bg Background color to compare contrast to
 * @param  {string} preferShade Shade to prefer when both shades have enough contrast
 */
export function hintTextShade(bg, preferShade='light') {
	return textShade(bg, 'hintText', preferShade);
}

/**
 * Choose a hint text shade with enough contrast to be used as a text color for large text over a bg color
 * Large text is text with a font size of >=24px or bold text with a font size >=18.5px
 * @param  {string} bg Background color to compare contrast to
 * @param  {string} preferShade Shade to prefer when both shades have enough contrast
 */
export function largeHintTextShade(bg, preferShade='light') {
	return largeTextShade(bg, 'hintText', preferShade);
}
