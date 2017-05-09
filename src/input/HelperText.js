'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, Animated, View, Text} from 'react-native';
import * as typo from '../styles/typo';
import * as easing from '../easing';

class HelperTextLine extends PureComponent {
	render() {
		const {
			onLayout,
			allowFontScaling,
			color,
			opacity,
			slideY,
			text,
		} = this.props;

		return (
			<Animated.View
				onLayout={onLayout}
				style={[
					styles.helperTextContainer,
					{
						transform: slideY && [
							{
								translateY: slideY,
							}
						],
					}
				]}>
				<Animated.Text
					suppressHighlighting
					{...{allowFontScaling}}
					style={[
						styles.text,
						{
							color,
							opacity,
						}
					]}>
					{text || '\u200B'}
				</Animated.Text>
			</Animated.View>
		);
	}
}

export default class HelperText extends PureComponent {
	state = {
		helperHeight: 0,
		errorHeight: 0,
		error: undefined,
	};

	componentWillMount() {
		this._error = new Animated.Value(this.props.error ? 1 : 0);
		this._errorSlide = new Animated.Value(1);
		this.setState({error: this.props.error});
	}

	componentDidUpdate(prevProps) {
		const {props} = this;
		let next;

		if ( !!prevProps.error !== !!props.error ) {
			if ( !props.error ) {
				this._lockErrorText = true;
			}

			next = () => {
				const anim = [];

				// Native animations disabled until this React Native bug is fixed:
				// https://github.com/facebook/react-native/issues/13530
				anim.push(Animated.timing(
					this._error,
					{
						toValue: props.error ? 1 : 0,
						easing: easing.standard,
						duration: props.transitionDuration,
						// useNativeDriver: true,
					}));

				if ( props.error ) {
					this._errorSlide.setValue(0);
					anim.push(Animated.timing(
						this._errorSlide,
						{
							toValue: 1,
							easing: easing.standard,
							duration: props.transitionDuration,
							// useNativeDriver: true,
						}));
				}

				Animated.parallel(anim)
					.start(() => {
						this._lockErrorText = false;
						this._commitErrorText();
					});
			};
		}

		this._commitErrorText(next);
	}

	_lockErrorText = false;

	_commitErrorText = (next) => {
		if ( !this._lockErrorText ) {
			if ( this.state.error !== this.props.error ) {
				this.setState({error: this.props.error}, next);
				next = null;
			}
		}

		if ( next ) {
			next();
		}
	};

	_onTextLayout = ({nativeEvent: {layout: {height}}}, heightStateName) => {
		if ( this.state[heightStateName] !== height ) {
			this.setState({[heightStateName]: height});
		}
	};

	_onHelperTextLayout = (e) => this._onTextLayout(e, 'helperHeight');
	_onErrorTextLayout = (e) => this._onTextLayout(e, 'errorHeight');

	render() {
		const {
			allowFontScaling,
			dense,
			normalColor,
			errorColor,
			helper,
			length,
			maxLength,
		} = this.props;
		const {
			helperHeight,
			errorHeight,
			error,
		} = this.state;

		const charCounter = maxLength && (
			<Text
				suppressHighlighting
				{...{allowFontScaling}}
				style={[
					styles.text,
					styles.charCounter,
					{
						color: length > maxLength
							? errorColor
							: normalColor,
					}
				]}>
				{length} / {maxLength}
			</Text>
		);

		return (
			<View
				pointerEvents='none'
				style={[
					styles.container,
					dense && styles.containerDense,
					{
						height: Math.max(helperHeight, errorHeight),
					}
				]}>
				<View
					style={styles.leftRegionContainer}>
					<HelperTextLine
						onLayout={this._onHelperTextLayout}
						{...{allowFontScaling}}
						color={normalColor}
						opacity={this._error.interpolate({
							inputRange: [0, 1],
							outputRange: [1, 0],
						})}
						text={helper} />
					<HelperTextLine
						onLayout={this._onErrorTextLayout}
						{...{allowFontScaling}}
						color={errorColor}
						opacity={this._error.interpolate({
							inputRange: [0, 1],
							outputRange: [0, 1],
						})}
						slideY={this._errorSlide.interpolate({
							inputRange: [0, 1],
							outputRange: [-50, 0],
						})}
						text={error} />
				</View>
				{charCounter}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 4,
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
	containerDense: {
		marginVertical: 0,
	},
	leftRegionContainer: {
		position: 'relative',
		flex: 1,
	},
	text: {
		...typo.caption,
		lineHeight: 16,
	},
	helperTextContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
	},
	charCounter: {
		textAlign: 'right',
		marginLeft: 8,
	},
});
