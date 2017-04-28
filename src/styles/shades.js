'use strict';
/**
 * Translucent black and white colors used for text, icons, and dividers.
 * https://material.io/guidelines/style/color.html#color-usability
 */

const dark = (opacity) => `rgba(0, 0, 0, ${opacity})`;
const light = (opacity) => `rgba(255, 255, 255, ${opacity})`;

function makeShades(genColor, opacities) {
	const shades = {};

	for ( const shade in opacities ) {
		shades[shade] = genColor(opacities[shade]);
	}

	return shades;
}

export const opacity = {
	// Translucent blacks
	dark: {
		primaryText: 0.87,
		secondaryText: 0.54,
		disabledText: 0.38,
		hintText: 0.38,
		dividers: 0.12,
		activeIcon: 0.54,
		inactiveIcon: 0.38,
	},
	// Translucent whites
	light: {
		primaryText: 1,
		secondaryText: 0.70,
		disabledText: 0.50,
		hintText: 0.50,
		dividers: 0.12,
		activeIcon: 1,
		inactiveIcon: 0.5,
	},
};

export default ({
	opacity,
	dark: makeShades(dark, opacity.dark),
	light: makeShades(light, opacity.light),
});
