'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {colors, shades, typo, MaterialText, TextField} from '../material-native';

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
				<MaterialText subhead secondary style={styles.subhead}>Labeled field</MaterialText>
				<TextField
					{...this._valueProps('labeled')}
					label='Label'
					helper='Helper text' />

				<MaterialText subhead secondary style={styles.subhead}>Placeholder only</MaterialText>
				<TextField
					{...this._valueProps('placeholder')}
					placeholder='Placeholder'
					helper='Helper text' />

				<MaterialText subhead secondary style={styles.subhead}>Label and placeholder</MaterialText>
				<TextField
					{...this._valueProps('labeledPlaceholder')}
					label='Label'
					placeholder='Placeholder'
					helper='Helper text' />

				<MaterialText subhead secondary style={styles.subhead}>Multiline</MaterialText>
				<TextField
					{...this._valueProps('multiline')}
					label='Label'
					helper='Duis convallis risus a nulla hendrerit rutrum. Proin in posuere dolor. Fusce luctus ipsum vitae.'
					multiline />

				<MaterialText subhead secondary style={styles.subhead}>Disabled field</MaterialText>
				<TextField
					{...this._valueProps('disabled')}
					label='Label'
					helper='Helper text'
					disabled />

				<MaterialText subhead secondary style={styles.subhead}>Invalid field</MaterialText>
				<TextField
					{...this._valueProps('invalid')}
					label='Label'
					helper='Helper text'
					error={this.state.invalid === 'Invalid' && 'Invalid text'} />

				<MaterialText subhead secondary style={styles.subhead}>Required field</MaterialText>
				<TextField
					{...this._valueProps('required')}
					label='Label *'
					helper='Helper text'
					onEndEditing={() => this.setState({requiredError: !this.state.required})}
					error={this.state.requiredError && 'Label is required'} />

				<MaterialText subhead secondary style={styles.subhead}>Character counter</MaterialText>
				<TextField
					{...this._valueProps('characterCounter')}
					label='Hard'
					maxLength={100} />
				<TextField
					{...this._valueProps('softCharacterCounter')}
					label='Soft'
					softMaxLength={100} />

				<MaterialText subhead secondary style={styles.subhead}>Prefixes & suffixes</MaterialText>
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

				<MaterialText subhead secondary style={styles.subhead}>Dense</MaterialText>
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

				<MaterialText subhead secondary style={styles.subhead}>Dense multiline</MaterialText>
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
		paddingVertical: 8,
		flexDirection: 'row',
	},
});
