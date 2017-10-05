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
				ref: host.getInstance(),
				props: renderProps,
			};
		},
	};
}

describe('withMaterialTheme HOC', () => {
	test('Static functions are hoisted', () => {
		const {id, MyComponent} = makeMock();

		expect(MyComponent).toHaveProperty('staticFunction');
		expect(MyComponent.staticFunction()).toBe(id);
	});

	test('Prototype methods are hoisted', () => {
		const {id, MyComponent, render} = makeMock();

		const result = render(<MyComponent />);

		expect(result.ref.prototypeMethod()).toBe(id);
	});

	test('`this` in hoisted prototype methods is correct', () => {
		const {MyComponent, render} = makeMock();

		const result = render(<MyComponent />);

		expect(result.ref.getThis().props).toBe(result.props);
	});

	test('Unrelated props are passed through unmodified', () => {
		const {MyComponent, render} = makeMock();

		const props = {
			undefined,
			null: null,
			false: false,
			true: true,
			zero: 0,
			one: 1,
			empty: '',
			string: 'string',
			obj: {},
			arr: [],
			function: () => {},
		};

		const result = render(<MyComponent {...props} />);

		expect(result.props).toMatchObject(props);
	});
});

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

