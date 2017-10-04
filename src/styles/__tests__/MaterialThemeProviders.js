/**
 * Covers ThemeProvider.js and withMaterialTheme.js
 */
'use strict';
import React, {PureComponent} from 'react';
import MaterialTheme from '../MaterialTheme';
import ThemeProvider from '../ThemeProvider';
import withMaterialTheme from '../withMaterialTheme';

import ReactTestRenderer from 'react-test-renderer';

const theme = new MaterialTheme({});
const theme1 = new MaterialTheme({
	primary: '#111111',
});
const theme2 = new MaterialTheme({
	primary: '#222222',
});

function makeMock() {
	const id = {};
	let renderProps;
	class MySourceComponent extends PureComponent {
		static staticFunction() {
			return id;
		}
		prototypeMethod() {
			return id;
		}
		instanceMethod = () => {
			return id;
		};

		getThis() {
			return this;
		}

		render() {
			renderProps = this.props;

			return null;
		}
	}

	const MyComponent = withMaterialTheme(MySourceComponent);

	let host;
	return {
		id,
		MySourceComponent,
		MyComponent,
		render(tree) {
			if ( host ) {
				host.update(tree);
			} else {
				host = ReactTestRenderer.create(tree);
			}

			return {
				props: renderProps,
			};
		},
	};
}

test('withMaterialTheme provides a materialTheme prop', () => {
	const {MyComponent, render} = makeMock();

	const result = render(
		<ThemeProvider theme={theme}>
			<MyComponent />
		</ThemeProvider>
	);

	expect(result.props).toHaveProperty('materialTheme');
	expect(result.props.materialTheme).not.toBeUndefined();
	expect(result.props.materialTheme).toBeInstanceOf(MaterialTheme);
});

test('materialTheme prop matches the theme passed to ThemeProvider', () => {
	const {MyComponent, render} = makeMock();

	const result = render(
		<ThemeProvider theme={theme}>
			<MyComponent />
		</ThemeProvider>
	);

	expect(result.props.materialTheme).toBe(theme);
});

test('withMaterialTheme provides a default MaterialTheme when ThemeProvider is not used', () => {
	const {MyComponent, render} = makeMock();

	const result = render(
		<MyComponent />
	);

	expect(result.props).toHaveProperty('materialTheme');
	expect(result.props.materialTheme).not.toBeUndefined();
	expect(result.props.materialTheme).toBeInstanceOf(MaterialTheme);
});

test("withMaterialTheme's materialTheme prop updates when ThemeProvider's theme prop is changed", () => {
	const {MyComponent, render} = makeMock();
	let result;

	result = render(
		<ThemeProvider theme={theme1}>
			<MyComponent />
		</ThemeProvider>
	);

	expect(result.props).toHaveProperty('materialTheme');
	expect(result.props.materialTheme).not.toBeUndefined();
	expect(result.props.materialTheme).toBe(theme1);

	result = render(
		<ThemeProvider theme={theme2}>
			<MyComponent />
		</ThemeProvider>
	);

	expect(result.props).toHaveProperty('materialTheme');
	expect(result.props.materialTheme).not.toBeUndefined();
	expect(result.props.materialTheme).toBe(theme2);
});

