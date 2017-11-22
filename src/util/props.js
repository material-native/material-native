'use strict';

export const PRESS_HANDLERS = [
	'onPress',
	'onLongPress',
	'onAccessibilityTap',
	'onMagicTap'
];
export const LAYOUT_PROPS = [
	'onLayout'
];

/**
 * Separates groups of props other props.
 * Returns an array with objects containing the props listed by their respective prop map
 * followed by a single otherProps object.
 */
export function filterProps(props, ...propMaps) {
	const propMap = Object.create(null);
	const results = propMaps.map((propNames, idx) => {
		for ( let i = 0; i < propNames.length; ++i ) {
			propMap[propNames[i]] = idx;
		}
		return {};
	});
	const otherProps = {};
	results.push(otherProps);

	for ( const key in props ) {
		if ( key in propMap ) {
			results[propMap[key]][key] = props[key];
		} else {
			otherProps[key] = props[key];
		}
	}

	return results;
}
