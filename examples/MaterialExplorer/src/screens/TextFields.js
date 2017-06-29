'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {colors, Subhead, TextField} from '../material-native';

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
				<Subhead
					style={styles.subhead}
					secondary
					text='Labeled field' />
				<TextField
					{...this._valueProps('labeled')}
					label='Label'
					helper='Helper text' />

				<Subhead
					style={styles.subhead}
					secondary
					text='Placeholder only' />
				<TextField
					{...this._valueProps('placeholder')}
					placeholder='Placeholder'
					helper='Helper text' />

				<Subhead
					style={styles.subhead}
					secondary
					text='Label and placeholder' />
				<TextField
					{...this._valueProps('labeledPlaceholder')}
					label='Label'
					placeholder='Placeholder'
					helper='Helper text' />

				<Subhead
					style={styles.subhead}
					secondary
					text='Multiline' />
				<TextField
					{...this._valueProps('multiline')}
					label='Label'
					helper='Duis convallis risus a nulla hendrerit rutrum. Proin in posuere dolor. Fusce luctus ipsum vitae.'
					multiline />

				<Subhead
					style={styles.subhead}
					secondary
					text='Disabled field' />
				<TextField
					{...this._valueProps('disabled')}
					label='Label'
					helper='Helper text'
					disabled />

				<Subhead
					style={styles.subhead}
					secondary
					text='Invalid field' />
				<TextField
					{...this._valueProps('invalid')}
					label='Label'
					helper='Helper text'
					error={this.state.invalid === 'Invalid' && 'Invalid text'} />

				<Subhead
					style={styles.subhead}
					secondary
					text='Required field' />
				<TextField
					{...this._valueProps('required')}
					label='Label *'
					helper='Helper text'
					onEndEditing={() => this.setState({requiredError: !this.state.required})}
					error={this.state.requiredError && 'Label is required'} />

				<Subhead
					style={styles.subhead}
					secondary
					text='Character counter' />
				<TextField
					{...this._valueProps('characterCounter')}
					label='Hard'
					maxLength={100} />
				<TextField
					{...this._valueProps('softCharacterCounter')}
					label='Soft'
					softMaxLength={100} />

				<Subhead
					style={styles.subhead}
					secondary
					text='Prefixes & suffixes' />
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

				<Subhead
					style={styles.subhead}
					secondary
					text='Dense' />
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

				<Subhead
					style={styles.subhead}
					secondary
					text='Dense multiline' />
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
		paddingHorizontal: 0,
	},
});
