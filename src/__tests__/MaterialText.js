'use strict';
import React from 'react';
import MaterialTheme from '../styles/MaterialTheme';
import ThemeProvider from '../styles/ThemeProvider';
import MaterialText from '../MaterialText';

import ReactTestRenderer from 'react-test-renderer';
import ToJSX from 'react-element-to-jsx-string';

const theme = new MaterialTheme({});

/* eslint-disable react/jsx-key */
function typoClassSnapshots(props) {
	const typoClasses = [
		'display4',
		'display3',
		'display2',
		'display1',
		'headline',
		'title',
		'subhead',
		'body2',
		'body1',
		'caption',
		'button'
	];

	return typoClasses.map((typoClass) => (
		<MaterialText {...props} {...{[typoClass]: true}}>...</MaterialText>
	));
}

const snapshotTests = [
	<MaterialText>...</MaterialText>,
	<MaterialText secondary>...</MaterialText>,
	<MaterialText disabled>...</MaterialText>,
	<MaterialText hint>...</MaterialText>,
	<MaterialText dark>...</MaterialText>,
	<MaterialText dark secondary>...</MaterialText>,
	<MaterialText dark disabled>...</MaterialText>,
	<MaterialText dark hint>...</MaterialText>,
	<MaterialText light>...</MaterialText>,
	<MaterialText light secondary>...</MaterialText>,
	<MaterialText light disabled>...</MaterialText>,
	<MaterialText light hint>...</MaterialText>,
	<MaterialText color='#123456'>...</MaterialText>,
	...typoClassSnapshots({}),
	...typoClassSnapshots({dense: true}),
	...typoClassSnapshots({tall: true})
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
