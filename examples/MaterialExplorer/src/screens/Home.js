'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, InteractionManager, Text, ScrollView} from 'react-native';
import {colors, shades, typo, CoreRipple} from '../material-native';

class Item extends PureComponent {
	onPress = () => {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigate(this.props.route);
		});
	};

	render() {
		const {onPress} = this;
		const {text} = this.props;

		return (
			<CoreRipple onPress={onPress} style={styles.item}>
				<Text style={styles.itemText}>
					{text}
				</Text>
			</CoreRipple>
		);
	}
}

export default class Home extends PureComponent {
	static navigationOptions = {
		title: 'Material Native',
	};

	navigate = (routeName) => {
		this.props.navigation.navigate(routeName);
	};

	render() {
		const {navigate} = this;

		return (
			<ScrollView style={styles.root} contentContainerStyle={styles.container}>
				<Item navigate={navigate} route='Colors' text='Colors' />
				<Item navigate={navigate} route='Typography' text='Typography' />
				<Item navigate={navigate} route='Icons' text='Icons' />
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
		paddingVertical: 8,
	},
	item: {
		height: 48,
		paddingHorizontal: 16,
		backgroundColor: colors.white,
		flexDirection: 'row',
		alignItems: 'center',
	},
	itemText: {
		...typo.subhead,
		color: shades.dark.primaryText,
	},
});
