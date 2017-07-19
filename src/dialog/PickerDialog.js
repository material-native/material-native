'use strict';
import React, {PureComponent} from 'react';
import Dialog from './Dialog';

export default class PickerDialog extends PureComponent {
	render() {
		const {
			onRequestClose,
			onConfirm,
			confirmDisabled,
			affirmativeText,
			dismissiveText,
			...dialogProps, // eslint-disable-line comma-dangle
		} = this.props;

		return (
			<Dialog
				{...dialogProps}
				onRequestClose={onRequestClose}
				contentBody={undefined}
				contentText={undefined}
				actions={undefined}
				dismissiveAction={{
					onPress: onRequestClose,
					text: dismissiveText,
				}}
				affirmativeAction={{
					disabled: confirmDisabled,
					onPress: onConfirm,
					text: affirmativeText,
				}} />
		);
	}
}
