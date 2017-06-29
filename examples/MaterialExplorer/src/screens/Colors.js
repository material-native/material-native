'use strict';
import startCase from 'lodash/startCase';
import React, {PureComponent} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {colors, MaterialText, Subhead} from '../material-native';

const groups = (() => {
	const groups = [];
	const groupMap = Object.create(null);

	for ( const color in colors ) {
		const hex = colors[color];
		const group = /^\w+A?\d+$/.test(color) ? color.replace(/A?\d+$/, '') : 'other';

		if ( !(group in groupMap) ) {
			groups.push(group);
			groupMap[group] = {
				name: group,
				label: startCase(group),
				values: [],
			};
		}

		groupMap[group].values.push({
			name: color,
			hex,
		});
	}

	return groups.map((name) => groupMap[name]);
})();

export default class Colors extends PureComponent {
	static navigationOptions = {
		title: 'Colors',
	};

	renderItem = ({item: group}) => {
		return (
			<View style={styles.group}>
				<Subhead
					secondary
					text={group.label} />

				<View style={styles.list}>
					{group.values.map(({name, hex}) => (
						<View key={name} style={[styles.item, {backgroundColor: hex}]}>
							<MaterialText body1 style={styles.colorName}>{name}</MaterialText>
							<MaterialText body1>{hex.toUpperCase()}</MaterialText>
						</View>
					))}
				</View>
			</View>
		);
	};

	keyExtractor = (item) => item.name;

	render() {
		return (
			<FlatList
				style={styles.root}
				data={groups}
				initialNumToRender={2}
				maxToRenderPerBatch={2}
				keyExtractor={this.keyExtractor}
				renderItem={this.renderItem} />
		);
	}
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	group: {
	},
	list: {
		paddingBottom: 8,
	},
	item: {
		height: 48,
		paddingHorizontal: 16,
		flexDirection: 'row',
		alignItems: 'center',
	},
	colorName: {
		flex: 1,
	},
});
