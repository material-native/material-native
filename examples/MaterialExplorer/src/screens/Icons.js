'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {colors, MaterialText, Icon, CommunityIcon} from '../material-native';
import SegmentedControl from '../SegmentedControl';
import iconMap from 'react-native-vector-icons/glyphmaps/MaterialIcons.json';
import communityIconMap from 'react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json';
const iconList = Object.keys(iconMap);
const communityIconList = Object.keys(communityIconMap);

export default class Icons extends PureComponent {
	static navigationOptions = {
		title: 'Icons',
	};

	state = {
		set: 'Icon',
	};

	sets = [
		{value: 'Icon', label: 'Icons'},
		{value: 'CommunityIcon', label: 'Community Icons'}
	];

	changeSet = (value) => {
		this.setState({set: value});
	};

	onListLayout = ({nativeEvent: {layout: {width}}}) => {
		if ( width && this.state.listWidth !== width ) {
			this.setState({listWidth: width});
		}
	};

	extractKey = (item) => item;

	renderIcon = ({item: icon}) => (
		<View style={styles.icon}>
			{this.state.set === 'CommunityIcon'
				? <CommunityIcon name={icon} />
				: <Icon name={icon} />}
		</View>
	);

	render() {
		const columns = Math.max(4, Math.floor(this.state.listWidth / 48));

		const ident = (text) => (
			<MaterialText body2>{text}</MaterialText>
		);

		return (
			<View style={styles.root}>
				<View>
					<MaterialText style={styles.introText}>{ident('material-native')} wraps {ident('react-native-vector-icons')} to change the default icon size to 24px and apply the material theme's coloring to the icon.</MaterialText>
					<MaterialText style={styles.introText}>{ident('createIconComponent')} can be used to wrap any {ident('react-native-vector-icons')} and pre-wrapped versions of {ident('MaterialIcons')} and {ident('MaterialCommunityIcons')} are exported as {ident('Icon')} and {ident('CommunityIcon')} respectively.</MaterialText>
				</View>

				<SegmentedControl
					options={this.sets}
					value={this.state.set}
					onChange={this.changeSet} />

				{/*<View>
					<View style={styles.icon}><Icon name='account-circle' /></View>
					<View style={styles.icon}><Icon name='arrow-back' /></View>
					<View style={styles.icon}><Icon name='menu' /></View>
				</View>
				<View>
					<View style={styles.icon}><CommunityIcon name='barcode' /></View>
					<View style={styles.icon}><CommunityIcon name='bomb' /></View>
					<View style={styles.icon}><CommunityIcon name='yin-yang' /></View>
				</View>*/}

				<View style={styles.listContainer} onLayout={this.onListLayout}>
					{this.state.listWidth &&
						<FlatList
							style={[styles.list, {width: columns * 48}]}
							data={this.state.set === 'CommunityIcon' ? communityIconList : iconList}
							keyExtractor={this.extractKey}
							renderItem={this.renderIcon}
							numColumns={columns} />}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colors.white,
		padding: 16,
	},
	introText: {
		paddingVertical: 8,
	},
	listContainer: {
		flex: 1,
		alignItems: 'center',
	},
	list: {
		flex: 1,
	},
	icon: {
		width: 48,
		height: 48,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
