'use strict';
import React, {PureComponent} from 'react';
import {Platform, Dimensions, StyleSheet, View, KeyboardAvoidingView, TouchableWithoutFeedback, Modal} from 'react-native';
import withMaterialTheme from '../styles/withMaterialTheme';

class DialogModal extends PureComponent {
	state = {};

	componentWillMount() {
		const {width, height} = Dimensions.get('window');
		this.setState({width, height});
		Dimensions.addEventListener('change', this.onWindowChange);
	}

	componentWillUnmount() {
		Dimensions.removeEventListener('change', this.onWindowChange);
	}

	onWindowChange = ({window: {width, height}}) => {
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
				onRequestClose={onRequestClose}
				supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>
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
					pointerEvents='box-none'>
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
					{Platform.OS === 'ios' &&
						<KeyboardAvoidingView
							behavior='padding' />}
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
