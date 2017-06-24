'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {colors, shades, typo, CoreCheckbox, Checkbox, LabeledCheckbox} from '../material-native';

export default class Checkboxes extends PureComponent {
	static navigationOptions = {
		title: 'Checkboxes',
	};

	state = {
		checkState: -1,
		standalone: false,
		standaloneAccent: false,
		labeled: false,
		labeledAccent: false,
	};

	componentWillMount() {
		this.step();
	}

	componentWillUnmount() {
		clearTimeout(this._stepTimeout);
	}

	checkStates = [
		{},
		{checked: true},
		{},
		{indeterminate: true},
		{},
		{checked: true},
		{indeterminate: true}
	];

	step = () => {
		let {checkState} = this.state;
		checkState++;

		if ( checkState > this.checkStates.length-1 ) {
			checkState = 0;
		}

		this.setState({checkState});

		this._stepTimeout = setTimeout(this.step, 2500);
	};

	render() {
		const {state} = this;
		const checkState = this.checkStates[state.checkState];

		return (
			<ScrollView style={styles.root} contentContainerStyle={styles.container}>
				<View style={styles.columns}>
					<View style={styles.column}>
						<Text style={styles.centerHeading}>
							Normal
						</Text>
						<View style={styles.row}>
							<CoreCheckbox />
							<CoreCheckbox
								checked />
							<CoreCheckbox
								indeterminate />
							<CoreCheckbox
								disabled />
							<CoreCheckbox
								disabled
								checked />
							<CoreCheckbox
								disabled
								indeterminate />
						</View>
					</View>
					<View style={styles.column}>
						<Text style={styles.centerHeading}>
							Colorized
						</Text>
						<View style={styles.row}>
							<CoreCheckbox
								colorized />
							<CoreCheckbox
								colorized
								checked />
							<CoreCheckbox
								colorized
								indeterminate />
							<CoreCheckbox
								colorized
								disabled />
							<CoreCheckbox
								colorized
								disabled
								checked />
							<CoreCheckbox
								colorized
								disabled
								indeterminate />
						</View>
					</View>
				</View>

				<Text style={styles.centerHeading}>
					Accent
				</Text>
				<View style={styles.columns}>
					<View style={styles.column}>
						<View style={styles.row}>
							<CoreCheckbox
								accent />
							<CoreCheckbox
								accent
								checked />
							<CoreCheckbox
								accent
								indeterminate />
							<CoreCheckbox
								accent
								disabled />
							<CoreCheckbox
								accent
								disabled
								checked />
							<CoreCheckbox
								accent
								disabled
								indeterminate />
						</View>
					</View>
					<View style={styles.column}>
						<View style={styles.row}>
							<CoreCheckbox
								accent
								colorized />
							<CoreCheckbox
								accent
								colorized
								checked />
							<CoreCheckbox
								accent
								colorized
								indeterminate />
							<CoreCheckbox
								accent
								colorized
								disabled />
							<CoreCheckbox
								accent
								colorized
								disabled
								checked />
							<CoreCheckbox
								accent
								colorized
								disabled
								indeterminate />
						</View>
					</View>
				</View>

				<View style={styles.columns}>
					<View style={styles.column}>
						<Text style={styles.centerHeading}>
							Standard
						</Text>

						<View style={styles.row}>
							<CoreCheckbox
								{...checkState} />
						</View>
					</View>
					<View style={styles.column}>
						<Text style={styles.centerHeading}>
							Animated
						</Text>

						<View style={styles.row}>
							<CoreCheckbox
								animated
								colorized
								{...checkState} />
						</View>
					</View>
				</View>

				<Text style={styles.subhead}>Standalone</Text>
				<View style={styles.columns}>
					<Checkbox
						checked={state.standalone}
						onChangeChecked={(checked) => this.setState({standalone: checked})} />
					<Checkbox
						accent
						checked={state.standaloneAccent}
						onChangeChecked={(checked) => this.setState({standaloneAccent: checked})} />
				</View>

				<Text style={styles.subhead}>Labeled</Text>
				<View style={styles.columns}>
					<LabeledCheckbox
						checked={state.labeled}
						onChangeChecked={(checked) => this.setState({labeled: checked})}
						label='Label' />
					<LabeledCheckbox
						accent
						checked={state.labeledAccent}
						onChangeChecked={(checked) => this.setState({labeledAccent: checked})}
						label='Label' />
				</View>
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
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	columns: {
		flexDirection: 'row',
	},
	column: {
		flex: 1,
	},
	centerHeading: {
		...typo.body2,
		textAlign: 'center',
	},
});
