'use strict';
import React, {PureComponent} from 'react';
import {Platform, StyleSheet, InteractionManager, Animated, Easing, View} from 'react-native';
import withMaterialTheme from '../styles/withMaterialTheme';
import MaterialTouchable from './MaterialTouchable';
import * as colors from '../styles/colors';
import * as easing from '../easing';

const CoreRipple = withMaterialTheme(class CoreRipple extends PureComponent {
	static defaultProps = {
		rippleLocation: 'tapLocation',
		borderless: false,
		maskBorderRadius: 0,
		shadowAniEnabled: true,
	};

	constructor(props) {
		super(props);
		this._animatedTintOpacity = new Animated.Value(0);
		this._animatedRippleScale = new Animated.Value(0);
		this._animatedRippleOpacity = new Animated.Value(0);
	}

	// [Android] set initial size > 0 to avoid NPE
	// at `ReactViewBackgroundDrawable.drawRoundedBackgroundWithBorders`
	// @see https://github.com/facebook/react-native/issues/3069
	state = {
		width: 1,
		height: 1,
		maskBorderRadius: 0,
		shadowOffsetY: 1,
		ripple: { radii: 0, dia: 0, offset: { top: 0, left: 0 } },
	};

	componentWillUnmount() {
		this.tintInDelayTimeout && clearTimeout(this.tintInDelayTimeout);
		this._clearInteractionHandle();
	}

	_onLayout = (evt) => {
		const {nativeEvent: {layout: {width, height}}} = evt;
		if ( width !== this.state.width || height !== this.state.height ) {
			this.setState({
				width,
				height,
				...this._calcMaskLayer({width, height}),
			});
		}

		if ( this.props.onLayout ) {
			this.props.onLayout.call(this, evt);
		}
	};

	// update Mask layer's dimen
	_calcMaskLayer({width, height}) {
		const maskRadiiPercent = this.props.maskBorderRadiusInPercent;
		let maskBorderRadius = this.props.maskBorderRadius;

		if ( maskRadiiPercent ) {
			maskBorderRadius = Math.min(width, height) * 0.5 * maskRadiiPercent / 100;
		}

		return {maskBorderRadius};
	}

	// update Ripple layer's dimen
	_calcRippleLayer(x0, y0) {
		const {maskBorderRadiusInPercent} = this.props;
		const {width, height, maskBorderRadius} = this.state;
		let radii;
		let hotSpotX = x0;
		let hotSpotY = y0;

		if ( this.props.rippleLocation === 'center' ) {
			hotSpotX = width / 2;
			hotSpotY = height / 2;
		}

		// FIXME Workaround for Android not respect `overflow`
		// @see https://github.com/facebook/react-native/issues/3198
		if ( Platform.OS === 'android'
				&& this.props.rippleLocation === 'center'
				&& !this.props.borderless && maskBorderRadiusInPercent > 0 ) {
			// limit ripple to the bounds of mask
			radii = maskBorderRadius;
		} else {
			radii = Math.max(width, height) / 2;
		}

		return {
			ripple: {
				radii,
				dia: radii * 2,
				offset: {
					top: hotSpotY - radii,
					left: hotSpotX - radii,
				},
			},
		};
	}

	materialHighlightIn = () => {
		this.tintInDelayTimeout && clearTimeout(this.tintInDelayTimeout);

		// Fade in the tint
		this.tintInDelayTimeout = setTimeout(() => {
			Animated.timing(this._animatedTintOpacity, {
				toValue: 1,
				easing: easing.acceleration,
				duration: this.props.tintDuration || Math.max(10, this.touchable.touchableGetLongPressDelayMS()),
				useNativeDriver: true,
				isInteraction: false,
			}).start();
		}, 100);

		// enlarge the shadow, if enabled
		if ( this.props.shadowAniEnabled ) {
			// @fixme This feels strange, isn't this just an improper implementation of elevation raising
			this.setState({shadowOffsetY: 1.5});
		}
	};

	materialHighlightOut = ({nativeEvent: {locationX, locationY}}) => {
		// Cancel the fade in if the depress happens immediately
		this.tintInDelayTimeout && clearTimeout(this.tintInDelayTimeout);

		// Hold and interaction handle to delay heavy transitions long enough for
		// the user to see the ripple
		this._clearInteractionHandle(); // purge old handle in case of quick taps
		this._interactionHandle = InteractionManager.createInteractionHandle();

		this.setState(this._calcRippleLayer(locationX, locationY), () => {
			const duration = this.props.rippleDuration || 400;

			// Fade out the tint
			Animated.timing(this._animatedTintOpacity, {
				toValue: 0,
				easing: easing.sharp,
				duration,
				useNativeDriver: true,
				isInteraction: false,
			}).start();

			// scale down the shadow
			if ( this.props.shadowAniEnabled ) {
				this.setState({shadowOffsetY: 1});
			}

			// Start a ripple
			this._animatedRippleScale.setValue(0);
			this._animatedRippleOpacity.setValue(0);
			Animated.parallel([
				// scale up the ripple layer
				Animated.timing(this._animatedRippleScale, {
					toValue: 1,
					easing: Easing.linear,
					duration,
					useNativeDriver: true,
					isInteraction: false,
				}),
				Animated.sequence([
					// quickly fade in the ripple layer
					Animated.timing(this._animatedRippleOpacity, {
						toValue: 1,
						easing: easing.sharp,
						duration: 10,
						useNativeDriver: true,
						isInteraction: false,
					}),
					// fade out the ripple layer
					Animated.timing(this._animatedRippleOpacity, {
						toValue: 0,
						easing: Easing.linear,
						duration: duration - 10,
						useNativeDriver: true,
						isInteraction: false,
					})
				])
			]).start();

			// Only hold on to the ripple for 10% of the animation
			// Holding it for the entire ripple duration or allowing Animated to do so
			// makes things feel very unresponsive.
			// 10% is enough to get the ripple started and let the user see it.
			// The native driver is also able to continue the animation where any heavy
			// transition calculations may lock the JS thread.
			this._clearInteractionHandleTimeout = setTimeout(
				this._clearInteractionHandle,
				duration * 0.1);
		});
	};

	_clearInteractionHandle = () => {
		if ( !this._interactionHandle ) return;
		InteractionManager.clearInteractionHandle(this._interactionHandle);
		this._clearInteractionHandleTimeout && clearTimeout(this._clearInteractionHandleTimeout);
		this._interactionHandle = null;
		this._clearInteractionHandleTimeout = null;
	};

	_setTouchable = (ref) => {
		this.touchable = ref;
	};

	render() {
		const {
			children,
			materialTheme,
			maskBorderRadius, // eslint-disable-line no-unused-vars
			maskBorderRadiusInPercent, // eslint-disable-line no-unused-vars
			shadowAniEnabled,
			borderless,
			style,
			primary,
			accent,
			dark,
			light,
			...props
		} = this.props;

		let rippleColor;
		if ( primary ) {
			rippleColor = materialTheme.palette.primary;
		} else if ( accent ) {
			rippleColor = materialTheme.palette.accent;
		} else if ( dark ) {
			rippleColor = colors.white;
		} else if ( light ) {
			rippleColor = colors.black;
		} else {
			rippleColor = materialTheme.themeTone === 'dark' ? colors.white : colors.black;
		}

		let shadowStyle;
		if ( shadowAniEnabled ) {
			shadowStyle = {
				shadowOffset: {
					width: 0,
					height: this.state.shadowOffsetY,
				},
			};
		}

		const borderWidth = this.props.borderWidth || 0;

		return (
			<MaterialTouchable
				ref={this._setTouchable}
				{...props}
				style={[style, shadowStyle]}
				onLayout={this._onLayout}
				materialHighlightIn={this.materialHighlightIn}
				materialHighlightOut={this.materialHighlightOut}>
				{children}
				<View
					pointerEvents='none'
					style={[
						borderless ? styles.borderlessMaskLayer : styles.maskLayer,
						{
							width: this.state.width,
							height: this.state.height,
							borderRadius: this.state.maskBorderRadius,
						}
					]}>
					<Animated.View
						style={[
							styles.layer,
							{ // eslint-disable-line react-native/no-inline-styles
								backgroundColor: this.props.rippleColor || this.props.tintColor || rippleColor,
								opacity: this._animatedTintOpacity.interpolate({
									inputRange: [0, 1],
									outputRange: [0, 0.1],
								}),
								top: -borderWidth,
								left: -borderWidth,
								width: this.state.width,
								height: this.state.height,
								borderRadius: this.state.maskBorderRadius,
							}
						]} />
					<Animated.View
						style={[
							styles.layer,
							{
								backgroundColor: this.props.rippleColor || rippleColor,
								width: this.state.ripple.dia,
								height: this.state.ripple.dia,
								...this.state.ripple.offset,
								borderRadius: this.state.ripple.radii,
								opacity: this._animatedRippleOpacity.interpolate({
									inputRange: [0, 1],
									outputRange: [0, 0.1],
								}),
								transform: [
									{scale: this._animatedRippleScale}
								],
							}
						]} />
				</View>
			</MaterialTouchable>
		);
	}
});

const styles = StyleSheet.create({
	maskLayer: {
		position: 'absolute',
		overflow: 'hidden',
	},
	borderlessMaskLayer: {
		position: 'absolute',
		overflow: 'visible',
	},
	layer: {
		position: 'absolute',
	},
});

export default CoreRipple;
