'use strict';
import React from 'react';
import MaterialTheme from '../../styles/MaterialTheme';
import ThemeProvider from '../../styles/ThemeProvider';
import CoreRadio from '../CoreRadio';

import ReactTestRenderer from 'react-test-renderer';
import ToJSX from 'react-element-to-jsx-string';

const theme = new MaterialTheme({});

/* eslint-disable react/jsx-key */
const snapshotTests = [
	<CoreRadio />,
	<CoreRadio checked />,
	<CoreRadio disabled />,
	<CoreRadio disabled checked />,
	<CoreRadio accent checked />,
	<CoreRadio colorized />,
	<CoreRadio checked normalColor='#123456' />,
	<CoreRadio checked tintColor='#123456' />,
	<CoreRadio disabled disabledColor='#123456' />
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
