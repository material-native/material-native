'use strict';
import elevation from '../elevation';
import {Platform} from 'react-native';

const PlatformOS = Platform.OS;
beforeEach(() => {
	Platform.OS = PlatformOS;
});
afterEach(() => {
	Platform.OS = PlatformOS;
});

describe('Android', () => {
	for ( const n of [0, 1, 2, 3, 4, 6, 8, 9, 12, 16, 24] ) {
		test(`elevation(${n}) matches snapshot`, () => {
			Platform.OS = 'android';
			expect(elevation(n)).toMatchSnapshot();
		});
	}
});

describe('iOS', () => {
	for ( const n of [0, 1, 2, 3, 4, 6, 8, 9, 12, 16, 24] ) {
		test(`elevation(${n}) matches snapshot`, () => {
			Platform.OS = 'ios';
			expect(elevation(n)).toMatchSnapshot();
		});
	}
});
