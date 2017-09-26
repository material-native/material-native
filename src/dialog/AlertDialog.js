'use strict';
import React, {PureComponent} from 'react';
import Dialog from './Dialog';

export default class AlertDialog extends PureComponent {
	render() {
		const {
			onRequestClose,
			message,
			actionText,
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
				affirmativeAction={{
					onPress: onRequestClose,
					text: actionText,
				}} />
		);
	}
}
