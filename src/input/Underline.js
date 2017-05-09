'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, Animated, Easing, View} from 'react-native';
import DashedLine from './DashedLine';

// https://github.com/facebook/react-native/issues/6278
// React Native has a bug that causes scaleX to behave very badly when initialized
// with a value of `0` (or of a value extremely close to zero).
// This constant is initalized with a non-zero value close enough to zero that scaleX
// should treat it like zero (no longer showing the view) but not precise enough to
// trigger the bugs.
const ZERO = 0.00001;

export default class Underline extends PureComponent {
	componentWillMount() {
		const {
			disabled,
			focused,
			invalid,
		} = this.props;

		this._wasDisabled = disabled;
		this._disabledOpacity = new Animated.Value(disabled ? 1 : 0);
		this._focusedScale = new Animated.Value(focused ? 1 : 0);
		this._invalidScale = new Animated.Value(invalid ? 1 : 0);
	}

	componentWillReceiveProps(props) {
		const {props: prevProps} = this;

		if ( prevProps.invalid !== props.invalid ) {
			Animated.timing(
				this._invalidScale,
				{
					toValue: props.invalid ? 1 : 0,
					easing: Easing.linear,
					duration: props.transitionDuration,
					useNativeDriver: true,
				}).start();
		}

		if ( prevProps.focused !== props.focused ) {
			Animated.timing(
				this._focusedScale,
				{
					toValue: props.focused ? 1 : 0,
					easing: Easing.linear,
					duration: props.transitionDuration,
					useNativeDriver: true,
				}).start();
		}

		if ( prevProps.disabled !== props.disabled ) {
			this._wasDisabled = this._wasDisabled || props.disabled;
			Animated.timing(
				this._disabledOpacity,
				{
					toValue: props.disabled ? 1 : 0,
					easing: Easing.linear,
					duration: props.transitionDuration,
					useNativeDriver: true,
				}).start();
		}
	}

	render() {
		const {
			disabled,
			normalColor,
			tintColor,
			errorColor,
		} = this.props;

		// DashedLine is relatively expensive as React Native doesn't actually support
		// a single dotted or dashed border, so only render it if this component is or
		// has ever been disabled.
		const disabledLine = (
			(this._wasDisabled || disabled) &&
				<DashedLine
					strokeWidth={1}
					strokeColor={normalColor}
					style={[
						styles.line,
						{
							opacity: this._disabledOpacity,
						}
					]} />
		);

		const normalLine = (
			<Animated.View
				style={[
					styles.line,
					{
						backgroundColor: normalColor,
						opacity: this._disabledOpacity.interpolate({
							inputRange: [0, 1],
							outputRange: [1, ZERO],
						}),
					}
				]} />
		);

		const focusedLine = (
			<Animated.View
				style={[
					styles.line,
					styles.thick,
					{
						backgroundColor: tintColor,
						transform: [
							{scaleX: this._focusedScale.interpolate({
								inputRange: [0, 1],
								outputRange: [ZERO, 1],
							})}
						],
					}
				]} />
		);

		const invalidLine = (
			<Animated.View
				style={[
					styles.line,
					styles.thick,
					{
						backgroundColor: errorColor,
						transform: [
							{scaleX: this._invalidScale.interpolate({
								inputRange: [0, 1],
								outputRange: [ZERO, 1],
							})}
						],
					}
				]} />
		);

		return (
			<View
				style={styles.underline}
				pointerEvents='none'>
				{disabledLine}
				{normalLine}
				{focusedLine}
				{invalidLine}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	underline: {
		height: 2,
		marginBottom: -1,
	},
	line: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 1,
	},
	thick: {
		height: 2,
	},
});
