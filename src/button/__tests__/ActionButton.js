'use strict';
import React from 'react';
import MaterialTheme from '../../styles/MaterialTheme';
import ThemeProvider from '../../styles/ThemeProvider';
import ActionButton from '../ActionButton';
import {Icon} from '../../Icon';

import ReactTestRenderer from 'react-test-renderer';
import ToJSX from 'react-element-to-jsx-string';

const theme = new MaterialTheme({});

/* eslint-disable react/jsx-key */
const snapshotTests = [
	<ActionButton text='Button' />,
	<ActionButton text='Button' onLayout={() => {}} />,
	<ActionButton text='Button' onPress={() => {}} />,
	<ActionButton text='Button' onLongPress={() => {}} />,
	<ActionButton text='Button' onAccessibilityTap={() => {}} />,
	<ActionButton text='Button' onMagicTap={() => {}} />,
	<ActionButton text='Button' accessibilityLabel='Button2' />,
	<ActionButton text='Button' primary />,
	<ActionButton text='Button' accent />,
	<ActionButton text='Button' tintColor='#123456' />,
	<ActionButton text='Button' disabled />,
	<ActionButton icon={<Icon name='more-vert' />} />,
	<ActionButton icon={<Icon name='more-vert' />} narrow />,
	<ActionButton icon={<Icon name='more-vert' />} accessibilityLabel='Button2' />,
	<ActionButton icon={<Icon name='more-vert' />} primary />,
	<ActionButton icon={<Icon name='more-vert' />} accent />,
	<ActionButton icon={<Icon name='more-vert' />} tintColor='#123456' />,
	<ActionButton icon={<Icon name='more-vert' />} disabled />
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

test("<ActionButton text='Button' /> to have measure methods", () => {
	let instance;
	ReactTestRenderer.create(
		<ThemeProvider theme={theme}>
			<ActionButton ref={(ref) => instance = ref} text='Button' />
		</ThemeProvider>
	);

	expect(instance).toBeDefined();
	expect(instance.measure).toBeInstanceOf(Function);
	expect(instance.measureInWindow).toBeInstanceOf(Function);
	expect(instance.measureLayout).toBeInstanceOf(Function);
});
