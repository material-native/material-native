'use strict';
import React from 'react';
import {Image} from 'react-native';
import MaterialTheme from '../styles/MaterialTheme';
import ThemeProvider from '../styles/ThemeProvider';
import Avatar from '../Avatar';
import {CommunityIcon} from '../Icon';

import ReactTestRenderer from 'react-test-renderer';
import ToJSX from 'react-element-to-jsx-string';

const theme = new MaterialTheme({});

/* eslint-disable react/jsx-key */
const snapshotTests = [
	<Avatar text='A' />,
	<Avatar text='A' color='#123456' />,
	<Avatar text='A' textColor='#123456' />,
	<Avatar icon={<CommunityIcon name='account' />} />,
	<Avatar icon={<CommunityIcon name='account' />} color='#123456' />,
	<Avatar image={<Image source={{uri: 'http://example.com/example.png'}} />} />,
	<Avatar size={100} text='A' />,
	<Avatar size={100} icon={<CommunityIcon name='account' />} />,
	<Avatar size={100} image={<Image source={{uri: 'http://example.com/example.png'}} />} />
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
