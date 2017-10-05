'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialTheme from '../MaterialTheme';
import ThemeProvider from '../ThemeProvider';
import withMaterialStyles from '../withMaterialStyles';
import ReactTestRenderer from 'react-test-renderer';

const theme1 = new MaterialTheme({
	primary: '#111111',
});
const theme2 = new MaterialTheme({
	primary: '#222222',
});

function makeMock(mapThemeToStyles=() => ({})) {
	const id = {};
	const renderProps = {};
	class MySourceComponent extends PureComponent {
		static staticFunction() {
			return id;
		}

		static getLastProps(id='*') {
			return renderProps[id];
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
			renderProps[this.props.id||'*'] = this.props;

			return null;
		}
	}

	const MyComponent = withMaterialStyles(mapThemeToStyles)(MySourceComponent);

	return {
		id,
		MySourceComponent,
		MyComponent,
	};
}

describe('withMaterialStyles HOC', () => {
	test('Static functions are hoisted', () => {
		const {id, MyComponent} = makeMock();

		expect(MyComponent).toHaveProperty('staticFunction');
		expect(MyComponent.staticFunction()).toBe(id);
	});

	test('Prototype methods are hoisted', () => {
		const {id, MyComponent} = makeMock();

		const host = ReactTestRenderer.create(<MyComponent />);

		expect(host.getInstance().prototypeMethod()).toBe(id);
	});

	test('`this` in hoisted prototype methods is correct', () => {
		const {MyComponent} = makeMock();

		const host = ReactTestRenderer.create(<MyComponent />);

		expect(host.getInstance().getThis().props).toBe(MyComponent.getLastProps());
	});

	test('Unrelated props are passed through unmodified', () => {
		const {MyComponent} = makeMock();

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

		ReactTestRenderer.create(<MyComponent {...props} />);

		expect(MyComponent.getLastProps()).toMatchObject(props);
	});
});

test('withMaterialStyles provides an implicit materialTheme prop', () => {
	// Make sure the materialTheme from withMaterialTheme is always passed through so you don't have to use it twice
	const {MyComponent} = makeMock();

	ReactTestRenderer.create(
		<ThemeProvider theme={theme1}>
			<MyComponent />
		</ThemeProvider>
	);

	const props = MyComponent.getLastProps();
	expect(props).toHaveProperty('materialTheme');
	expect(props.materialTheme).not.toBeUndefined();
	expect(props.materialTheme).toBeInstanceOf(MaterialTheme);
});

test('withMaterialStyles creates materialStyles prop with styles', () => {
	const {MyComponent} = makeMock((materialTheme) => ({myStyle: {backgroundColor: materialTheme.palette.container}}));

	ReactTestRenderer.create(
		<ThemeProvider theme={theme1}>
			<MyComponent />
		</ThemeProvider>
	);

	const props = MyComponent.getLastProps();
	expect(props).toHaveProperty('materialStyles');
	expect(props.materialStyles).not.toBeUndefined();
	expect(props.materialStyles).toHaveProperty('myStyle');
	expect(StyleSheet.flatten(props.materialStyles.myStyle)).toMatchObject({
		backgroundColor: '#FFFFFF',
	});
});

test('styles are not changed unnecessarily across renders', () => {
	const {MyComponent} = makeMock((materialTheme) => ({myStyle: {backgroundColor: materialTheme.palette.container}}));

	const host = ReactTestRenderer.create(
		<ThemeProvider theme={theme1} a={1}>
			<MyComponent a={1} />
		</ThemeProvider>
	);

	const props1 = MyComponent.getLastProps();
	expect(props1).toHaveProperty('materialStyles');
	expect(props1.materialStyles).not.toBeUndefined();
	expect(props1.materialStyles).toHaveProperty('myStyle');

	host.update(
		<ThemeProvider theme={theme1} a={2}>
			<MyComponent a={2} />
		</ThemeProvider>
	);

	const props2 = MyComponent.getLastProps();
	expect(props2).toHaveProperty('materialStyles');
	expect(props2.materialStyles).not.toBeUndefined();
	expect(props2.materialStyles).toHaveProperty('myStyle');

	expect(props2.materialStyles.myStyle).toBe(props1.materialStyles.myStyle);
});

