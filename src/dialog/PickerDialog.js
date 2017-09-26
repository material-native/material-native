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
			...dialogProps
		} = this.props;

		// @todo Manage selectedOption and call onConfirm(value) instead of using onChangeOption externally

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
