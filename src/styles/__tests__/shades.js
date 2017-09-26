'use strict';
import shades from '../shades';

test('shades module matches snapshot', () => {
	expect(shades).toMatchSnapshot();
});
