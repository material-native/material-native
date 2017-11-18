'use strict';

/**
 * Separates press handler props like onPress from other props.
 * Returns a destructurable array containing [pressHandlerProps, otherProps]
 */
export default function getPressHandlers(props) {
	const {
		onPress,
		onLongPress,
		onAccessibilityTap,
		onMagicTap,
		...otherProps
	} = props;
	const pressHandlers = {
		onPress,
		onLongPress,
		onAccessibilityTap,
		onMagicTap,
	};

	return [pressHandlers, otherProps];
}
