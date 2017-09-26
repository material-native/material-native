'use strict';
import React from 'react';
import MaterialTheme from '../../styles/MaterialTheme';
import ThemeProvider from '../../styles/ThemeProvider';
import CoreCheckbox from '../CoreCheckbox';

import ReactTestRenderer from 'react-test-renderer';
import ToJSX from 'react-element-to-jsx-string';

const theme = new MaterialTheme({});

/* eslint-disable react/jsx-key */
const snapshotTests = [
	<CoreCheckbox />,
	<CoreCheckbox checked />,
	<CoreCheckbox indeterminate />,
	<CoreCheckbox checked indeterminate />,
	<CoreCheckbox disabled />,
	<CoreCheckbox disabled checked />,
	<CoreCheckbox disabled indeterminate />,
	<CoreCheckbox accent checked />,
	<CoreCheckbox colorized />,
	<CoreCheckbox checked normalColor='#123456' />,
	<CoreCheckbox checked tintColor='#123456' />,
	<CoreCheckbox disabled disabledColor='#123456' />
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
