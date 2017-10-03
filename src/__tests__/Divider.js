'use strict';
import React from 'react';
import MaterialTheme from '../styles/MaterialTheme';
import ThemeProvider from '../styles/ThemeProvider';
import Divider from '../Divider';

import ReactTestRenderer from 'react-test-renderer';
import ToJSX from 'react-element-to-jsx-string';

const theme = new MaterialTheme({});

/* eslint-disable react/jsx-key */
const snapshotTests = [
	<Divider />,
	<Divider dark />,
	<Divider light />,
	<Divider inset />,
	<Divider inset dark />,
	<Divider inset light />
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
