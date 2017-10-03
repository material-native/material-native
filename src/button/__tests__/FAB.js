'use strict';
import React from 'react';
import MaterialTheme from '../../styles/MaterialTheme';
import ThemeProvider from '../../styles/ThemeProvider';
import FAB from '../FAB';
import {Icon} from '../../Icon';

import ReactTestRenderer from 'react-test-renderer';
import ToJSX from 'react-element-to-jsx-string';

const theme = new MaterialTheme({});

/* eslint-disable react/jsx-key */
const snapshotTests = [
	<FAB icon={<Icon name='add' />} />,
	<FAB icon={<Icon name='add' />} onPress={() => {}} />,
	<FAB icon={<Icon name='add' />} onLongPress={() => {}} />,
	<FAB icon={<Icon name='add' />} onAccessibilityTap={() => {}} />,
	<FAB icon={<Icon name='add' />} onMagicTap={() => {}} />,
	<FAB icon={<Icon name='add' />} primary solid={false} />,
	<FAB icon={<Icon name='add' />} accent solid={false} />,
	<FAB icon={<Icon name='add' />} tintColor='#123456' solid={false} />,
	<FAB icon={<Icon name='add' />} solid />,
	<FAB icon={<Icon name='add' />} primary />,
	<FAB icon={<Icon name='add' />} accent />,
	<FAB icon={<Icon name='add' />} tintColor='#123456' />,
	<FAB icon={<Icon name='add' />} mini primary solid={false} />,
	<FAB icon={<Icon name='add' />} mini accent solid={false} />,
	<FAB icon={<Icon name='add' />} mini tintColor='#123456' solid={false} />,
	<FAB icon={<Icon name='add' />} mini solid />,
	<FAB icon={<Icon name='add' />} mini primary />,
	<FAB icon={<Icon name='add' />} mini accent />,
	<FAB icon={<Icon name='add' />} mini tintColor='#123456' />
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
