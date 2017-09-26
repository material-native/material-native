'use strict';
import React, {PureComponent} from 'react';
import Dialog from './Dialog';

export default class ConfirmDialog extends PureComponent {
	render() {
		const {
			onRequestClose,
			message,
			onConfirm,
			confirmDisabled,
			affirmativeText,
			dismissiveText,
			...dialogProps
		} = this.props;

		return (
			<Dialog
				{...dialogProps}
				onRequestClose={onRequestClose}
				contentBody={undefined}
				contentText={message}
				options={undefined}
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
