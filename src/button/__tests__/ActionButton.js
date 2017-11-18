'use strict';
import React from 'react';
import MaterialTheme from '../../styles/MaterialTheme';
import ThemeProvider from '../../styles/ThemeProvider';
import Button from '../Button';
import {Icon} from '../../Icon';

import ReactTestRenderer from 'react-test-renderer';
import ToJSX from 'react-element-to-jsx-string';

const theme = new MaterialTheme({});

/* eslint-disable react/jsx-key */
const snapshotTests = [
	<Button text='Button' />,
	<Button text='Button' onPress={() => {}} />,
	<Button text='Button' onLongPress={() => {}} />,
	<Button text='Button' onAccessibilityTap={() => {}} />,
	<Button text='Button' onMagicTap={() => {}} />,
	<Button text='Button' accessibilityLabel='Button2' />,
	<Button text='Button' primary />,
	<Button text='Button' accent />,
	<Button text='Button' tintColor='#123456' />,
	<Button text='Button' disabled />,
	<Button icon={<Icon name='more-vert' />} />,
	<Button icon={<Icon name='more-vert' />} accessibilityLabel='Button2' />,
	<Button icon={<Icon name='more-vert' />} primary />,
	<Button icon={<Icon name='more-vert' />} accent />,
	<Button icon={<Icon name='more-vert' />} tintColor='#123456' />,
	<Button icon={<Icon name='more-vert' />} disabled />
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
