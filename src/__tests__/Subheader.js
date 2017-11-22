'use strict';
import React from 'react';
import MaterialTheme from '../styles/MaterialTheme';
import ThemeProvider from '../styles/ThemeProvider';
import Subheader from '../Subheader';

import ReactTestRenderer from 'react-test-renderer';
import ToJSX from 'react-element-to-jsx-string';

const theme = new MaterialTheme({});

/* eslint-disable react/jsx-key, react-native/no-inline-styles */
const snapshotTests = [
	<Subheader text='Subhead' />,
	<Subheader text='Subhead' onLayout={() => {}} />,
	<Subheader text='Subhead' inset />,
	<Subheader text='Subhead' lines={2} />,
	<Subheader text='Subhead' dark />,
	<Subheader text='Subhead' light />,
	<Subheader text='Subhead' secondary />,
	<Subheader text='Subhead' secondary dark />,
	<Subheader text='Subhead' secondary light />,
	<Subheader text='Subhead' color='#123456' />,
	<Subheader text='Subhead' textStyle={{width: 100}} />
];
/* eslint-enable react/jsx-key, react-native/no-inline-styles */

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

test("<Subheader text='Subhead' /> to have measure methods", () => {
	let instance;
	ReactTestRenderer.create(
		<ThemeProvider theme={theme}>
			<Subheader text='Subhead' ref={(ref) => instance = ref} />
		</ThemeProvider>
	);

	expect(instance).toBeDefined();
	expect(instance.measure).toBeInstanceOf(Function);
	expect(instance.measureInWindow).toBeInstanceOf(Function);
	expect(instance.measureLayout).toBeInstanceOf(Function);
});
