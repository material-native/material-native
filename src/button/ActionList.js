'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import withMaterialTheme from '../styles/withMaterialTheme';

/**
 * Container for a horizontal list of action buttons.
 * Used to contain the left or right list of actions when the navigation bar only supports
 * one button or uses an incorrect flex direction.
 */
class ActionList extends PureComponent {
	static defaultProps = {
		stretch: 'both',
	};

	render() {
		const {children, stretch} = this.props;
		const stretchAlign = stretch === 'both' || stretch === 'align';
		const stretchFlex = stretch === 'both' || stretch === 'flex';

		return (
			<View
				style={[
					styles.root,
					stretchAlign && styles.stretchAlign,
					stretchFlex && styles.stretchFlex
				]}>
				{children}
			</View>
		);
	}
}

export default withMaterialTheme(ActionList);

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		alignSelf: 'stretch',
	},
	stretchAlign: {
		alignItems: 'stretch',
	},
	stretchFlex: {
		flex: 1,
	},
});
