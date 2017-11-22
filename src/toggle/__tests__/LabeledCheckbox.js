'use strict';
import React from 'react';
import MaterialTheme from '../../styles/MaterialTheme';
import ThemeProvider from '../../styles/ThemeProvider';
import LabeledCheckbox from '../LabeledCheckbox';

import ReactTestRenderer from 'react-test-renderer';
import ToJSX from 'react-element-to-jsx-string';

const theme = new MaterialTheme({});

/* eslint-disable react/jsx-key */
const snapshotTests = [
	<LabeledCheckbox />,
	<LabeledCheckbox onLayout={() => {}} />,
	<LabeledCheckbox checked />,
	<LabeledCheckbox indeterminate />,
	<LabeledCheckbox label='Label' />,
	<LabeledCheckbox label='Label' labelColor='#123456' />,
	<LabeledCheckbox label='Label' style={{width: 200}} /> // eslint-disable-line react-native/no-inline-styles
];
/* eslint-enable react/jsx-key */

for ( const root of snapshotTests ) {
	test(ToJSX(root, {maxInlineAttributesLineLength: Infinity}), () => {
		const host = ReactTestRenderer.create(
			<ThemeProvider theme={theme}>
				{root}
			</ThemeProvider>
		);
		expect(host.toJSON()).toMatchSnapshot();
	});
}

test('<LabeledCheckbox /> to have measure methods', () => {
	let instance;
	ReactTestRenderer.create(
		<ThemeProvider theme={theme}>
			<LabeledCheckbox ref={(ref) => instance = ref} />
		</ThemeProvider>
	);

	expect(instance).toBeDefined();
	expect(instance.measure).toBeInstanceOf(Function);
	expect(instance.measureInWindow).toBeInstanceOf(Function);
	expect(instance.measureLayout).toBeInstanceOf(Function);
});
