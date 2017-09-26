'use strict';
import * as typo from '../typo';

test('typo module matches snapshot', () => {
	expect(typo).toMatchSnapshot();
});
