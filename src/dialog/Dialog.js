'use strict';
import React, {PureComponent} from 'react';
import DialogModal from './DialogModal';
import CoreDialog from './CoreDialog';

export default class Dialog extends PureComponent {
	render() {
		const {
			open,
			onRequestClose,
			...dialogProps
		} = this.props;

		return (
			<DialogModal
				open={open}
				onRequestClose={onRequestClose}>
				<CoreDialog
					{...dialogProps} />
			</DialogModal>
		);
	}
}
