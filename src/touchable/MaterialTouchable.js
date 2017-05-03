'use strict';
import React from 'react';
import {View, Touchable, NativeMethodsMixin} from 'react-native';
import invariant from 'fbjs/lib/invariant';

function ensurePositiveDelayProps(props) {
	invariant(
		!(props.delayPressIn < 0 || props.delayPressOut < 0 || props.delayLongPress < 0),
		'Touchable components cannot have negative delay properties'
	);
}

const PRESS_RETENTION_OFFSET = {top: 20, left: 20, right: 20, bottom: 30};

const NativeMethodsProxyMixin = {};
for ( const key in NativeMethodsMixin ) {
	NativeMethodsMixin[key] = function _methodProxy() {
		return this.ref && this.ref[key].apply(this.ref, arguments); // eslint-disable-line prefer-spread
	};
	NativeMethodsMixin[key].name = key;
}

const MaterialTouchable = React.createClass({ // eslint-disable-line react/prefer-es6-class
	mixins: [Touchable.Mixin, NativeMethodsProxyMixin],

	getInitialState() {
		return this.touchableGetInitialState();
	},

	componentDidMount() {
		ensurePositiveDelayProps(this.props);
	},

	componentWillReceiveProps(nextProps) {
		ensurePositiveDelayProps(nextProps);
	},

	touchableHandlePress(e) {
		this.props.materialPress && this.props.materialPress(e);
		this.props.onPress && this.props.onPress(e);
	},

	touchableHandleActivePressIn(e) {
		this._cancelMaterialHighlightOut = false;
		this.props.materialHighlightIn && this.props.materialHighlightIn(e);
		this.props.onPressIn && this.props.onPressIn(e);
	},

	touchableHandleActivePressOut(e) {
		if ( !this._cancelMaterialHighlightOut ) {
			this.props.materialHighlightOut && this.props.materialHighlightOut(e);
		}
		this.props.onPressOut && this.props.onPressOut(e);
	},

	touchableHandleLongPress(e) {
		this.props.materialLongPress && this.props.materialLongPress(e);
		if ( this.props.onLongPress && (this.props.onLongPress(e) !== false) ) {
			this._cancelMaterialHighlightOut = true;
			this.props.materialHighlightOut && this.props.materialHighlightOut(e);
		}
	},

	touchableGetPressRectOffset() {
		return this.props.pressRetentionOffset || PRESS_RETENTION_OFFSET;
	},

	touchableGetHitSlop() {
		return this.props.hitSlop;
	},

	touchableGetHighlightDelayMS() {
		return this.props.delayPressIn || 0;
	},

	touchableGetLongPressDelayMS() {
		return this.props.delayLongPress === 0
			? 0
			: this.props.delayLongPress || 500;
	},

	touchableGetPressOutDelayMS() {
		return this.props.delayPressOut || 0;
	},

	_setRef(ref) {
		this.node = ref;
	},

	render() {
		const {
			materialPress, // eslint-disable-line no-unused-vars
			materialHighlight, // eslint-disable-line no-unused-vars
			materialUnhighlight, // eslint-disable-line no-unused-vars
			materialLongPress, // eslint-disable-line no-unused-vars
			onPress, // eslint-disable-line no-unused-vars
			onPressIn, // eslint-disable-line no-unused-vars
			onPressOut, // eslint-disable-line no-unused-vars
			onLongPress, // eslint-disable-line no-unused-vars
			pressRetentionOffset, // eslint-disable-line no-unused-vars
			delayPressIn, // eslint-disable-line no-unused-vars
			delayLongPress, // eslint-disable-line no-unused-vars
			delayPressOut, // eslint-disable-line no-unused-vars
			children,
			...props
		} = this.props;

		return (
			<View
				ref={this._setRef}
				accessible
				{...props}
				onStartShouldSetResponder={this.touchableHandleStartShouldSetResponder}
				onResponderTerminationRequest={this.touchableHandleResponderTerminationRequest}
				onResponderGrant={this.touchableHandleResponderGrant}
				onResponderMove={this.touchableHandleResponderMove}
				onResponderRelease={this.touchableHandleResponderRelease}
				onResponderTerminate={this.touchableHandleResponderTerminate}>
				{children}
			</View>
		);
	},
});

export default MaterialTouchable;
