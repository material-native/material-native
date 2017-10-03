'use strict';
import {mapValues} from 'lodash';
import * as easing from '../easing';

test('easing function results match snapshot', () => {
	const times = function *() {
		for ( let t = 0; t <= 10; ++t ) {
			yield t * 0.1;
		}
	};

	const results = mapValues(easing, (fn) => (
		Array.from(function *() {
			for ( const t of times() ) {
				yield fn(t);
			}
		}())
	));

	expect(results).toMatchSnapshot();
});
