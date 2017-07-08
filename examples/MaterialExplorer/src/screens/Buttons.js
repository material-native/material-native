'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {colors, Button} from '../material-native';

export default class Buttons extends PureComponent {
	static navigationOptions = {
		title: 'Buttons',
	};

	render() {
		return (
			<ScrollView style={styles.root} contentContainerStyle={styles.container}>
				<View style={styles.row}>
					<Button
						text='BUTTON' />
					<Button
						primary
						text='BUTTON' />
					<Button
						accent
						text='BUTTON' />
					<Button
						tintColor={colors.red500}
						text='BUTTON' />
				</View>
				<View style={styles.row}>
					<Button
						raised
						primary
						text='BUTTON' />
					<Button
						raised
						accent
						text='BUTTON' />
					<Button
						raised
						tintColor={colors.red500}
						text='BUTTON' />
				</View>
				<View style={styles.row}>
					<Button
						disabled
						text='BUTTON' />
					<Button
						raised
						disabled
						text='BUTTON' />
					<Button
						raised
						primary
						disabled
						text='BUTTON' />
				</View>
				<View style={styles.row}>
					<Button
						raised
						text='BUTTON' />
					<Button
						raised
						solid={false}
						primary
						text='BUTTON' />
					<Button
						raised
						solid={false}
						accent
						text='BUTTON' />
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colors.white,
	},
	container: {
		padding: 16,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 8,
	},
});
