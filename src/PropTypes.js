'use strict';
import PropTypes from 'prop-types';

export default ({
	...PropTypes,
	Observable: PropTypes.shape({
		subscribe: PropTypes.func,
	}),
});