test('styles change when the theme is changed', () => {
	const {MyComponent} = makeMock((materialTheme) => ({myStyle: {backgroundColor: materialTheme.palette.container}}));

	const host = ReactTestRenderer.create(
		<ThemeProvider theme={theme1} a={1}>
			<MyComponent a={1} />
		</ThemeProvider>
	);

	const props1 = MyComponent.getLastProps();
	expect(props1).toHaveProperty('materialStyles');
	expect(props1.materialStyles).not.toBeUndefined();
	expect(props1.materialStyles).toHaveProperty('myStyle');

	host.update(
		<ThemeProvider theme={theme1} a={2}>
			<MyComponent a={2} />
		</ThemeProvider>
	);

	const props2 = MyComponent.getLastProps();
	expect(props2).toHaveProperty('materialStyles');
	expect(props2.materialStyles).not.toBeUndefined();
	expect(props2.materialStyles).toHaveProperty('myStyle');

	expect(props2.materialStyles.myStyle).toBe(props1.materialStyles.myStyle);
});

test('styles are not shared between separate components', () => {
	const {MyComponent: MyComponent1} = makeMock((materialTheme) => ({myStyle: {backgroundColor: materialTheme.palette.container}}));
	const {MyComponent: MyComponent2} = makeMock((materialTheme) => ({myStyle: {backgroundColor: materialTheme.palette.container}}));

	ReactTestRenderer.create(
		<ThemeProvider theme={theme1}>
			<View>
				<MyComponent1 />
				<MyComponent2 />
			</View>
		</ThemeProvider>
	);

	const props1 = MyComponent1.getLastProps();
	const props2 = MyComponent2.getLastProps();
	expect(props1).toHaveProperty('materialStyles');
	expect(props1.materialStyles).not.toBeUndefined();
	expect(props1.materialStyles).toHaveProperty('myStyle');
	expect(props2).toHaveProperty('materialStyles');
	expect(props2.materialStyles).not.toBeUndefined();
	expect(props2.materialStyles).toHaveProperty('myStyle');
	expect(props2.materialStyles.myStyle).not.toBe(props1.materialStyles.myStyle);
});

test('styles are shared between separate instances of the same component', () => {
	const {MyComponent} = makeMock((materialTheme) => ({myStyle: {backgroundColor: materialTheme.palette.container}}));

	ReactTestRenderer.create(
		<ThemeProvider theme={theme1}>
			<View>
				<MyComponent id='1' />
				<MyComponent id='2' />
			</View>
		</ThemeProvider>
	);

	const props1 = MyComponent.getLastProps('1');
	const props2 = MyComponent.getLastProps('2');
	expect(props1).toHaveProperty('materialStyles');
	expect(props1.materialStyles).not.toBeUndefined();
	expect(props1.materialStyles).toHaveProperty('myStyle');
	expect(props2).toHaveProperty('materialStyles');
	expect(props2.materialStyles).not.toBeUndefined();
	expect(props2.materialStyles).toHaveProperty('myStyle');
	expect(props2.materialStyles.myStyle).toBe(props1.materialStyles.myStyle);
});

test('styles are not shared between ThemeProviders', () => {
	const {MyComponent} = makeMock((materialTheme) => ({myStyle: {backgroundColor: materialTheme.palette.container}}));

	ReactTestRenderer.create(
		<ThemeProvider theme={theme1}>
			<View>
				<MyComponent id='1' />
				<ThemeProvider theme={theme1}>
					<MyComponent id='2' />
				</ThemeProvider>
			</View>
		</ThemeProvider>
	);

	const props1 = MyComponent.getLastProps('1');
	const props2 = MyComponent.getLastProps('2');
	expect(props1).toHaveProperty('materialStyles');
	expect(props1.materialStyles).not.toBeUndefined();
	expect(props1.materialStyles).toHaveProperty('myStyle');
	expect(props2).toHaveProperty('materialStyles');
	expect(props2.materialStyles).not.toBeUndefined();
	expect(props2.materialStyles).toHaveProperty('myStyle');
	expect(props2.materialStyles.myStyle).not.toBe(props1.materialStyles.myStyle);
});

