'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, Animated} from 'react-native';
import * as typo from '../styles/typo';
import * as easing from '../easing';
import Sizes from './Sizes';

export default class FloatingLabel extends PureComponent {
	static defaultProps = {
		// false/fixed=label over input, true/floating=label floating above input
		floating: true,
	};

	state = {
		fixedLabelHeight: Sizes[this.props.dense ? 'dense' : 'normal'].inputLineHeight,
		fixedLabelWidth: 0,
	};

	componentWillMount() {
		this._floatingRatio = new Animated.Value(this.props.floating ? 1 : 0);
		this._invalidShake = new Animated.Value(1);
	}

	componentWillReceiveProps(props) {
		const {props: prevProps} = this;

		// Native animations disabled until this React Native bug is fixed:
		// https://github.com/facebook/react-native/issues/13530
		if ( prevProps.floating !== props.floating ) {
			Animated.timing(
				this._floatingRatio,
				{
					toValue: props.floating ? 1 : 0,
					easing: easing.standard,
					duration: props.transitionDuration,
					// useNativeDriver: true,
				})
				.start();
		} else if ( props.floating && !prevProps.invalid && props.invalid ) {
			this._invalidShake.setValue(0);
			Animated.timing(
				this._invalidShake,
				{
					toValue: 1,
					easing: easing.standard,
					duration: props.transitionDuration,
					// useNativeDriver: true,
				})
				.start();
		}
	}

	_setLabelRef = (ref) => {
		this._labelRef = ref;
	};

	_onLayout = ({nativeEvent: {layout: {width, height}}}) => {
		if ( this.state.fixedLabelHeight !== height ) {
			this.setState({fixedLabelHeight: height});
		}

		if ( this.state.fixedLabelWidth !== width ) {
			this.setState({fixedLabelWidth: width});
		}
	};

	/**
	 * Size of the leftover space above/below the label when it is shrunk from fixed to floating
	 * size at its center line
	 */
	get floatingOffsetY() {
		const sizes = Sizes[this.props.dense ? 'dense' : 'normal'];
		return (sizes.inputFontSize - sizes.labelFontSize) / 2;
	}

	/**
	 * Offset from the top for the label when fixed over the input text
	 */
	get fixedOffsetY() {
		const sizes = Sizes[this.props.dense ? 'dense' : 'normal'];
		const {fixedLabelHeight} = this.state;
		return sizes.labelLineHeight + sizes.paddingAboveInput - (sizes.inputHeight - fixedLabelHeight) / 2;// - (sizes.inputLineHeight - sizes.inputFontSize) / 2;
	}

	/**
	 * X offset for the label to cancel out the implicit translation caused by the floating label scale
	 */
	get floatingOffsetX() {
		const sizes = Sizes[this.props.dense ? 'dense' : 'normal'];
		const {fixedLabelWidth} = this.state;

		return (fixedLabelWidth - (fixedLabelWidth * sizes.floatingFontScale)) / 2 * -1;
	}

	render() {
		const {
			allowFontScaling,
			normalColor,
			tintColor,
			errorColor,
			dense,
			focused,
			invalid,
			text,
		} = this.props;

		const sizes = Sizes[dense ? 'dense' : 'normal'];

		const labelScale = this._floatingRatio.interpolate({
			inputRange: [0, 1],
			outputRange: [1, sizes.floatingFontScale],
		});

		const labelY = this._floatingRatio.interpolate({
			inputRange: [0, 1],
			outputRange: [
				this.fixedOffsetY,
				-this.floatingOffsetY
			],
		});

		const labelX = this._floatingRatio.interpolate({
			inputRange: [0, 1],
			outputRange: [
				0,
				this.floatingOffsetX
			],
		});

		const labelShake = this._invalidShake.interpolate({
			inputRange: [0, 0.4, 0.9, 1],
			outputRange: [0, 4, -2, 0],
		});

		return (
			<Animated.View
				pointerEvents='none'
				style={[
					styles.container,
					{
						transform: [
							{translateX: labelShake},
							{translateY: labelY},
							{translateX: labelX},
							{scale: labelScale}
						],
					}
				]}>
				<Animated.Text
					ref={this._setLabelRef}
					onLayout={this._onLayout}
					suppressHighlighting
					allowFontScaling={allowFontScaling}
					numberOfLines={1}
					style={[
						styles.text,
						dense && styles.denseText,
						{
							color: invalid
								? errorColor
								: focused
									? tintColor
									: normalColor,
						}
					]}>
					{text}
				</Animated.Text>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
	},
	text: {
		...typo.fontNormal,
		fontSize: Sizes.normal.inputFontSize,
		lineHeight: Sizes.normal.inputLineHeight,
	},
	denseText: {
		fontSize: Sizes.dense.inputFontSize,
		lineHeight: Sizes.dense.inputLineHeight,
	},
});
