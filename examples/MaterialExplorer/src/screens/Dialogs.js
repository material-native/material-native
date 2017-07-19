'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, InteractionManager, Text, ScrollView} from 'react-native';
import {
	colors,
	shades,
	typo,
	ItemRipple,
	AlertDialog,
	ConfirmDialog,
	PickerDialog,
} from '../material-native';

class Item extends PureComponent {
	onPress = () => {
		InteractionManager.runAfterInteractions(this.props.onPress);
	};

	render() {
		const {onPress} = this;
		const {text} = this.props;

		return (
			<ItemRipple pointerEvents='box-only' style={styles.item} onPress={onPress}>
				<Text style={styles.itemText}>
					{text}
				</Text>
			</ItemRipple>
		);
	}
}

export default class Dialogs extends PureComponent {
	static navigationOptions = {
		title: 'Dialogs',
	};

	state = {
		openModal: undefined,
		ringtone: 'ANDROMEDA.ogg',
	};

	closeDialogs = () => {
		InteractionManager.runAfterInteractions(() => {
			this.setState({openModal: undefined});
		});
	};

	render() {
		const {openModal} = this.state;
		const close = {onPress: this.closeDialogs};

		return (
			<ScrollView style={styles.root} contentContainerStyle={styles.container}>
				<Item
					onPress={() => this.setState({openModal: 'alert'})}
					text='Simple alert' />
				<Item
					onPress={() => this.setState({openModal: 'prompt'})}
					text='Simple confirmation prompt' />
				<Item
					onPress={() => this.setState({openModal: 'stacked'})}
					text='Confirmation dialog with stacked actions' />
				<Item
					onPress={() => this.setState({openModal: 'ringtone'})}
					text='Option picker dialog' />

				<AlertDialog
					title='Congratulations'
					message='You just opened a dialog!'
					actionText='OK'
					open={openModal === 'alert'}
					onRequestClose={this.closeDialogs} />
				<ConfirmDialog
					message='Discard draft?'
					dismissiveText='CANCEL'
					affirmativeText='DISCARD'
					open={openModal === 'prompt'}
					onRequestClose={this.closeDialogs}
					onConfirm={this.closeDialogs} />
				<ConfirmDialog
					title="Use Google's Location Service?"
					message='Let Google help apps determine location. This means sending anonymous location data Google, even when no apps are running.'
					stackedActions
					dismissiveText='NO THANKS'
					affirmativeText='TURN ON SPEED BOOST'
					open={openModal === 'stacked'}
					onRequestClose={this.closeDialogs}
					onConfirm={this.closeDialogs} />
				<PickerDialog
					title='Phone Ringtone'
					dismissiveText='CANCEL'
					affirmativeText='OK'
					open={openModal === 'ringtone'}
					onRequestClose={this.closeDialogs}
					onConfirm={this.closeDialogs}
					selectedOption={this.state.ringtone}
					onChangeOption={(value) => this.setState({ringtone: value})}
					options={[
						'ANDROMEDA.ogg',
						'Aquila.ogg',
						'ArgoNavis.ogg',
						'BOOTES.ogg',
						'CANISMAJOR.ogg',
						'CASSIOPEIA.ogg',
						'Carina.ogg',
						'Carina.wav',
						'Centaurus.ogg',
						'Cygnus.ogg',
						'Draco.ogg',
						'Eridani.ogg',
						'FreeFlight.ogg',
						'FreeFlight.wav',
						'Lyra.ogg',
						'Machina.ogg',
						'Orion.ogg',
						'PERSEUS.ogg',
						'Pegasus.ogg',
						'Pyxis.ogg',
						'Rigel.ogg',
						'Scarabaeus.ogg',
						'Sceptrum.ogg',
						'Solarium.ogg',
						'Testudo.ogg',
						'URSAMINOR.ogg',
						'Vespa.ogg',
						'hydra.ogg'
					].map((ringtone) => ({
						value: ringtone,
						label: ringtone
							.replace(/\.(ogg|wav)$/, '')
							.replace(/([a-z])([A-Z])/, '$1 $2'),
					}))} />
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
		flex: 1,
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
