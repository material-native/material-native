'use strict';
import React, {PureComponent} from 'react';
import MaterialTheme from '../MaterialTheme';
import ThemeProvider from '../../styles/ThemeProvider';
import withMaterialTheme from '../withMaterialTheme';

import ReactTestRenderer from 'react-test-renderer';

const theme = new MaterialTheme({});

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

	return {
		id,
		MySourceComponent,
		MyComponent,
		render(tree) {
			ReactTestRenderer.create(tree);

			return {
				props: renderProps,
			};
		},
	};
}

test('provides a materialTheme prop', () => {
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

test('materialTheme matches the theme passed to ThemeProvider', () => {
	const {MyComponent, render} = makeMock();

	const result = render(
		<ThemeProvider theme={theme}>
			<MyComponent />
		</ThemeProvider>
	);

	expect(result.props.materialTheme).toBe(theme);
});

test('provides a default MaterialTheme when ThemeProvider is not used', () => {
	const {MyComponent, render} = makeMock();

	const result = render(
		<MyComponent />
	);

	expect(result.props).toHaveProperty('materialTheme');
	expect(result.props.materialTheme).not.toBeUndefined();
	expect(result.props.materialTheme).toBeInstanceOf(MaterialTheme);
});