test('styles do not constantly change when used in multiple ThemeProviders', () => {
	const {MyComponent} = makeMock((materialTheme) => ({myStyle: {backgroundColor: materialTheme.palette.container}}));

	const host = ReactTestRenderer.create(
		<ThemeProvider theme={theme1}>
			<View>
				<MyComponent id='1' a={1} />
				<ThemeProvider theme={theme2}>
					<MyComponent id='2' a={1} />
				</ThemeProvider>
			</View>
		</ThemeProvider>
	);

	const props1A = MyComponent.getLastProps('1');
	const props2A = MyComponent.getLastProps('2');
	expect(props1A).toHaveProperty('materialStyles');
	expect(props1A.materialStyles).not.toBeUndefined();
	expect(props1A.materialStyles).toHaveProperty('myStyle');
	expect(props2A).toHaveProperty('materialStyles');
	expect(props2A.materialStyles).not.toBeUndefined();
	expect(props2A.materialStyles).toHaveProperty('myStyle');

	host.update(
		<ThemeProvider theme={theme1}>
			<View>
				<MyComponent id='1' a={2} />
				<ThemeProvider theme={theme2}>
					<MyComponent id='2' a={2} />
				</ThemeProvider>
			</View>
		</ThemeProvider>
	);

	const props1B = MyComponent.getLastProps('1');
	const props2B = MyComponent.getLastProps('2');
	expect(props1B).toHaveProperty('materialStyles');
	expect(props1B.materialStyles).not.toBeUndefined();
	expect(props1B.materialStyles).toHaveProperty('myStyle');
	expect(props2B).toHaveProperty('materialStyles');
	expect(props2B.materialStyles).not.toBeUndefined();
	expect(props2B.materialStyles).toHaveProperty('myStyle');

	expect(props1B.materialStyles.myStyle).toBe(props1A.materialStyles.myStyle);
	expect(props2B.materialStyles.myStyle).toBe(props2A.materialStyles.myStyle);
});

test('withMaterialStyles still creates materialStyles when ThemeProvider is not used', () => {
	const {MyComponent} = makeMock((materialTheme) => ({myStyle: {backgroundColor: materialTheme.palette.container}}));

	ReactTestRenderer.create(
		<MyComponent />
	);

	const props = MyComponent.getLastProps();
	expect(props).toHaveProperty('materialStyles');
	expect(props.materialStyles).not.toBeUndefined();
	expect(props.materialStyles).toHaveProperty('myStyle');
	expect(StyleSheet.flatten(props.materialStyles.myStyle)).toMatchObject({
		backgroundColor: '#FFFFFF',
	});
});

test('styles are still not changed unnecessarily across renders when ThemeProvider is not used', () => {
	const {MyComponent} = makeMock((materialTheme) => ({myStyle: {backgroundColor: materialTheme.palette.container}}));

	const host = ReactTestRenderer.create(
		<MyComponent a={1} />
	);

	const props1 = MyComponent.getLastProps();
	expect(props1).toHaveProperty('materialStyles');
	expect(props1.materialStyles).not.toBeUndefined();
	expect(props1.materialStyles).toHaveProperty('myStyle');

	host.update(
		<MyComponent a={2} />
	);

	const props2 = MyComponent.getLastProps();
	expect(props2).toHaveProperty('materialStyles');
	expect(props2.materialStyles).not.toBeUndefined();
	expect(props2.materialStyles).toHaveProperty('myStyle');

	expect(props2.materialStyles.myStyle).toBe(props1.materialStyles.myStyle);
});

//  Separate components don't share styles
//  Separate instances of the same component share styles (need id keys for this)
//  Styles are changed on theme change
//  Styles are the same across renders
//  Styles do not continually change when used across multiple ThemeProviders
