'use strict';

test('main script has expected exports', () => {
	expect(Object.keys(require('../')).sort()).toMatchSnapshot();
});
