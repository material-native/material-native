'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, InteractionManager, Text, ScrollView} from 'react-native';
import {withMaterialStyles, typo, ItemRipple} from '../material-native';

let Item = class Item extends PureComponent {
	onPress = () => {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigate(this.props.route);
		});
	};

	render() {
		const {onPress} = this;
		const {materialStyles, text} = this.props;

		return (
			<ItemRipple pointerEvents='box-only' style={materialStyles.item} onPress={onPress}>
				<Text style={materialStyles.itemText}>
					{text}
				</Text>
			</ItemRipple>
		);
	}
};
Item = withMaterialStyles((materialTheme) => ({
	item: {
		height: 48,
		paddingHorizontal: 16,
		backgroundColor: materialTheme.palette.container,
		flexDirection: 'row',
		alignItems: 'center',
	},
	itemText: {
		...typo.subhead,
		color: materialTheme.text.primaryColor,
	},
}))(Item);

class Home extends PureComponent {
	static navigationOptions = {
		title: 'Material Native',
	};

	navigate = (routeName) => {
		this.props.navigation.navigate(routeName);
	};

	render() {
		const {materialStyles} = this.props;
		const {navigate} = this;

		return (
			<ScrollView style={materialStyles.root} contentContainerStyle={styles.container}>
				<Item navigate={navigate} route='Colors' text='Colors' />
				<Item navigate={navigate} route='Typography' text='Typography' />
				<Item navigate={navigate} route='Icons' text='Icons' />
				<Item navigate={navigate} route='Ripples' text='Ripples' />
				<Item navigate={navigate} route='Buttons' text='Buttons' />
				<Item navigate={navigate} route='Toggles' text='Toggles' />
				<Item navigate={navigate} route='TextFields' text='Text Fields' />
				<Item navigate={navigate} route='Avatars' text='Avatars' />
				<Item navigate={navigate} route='Dialogs' text='Dialogs' />
			</ScrollView>
		);
	}
}

export default withMaterialStyles((materialTheme) => ({
	root: {
		flex: 1,
		backgroundColor: materialTheme.palette.container,
	},
}))(Home);

const styles = StyleSheet.create({
	container: {
		paddingVertical: 8,
	},
});
