'use strict';
import PropTypes from 'prop-types';

export default ({
	Observable: PropTypes.shape({
		subscribe: PropTypes.func,
	}),
});
