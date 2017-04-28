'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {colors} from './material-native';

export default class SegmentedControl extends PureComponent {
	static defaultProps = {
		options: [],
	};

	onChange(value) {
		this.props.onChange && this.props.onChange.call(undefined, value);
	}

	render() {
		const {options, value} = this.props;

		return (
			<View style={styles.root}>
				{options.map((option) => (
					<View key={option.value} style={styles.buttonContainer}>
						<Button
							title={option.label}
							color={option.value === value ? colors.blue500 : colors.grey300}
							onPress={() => this.onChange(option.value)} />
					</View>
				))}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 48,
	},
	buttonContainer: {
		paddingHorizontal: 4,
	},
});
