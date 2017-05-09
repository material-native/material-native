'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import {colors, shades, typo, TextField} from '../material-native';

export default class TextFields extends PureComponent {
	static navigationOptions = {
		title: 'Text Fields',
	};

	state = {
		invalid: 'Invalid',
		disabled: 'Disabled',
		requiredError: false,
	};

	_onChange = Object.create(null);

	_valueProps = (key) => {
		this._onChange[key] = this._onChange[key] || ((value) => {
			this.setState({[key]: value});
		});

		return {
			onChangeText: this._onChange[key],
			value: this.state[key],
		};
	};

	render() {
		return (
			<ScrollView style={styles.root} contentContainerStyle={styles.container}>
				<Text style={styles.subhead}>Labeled field</Text>
				<TextField
					{...this._valueProps('labeled')}
					label='Label'
					helper='Helper text' />

				<Text style={styles.subhead}>Placeholder only</Text>
				<TextField
					{...this._valueProps('placeholder')}
					placeholder='Placeholder'
					helper='Helper text' />

				<Text style={styles.subhead}>Label and placeholder</Text>
				<TextField
					{...this._valueProps('labeledPlaceholder')}
					label='Label'
					placeholder='Placeholder'
					helper='Helper text' />

				<Text style={styles.subhead}>Multiline</Text>
				<TextField
					{...this._valueProps('multiline')}
					label='Label'
					helper='Duis convallis risus a nulla hendrerit rutrum. Proin in posuere dolor. Fusce luctus ipsum vitae.'
					multiline />

				<Text style={styles.subhead}>Disabled field</Text>
				<TextField
					{...this._valueProps('disabled')}
					label='Label'
					helper='Helper text'
					disabled />

				<Text style={styles.subhead}>Invalid field</Text>
				<TextField
					{...this._valueProps('invalid')}
					label='Label'
					helper='Helper text'
					error={this.state.invalid === 'Invalid' && 'Invalid text'} />

				<Text style={styles.subhead}>Required field</Text>
				<TextField
					{...this._valueProps('required')}
					label='Label *'
					helper='Helper text'
					onEndEditing={() => this.setState({requiredError: !this.state.required})}
					error={this.state.requiredError && 'Label is required'} />

				<Text style={styles.subhead}>Character counter</Text>
				<TextField
					{...this._valueProps('characterCounter')}
					label='Label'
					maxLength={100} />

				<Text style={styles.subhead}>Soft character counter</Text>
				<TextField
					{...this._valueProps('softCharacterCounter')}
					label='Label'
					softMaxLength={100} />

				<Text style={styles.subhead}>Prefixes & suffixes</Text>
				<TextField
					{...this._valueProps('amount')}
					label='Amount'
					prefix='$' />
				<TextField
					{...this._valueProps('weight')}
					label='Weight'
					suffix='kg' />
				<TextField
					{...this._valueProps('emailUsername')}
					label='Email address'
					suffix='@example.com' />


				<Text style={styles.subhead}>Dense</Text>
				<TextField
					{...this._valueProps('dense')}
					label='Label'
					helper='Helper text'
					dense />
				<TextField
					{...this._valueProps('densePlaceholder')}
					label='Label'
					placeholder='Placeholder'
					helper='Helper text'
					dense />

				<Text style={styles.subhead}>Dense multiline</Text>
				<TextField
					{...this._valueProps('denseMultiline')}
					label='Label'
					helper='Helper text'
					dense
					multiline />

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
		padding: 16,
	},
	subhead: {
		...typo.subhead,
		color: shades.dark.secondaryText,
		paddingVertical: 8,
		flexDirection: 'row',
	},
});
