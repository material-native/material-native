'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, Animated} from 'react-native';
import * as easing from '../easing';
import commonStyles from './commonStyles';

/**
 * Component managing prefix or suffix text next to the input text
 */
export default class InsetText extends PureComponent {
	componentWillMount() {
		this._floatingRatio = new Animated.Value(this.props.floating ? 1 : 0);
	}

	componentDidUpdate(prevProps) {
		const {props} = this;

		if ( prevProps.floating !== props.floating ) {
			Animated.timing(
				this._floatingRatio,
				{
					toValue: props.floating ? 1 : 0,
					easing: easing.standard,
					duration: props.transitionDuration,
					useNativeDriver: true,
				})
				.start();
		}
	}

	render() {
		const {
			dense,
			color,
			prefix,
			suffix,
			text,
		} = this.props;

		return (
			<Animated.Text
				style={[
					commonStyles.inputText,
					dense && commonStyles.denseText,
					prefix && styles.prefix,
					suffix && styles.suffix,
					{
						color,
						opacity: this._floatingRatio,
					}
				]}>
				{text}
			</Animated.Text>
		);
	}
}

const styles = StyleSheet.create({
	prefix: {
		marginRight: 4,
	},
	suffix: {
		marginLeft: 4,
	},
});
