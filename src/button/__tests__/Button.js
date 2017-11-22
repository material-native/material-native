'use strict';
import React from 'react';
import MaterialTheme from '../../styles/MaterialTheme';
import ThemeProvider from '../../styles/ThemeProvider';
import Button from '../Button';

import ReactTestRenderer from 'react-test-renderer';
import ToJSX from 'react-element-to-jsx-string';

const theme = new MaterialTheme({});

/* eslint-disable react/jsx-key */
const snapshotTests = [
	<Button text='Button' />,
	<Button text='Button' onLayout={() => {}} />,
	<Button text='Button' onPress={() => {}} />,
	<Button text='Button' onLongPress={() => {}} />,
	<Button text='Button' onAccessibilityTap={() => {}} />,
	<Button text='Button' onMagicTap={() => {}} />,
	<Button text='Button' primary />,
	<Button text='Button' accent />,
	<Button text='Button' tintColor='#123456' />,
	<Button text='Button' disabled />,
	<Button text='Button' disabled disabledColor='#123456' />,
	<Button text='Button' raised />,
	<Button text='Button' raised primary solid={false} />,
	<Button text='Button' raised accent solid={false} />,
	<Button text='Button' raised tintColor='#123456' solid={false} />,
	<Button text='Button' raised disabled />,
	<Button text='Button' raised solid />,
	<Button text='Button' raised primary />,
	<Button text='Button' raised accent />,
	<Button text='Button' raised tintColor='#123456' />,
	<Button text='Button' raised solid disabled />
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

test("<Button text='Button' /> to have measure methods", () => {
	let instance;
	ReactTestRenderer.create(
		<ThemeProvider theme={theme}>
			<Button ref={(ref) => instance = ref} text='Button' />
		</ThemeProvider>
	);

	expect(instance).toBeDefined();
	expect(instance.measure).toBeInstanceOf(Function);
	expect(instance.measureInWindow).toBeInstanceOf(Function);
	expect(instance.measureLayout).toBeInstanceOf(Function);
});
