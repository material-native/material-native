'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {colors, withMaterialStyles, Button, FAB, Icon} from '../material-native';

class Buttons extends PureComponent {
	static navigationOptions = {
		title: 'Buttons',
	};

	render() {
		const {materialStyles} = this.props;

		return (
			<View style={materialStyles.root}>
				<ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
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
					<View style={styles.row}>
						<FAB
							icon={<Icon name='add' />} />
						<FAB
							primary
							solid={false}
							icon={<Icon name='add' />} />
						<FAB
							primary
							icon={<Icon name='add' />} />
						<FAB
							accent
							icon={<Icon name='add' />} />
					</View>
					<View style={styles.row}>
						<FAB
							mini
							icon={<Icon name='add' />} />
						<FAB
							mini
							primary
							solid={false}
							icon={<Icon name='add' />} />
						<FAB
							mini
							primary
							icon={<Icon name='add' />} />
						<FAB
							mini
							accent
							icon={<Icon name='add' />} />
					</View>
				</ScrollView>

				<FAB
					primary
					icon={<Icon name='add' />}
					style={styles.fab} />
			</View>
		);
	}
}

export default withMaterialStyles((materialTheme) => ({
	root: {
		flex: 1,
		backgroundColor: materialTheme.palette.container,
	},
}))(Buttons);

const styles = StyleSheet.create({
	scroll: {
		flex: 1,
	},
	container: {
		padding: 16,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 8,
	},
	fab: {
		position: 'absolute',
		bottom: 16,
		right: 16,
	},
});
