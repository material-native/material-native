'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableHighlight} from 'react-native';
import {colors, shades, typo} from '../material-native';

class Item extends PureComponent {
	onPress = () => {
		this.props.navigate(this.props.route);
	};

	render() {
		const {onPress} = this;
		const {route, text} = this.props;

		return (
			<TouchableHighlight onPress={onPress}>
				<View style={styles.item}>
					<Text style={styles.itemText}>
						{text}
					</Text>
				</View>
			</TouchableHighlight>
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
