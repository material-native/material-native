'use strict';
import React, {PureComponent} from 'react';
import MaterialTheme from '../styles/MaterialTheme';
import ThemeProvider from '../styles/ThemeProvider';
import {createIconComponent, Icon, CommunityIcon} from '../Icon';

import ReactTestRenderer from 'react-test-renderer';
import ToJSX from 'react-element-to-jsx-string';

const theme = new MaterialTheme({});

test('createIconComponent creates Icon components that follow Material Design', () => {
	let renderProps;
	class MyIconComponent extends PureComponent {
		render() {
			renderProps = this.props;
			return null;
		}
	}

	const MyMaterialIcon = createIconComponent(MyIconComponent, 'MyIcon');

	expect(MyMaterialIcon.displayName).toBe('withMaterialTheme(MyIcon)');
	ReactTestRenderer.create(
		<ThemeProvider theme={theme}>
			<MyMaterialIcon name='cube-outline' />
		</ThemeProvider>
	);
	expect(renderProps).toMatchObject({
		name: 'cube-outline',
		size: 24,
		color: 'rgba(0, 0, 0, 0.54)',
	});
});

/* eslint-disable react/jsx-key */
const snapshotTests = [
	<Icon name='add' />,
	<Icon name='add' primary />,
	<Icon name='add' accent />,
	<Icon name='add' dark />,
	<Icon name='add' light />,
	<Icon name='add' inactive />,
	<Icon name='add' inactive primary />,
	<Icon name='add' inactive accent />,
	<Icon name='add' inactive dark />,
	<Icon name='add' inactive light />,
	<Icon name='add' color='#123456' />,
	<Icon name='add' size={100} />,
	<CommunityIcon name='cube-outline' />
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

