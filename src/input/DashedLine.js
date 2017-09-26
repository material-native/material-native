'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, Animated, View} from 'react-native';

/**
 * Actual dashed line implementation.
 * This is a separate component to maximize the PureComponent optimization.
 * Only changes to the dash, space, strokeColor, strokeWidth, or the length of the line
 * will cause the dash segments to be re-rendered.
 */
class InternalDashedLine extends PureComponent {
	render() {
		const {
			dash,
			space,
			strokeColor,
			strokeWidth,
			lineLength,
		} = this.props;

		if ( dash <= 0 || space <= 0 ) {
			throw new Error('dash and space must not be zero or negative');
		}

		const segments = [];
		let x = 0;
		while ( x < lineLength ) {
			segments.push(
				<View
					key={x}
					style={[
						styles.segment,
						{
							backgroundColor: strokeColor,
							left: x,
							height: strokeWidth,
							width: Math.min(dash, lineLength - x + dash),
						}
					]} />
			);

			x += dash + space;
		}

		return (
			<View style={{height: strokeWidth}} pointerEvents='none'>
				{segments}
			</View>
		);
	}
}

export default class DashedLine extends PureComponent {
	static defaultProps = {
		dash: 2,
		space: 2,
		strokeColor: '#000',
		strokeWidth: 1,
	};

	state = {
		width: 0,
	};

	_onLayout = ({nativeEvent: {layout: {width}}}) => {
		if ( width && this.state.width !== width ) {
			this.setState({width});
		}
	};

	render() {
		const {
			dash,
			space,
			strokeColor,
			strokeWidth,
			style,
			...props
		} = this.props;
		const {width: lineLength} = this.state;

		return (
			<Animated.View
				{...props}
				onLayout={this._onLayout}
				style={[style, {height: strokeWidth}]}>
				<InternalDashedLine {...{dash, space, strokeColor, strokeWidth, lineLength}} />
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	segment: {
		position: 'absolute',
		top: 0,
	},
});
