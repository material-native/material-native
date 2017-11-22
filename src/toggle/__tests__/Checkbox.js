'use strict';
import React from 'react';
import MaterialTheme from '../../styles/MaterialTheme';
import ThemeProvider from '../../styles/ThemeProvider';
import Checkbox from '../Checkbox';

import ReactTestRenderer from 'react-test-renderer';
import ToJSX from 'react-element-to-jsx-string';

const theme = new MaterialTheme({});

/* eslint-disable react/jsx-key */
const snapshotTests = [
	<Checkbox />,
	<Checkbox onLayout={() => {}} />,
	<Checkbox checked />,
	<Checkbox disabled />,
	<Checkbox accent checked />
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

test('<Checkbox /> to have measure methods', () => {
	let instance;
	ReactTestRenderer.create(
		<ThemeProvider theme={theme}>
			<Checkbox ref={(ref) => instance = ref} />
		</ThemeProvider>
	);

	expect(instance).toBeDefined();
	expect(instance.measure).toBeInstanceOf(Function);
	expect(instance.measureInWindow).toBeInstanceOf(Function);
	expect(instance.measureLayout).toBeInstanceOf(Function);
});
