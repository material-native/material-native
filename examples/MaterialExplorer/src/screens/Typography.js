'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {withMaterialStyles, MaterialText} from '../material-native';

class Typography extends PureComponent {
	static navigationOptions = {
		title: 'Typography',
	};

	render() {
		const {materialStyles} = this.props;

		return (
			<ScrollView style={materialStyles.root} contentContainerStyle={styles.container}>
				<View style={styles.typoRow}>
					<MaterialText display4 numberOfLines={1}>Disp. 4</MaterialText>
				</View>
				<View style={styles.typoRow}>
					<MaterialText display3 numberOfLines={1}>Display 3</MaterialText>
				</View>
				<View style={styles.typoRow}>
					<MaterialText display2 numberOfLines={1}>Display 2</MaterialText>
				</View>
				<View style={styles.typoRow}>
					<MaterialText display1 numberOfLines={1}>Display 1</MaterialText>
				</View>
				<View style={styles.typoRow}>
					<MaterialText headline numberOfLines={1}>Headline</MaterialText>
				</View>
				<View style={styles.typoRow}>
					<MaterialText title numberOfLines={1}>Title</MaterialText>
				</View>
				<View style={styles.typoRow}>
					<MaterialText subhead numberOfLines={1}>Subhead</MaterialText>
				</View>
				<View style={styles.typoRow}>
					<MaterialText body2 numberOfLines={1}>Body 2</MaterialText>
				</View>
				<View style={styles.typoRow}>
					<MaterialText body1 numberOfLines={1}>Body 1</MaterialText>
				</View>
				<View style={styles.typoRow}>
					<MaterialText caption numberOfLines={1}>Caption</MaterialText>
				</View>
				<View style={styles.typoRow}>
					<MaterialText button numberOfLines={1}>Button</MaterialText>
				</View>
			</ScrollView>
		);
	}
}

export default withMaterialStyles((materialTheme) => ({
	root: {
		flex: 1,
		backgroundColor: materialTheme.palette.container,
	},
}))(Typography);

const styles = StyleSheet.create({
	container: {
		paddingVertical: 8,
	},
	typoRow: {
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
});
