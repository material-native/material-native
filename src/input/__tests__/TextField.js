'use strict';
import React from 'react';
import MaterialTheme from '../../styles/MaterialTheme';
import ThemeProvider from '../../styles/ThemeProvider';
import TextField from '../TextField';

import ReactTestRenderer from 'react-test-renderer';
import ToJSX from 'react-element-to-jsx-string';

const theme = new MaterialTheme({});

/* eslint-disable react/jsx-key, react-native/no-inline-styles */
const snapshotTests = [
	<TextField />,
	<TextField label='Label' />,
	<TextField label='Label' value='123' />,
	<TextField label='Label' multiline />,
	<TextField label='Label' disabled />,
	<TextField label='Label' light />,
	<TextField label='Label' dark />,
	<TextField label='Label' dense />,
	<TextField label='Label' prefix='$' />,
	<TextField label='Label' suffix='kg' />,
	<TextField label='Label' error='Error' />,
	<TextField label='Label' value='123' maxLength={3} />,
	<TextField label='Label' softMaxLength={3} />,
	<TextField label='Label' value='123456' softMaxLength={3} />,
	<TextField label='Label' style={{width: 100}} />,
	<TextField label='Label' inputStyle={{width: 100}} />,
	<TextField label='Label' tintColor='#123456' />,
	<TextField label='Label' errorColor='#123456' error='Error' />,
	<TextField label='Label' placeholder='Placeholder' placeholderTextColor='#123456' />
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
