'use strict';
import React from 'react';
import MaterialTheme from '../../styles/MaterialTheme';
import ThemeProvider from '../../styles/ThemeProvider';
import LabeledRadio from '../LabeledRadio';

import ReactTestRenderer from 'react-test-renderer';
import ToJSX from 'react-element-to-jsx-string';

const theme = new MaterialTheme({});

/* eslint-disable react/jsx-key */
const snapshotTests = [
	<LabeledRadio />,
	<LabeledRadio onLayout={() => {}} />,
	<LabeledRadio checked />,
	<LabeledRadio label='Label' />,
	<LabeledRadio label='Label' labelColor='#123456' />,
	<LabeledRadio label='Label' style={{width: 200}} /> // eslint-disable-line react-native/no-inline-styles
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

test('<LabeledRadio /> to have measure methods', () => {
	let instance;
	ReactTestRenderer.create(
		<ThemeProvider theme={theme}>
			<LabeledRadio ref={(ref) => instance = ref} />
		</ThemeProvider>
	);

	expect(instance).toBeDefined();
	expect(instance.measure).toBeInstanceOf(Function);
	expect(instance.measureInWindow).toBeInstanceOf(Function);
	expect(instance.measureLayout).toBeInstanceOf(Function);
});
