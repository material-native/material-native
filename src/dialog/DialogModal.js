'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Modal} from 'react-native';
import withMaterialTheme from '../styles/withMaterialTheme';

class DialogModal extends PureComponent {
	state = {};

	onViewportLayout = ({nativeEvent: {layout: {width, height}}}) => {
		const {state} = this;

		if ( state.width !== width || state.height !== height ) {
			this.setState({width, height});
		}
	};

	render() {
		const {
			materialTheme,
			open,
			onRequestClose,
			children,
		} = this.props;
		const {width, height} = this.state;
		const minorAxisSize = Math.min(width, height);

		const increment = 56;

		return (
			<Modal
				animationType='none'
				transparent
				visible={!!open}
				onRequestClose={onRequestClose}>
				<TouchableWithoutFeedback onPress={onRequestClose}>
					<View
						style={[
							styles.underlay,
							{
								backgroundColor: materialTheme.dialog.underlay,
							}
						]} />
				</TouchableWithoutFeedback>
				<View
					style={styles.viewport}
					pointerEvents='box-none'
					onLayout={this.onViewportLayout}>
					<View
						pointerEvents='box-none'
						style={[
							styles.dialogRoot,
							{
								width: Math.floor((minorAxisSize - (16*2)) / increment) * increment,
							}
						]}>
						{children}
					</View>
				</View>
			</Modal>
		);
	}
}

export default withMaterialTheme(DialogModal);

const styles = StyleSheet.create({
	viewport: {
		flex: 1,
		alignSelf: 'stretch',
		flexDirection: 'column',
		alignItems: 'center',
	},
	underlay: {
		...StyleSheet.absoluteFillObject,
	},
	dialogRoot: {
		flex: 1,
		maxWidth: 356,
		alignItems: 'stretch',
		justifyContent: 'center',
		paddingVertical: 16,
	},
});
