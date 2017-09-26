'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import withMaterialTheme from '../styles/withMaterialTheme';
import ItemRipple from '../touchable/ItemRipple';
import RectRipple from '../touchable/RectRipple';
import CoreRadio from '../toggle/CoreRadio';
import elevation from '../styles/elevation';
import {detectTheme} from '../styles/wcag';
import * as typo from '../styles/typo';

class CoreDialogAction extends PureComponent {
	static defaultProps = {
		disabled: false,
	};

	render() {
		const {
			disabled,
			text,
			onPress,
			disabledColor,
			tintColor,
			stacked,
			style,
		} = this.props;

		const Ripple = stacked ? ItemRipple : RectRipple;

		return (
			<Ripple
				pointerEvents='box-only'
				style={[
					style,
					stacked ? styles.stackedAction : styles.action
				]}
				onPress={onPress}>
				<Text
					style={[
						stacked ? styles.stackedActionText : styles.actionText,
						{
							color: disabled
								? disabledColor
								: tintColor,
						}
					]}>
					{text}
				</Text>
			</Ripple>
		);
	}
}

class CoreDialogOption extends PureComponent {
	onPress = () => {
		this.props.onChangeOption && this.props.onChangeOption(this.props.value);
	};

	render() {
		const {
			label,
			checked,
			textColor,
			tintColor,
			style,
		} = this.props;

		return (
			<ItemRipple
				pointerEvents='box-only'
				style={[
					style,
					styles.optionItem
				]}
				onPress={this.onPress}>
				<View style={styles.optionAction}>
					<CoreRadio
						checked={checked}
						tintColor={tintColor} />
				</View>
				<Text
					style={[
						styles.optionLabel,
						{
							color: textColor,
						}
					]}>
					{label}
				</Text>
			</ItemRipple>
		);
	}
}

class CoreDialog extends PureComponent {
	static defaultProps = {
		stackedActions: false,
	};

	state = {
		startClipped: false,
		endClipped: false,
	};

	onChangeOption = (value) => {
		this.props.onChangeOption && this.props.onChangeOption(value);
	};

	_firstScroll = false;
	_scrollHeight = undefined;
	_scrollContentHeight = undefined;

	onPreScrollCalculation = () => {
		if ( this._firstScroll || !this._scrollHeight || !this._scrollContentHeight ) return;

		// At least on Android onScroll doesn't fire till a scroll actually happens, so we can't
		// rely on it to set the clipped content dividier on long lists.
		// Assume that scroll starts at y=0 and use onLayout and onScrollContentSizeChange to calculate
		// endClipped based on the layout and scroll content heights.
		const endClipped = this._scrollHeight < this._scrollContentHeight;
		if ( this.state.endClipped !== endClipped ) {
			this.setState({endClipped});
		}
	};

	onScrollContentSizeChange = (contentWidth, contentHeight) => {
		this._scrollContentHeight = contentHeight;
		this.onPreScrollCalculation();
	};

	onScrollLayout = ({nativeEvent: {layout: {height}}}) => {
		this._scrollHeight = height;
		this.onPreScrollCalculation();
	};

	onScroll = ({nativeEvent: {layoutMeasurement, contentSize, contentOffset}}) => {
		const {state} = this;
		const startClipped = contentOffset.y > 0;
		const endClipped = contentOffset.y + layoutMeasurement.height < contentSize.height;

		this._firstScroll = true;
		if ( state.startClipped !== startClipped || state.endClipped !== endClipped ) {
			this.setState({startClipped, endClipped});
		}
	};

	render() {
		const {
			materialTheme,
			title,
			contentText,
			selectedOption,
			options,
			content: contentBody,
			stackedActions,
			actions: explicitActions,
			affirmativeAction,
			dismissiveAction,
			style,
		} = this.props;
		const {
			startClipped,
			endClipped,
		} = this.state;

		const theme = materialTheme.dialog;
		const disabledColor = theme.disabledColor;
		const tintColor = theme.tintColor;

		let content;
		if ( contentBody ) {
			content = contentBody;
		} else if ( options ) {
			content = options.map(({value, label}) => (
				<CoreDialogOption
					{...{tintColor, value, label}}
					key={value}
					textColor={theme.optionTextColor}
					onChangeOption={this.onChangeOption}
					checked={selectedOption === value} />
			));
		} else if ( contentText ) {
			content = (
				<View
					style={[
						styles.contentBody,
						title && styles.contentBodyWithTitle
					]}>
					<Text
						style={[
							styles.contentBodyText,
							{
								color: theme.contentColor,
							}
						]}>
						{contentText}
					</Text>
				</View>
			);
		}

		let actions = explicitActions;
		if ( !actions && (dismissiveAction || affirmativeAction)) {
			actions = stackedActions
				? [affirmativeAction, dismissiveAction]
				: [dismissiveAction, affirmativeAction];

			actions = actions.filter((action) => action);
		}

		let buttons;
		if ( actions ) {
			if ( stackedActions ) {
				buttons = (
					<View style={styles.stackedActions}>
						{actions.map((props, i) => (
							<CoreDialogAction
								key={i}
								{...props}
								{...{disabledColor, tintColor}}
								stacked
								styles={false} />
						))}
					</View>
				);
			} else {
				buttons = (
					<View style={styles.actions}>
						{actions.map((props, i) => (
							<CoreDialogAction
								key={i}
								{...props}
								{...{disabledColor, tintColor}}
								stacked={false}
								style={i > 0 && styles.actionSpacing} />
						))}
					</View>
				);
			}
		}

		// @todo If using options the scroll view should auto scroll to the option

		return (
			<View
				style={[
					style,
					styles.root,
					{
						...elevation(24),
						backgroundColor: theme.background,
					}
				]}>
				{title &&
					<View style={styles.title}>
						<Text
							style={[
								styles.titleText,
								{
									color: theme.title,
								}
							]}>
							{title}
						</Text>
					</View>}
				<ScrollView
					overScrollMode='auto'
					bounces
					indicatorStyle={detectTheme(theme.background) === 'dark' ? 'white' : 'black'}
					onLayout={this.onScrollLayout}
					onContentSizeChange={this.onScrollContentSizeChange}
					onScroll={this.onScroll}
					scrollEventThrottle={32}
					style={[
						startClipped && styles.startClippedScroll,
						endClipped && styles.endClippedScroll,
						{
							borderColor: materialTheme.dialog.divider,
						}
					]}>
					{content}
				</ScrollView>
				{buttons}
			</View>
		);
	}
}

export default withMaterialTheme(CoreDialog);

const styles = StyleSheet.create({
	root: {
		flexDirection: 'column',
		alignItems: 'stretch',
		borderRadius: 2,
		flex: -1,
	},
	title: {
		paddingHorizontal: 24,
		paddingTop: 24,
		paddingBottom: 20,
	},
	titleText: {
		...typo.title,
		marginTop: -(typo.title.lineHeight-typo.title.fontSize),
		marginBottom: -(typo.title.lineHeight-typo.title.fontSize)/2,
	},
	startClippedScroll: {
		borderTopWidth: 1,
		marginTop: -1,
	},
	endClippedScroll: {
		borderBottomWidth: 1,
		marginBottom: -1,
	},
	contentBody: {
		paddingHorizontal: 24,
		paddingTop: 20,
		paddingBottom: 24,
	},
	contentBodyWithTitle: {
		paddingTop: 0,
	},
	contentBodyText: {
		...typo.subhead,
	},
	optionItem: {
		height: 48,
		flexDirection: 'row',
		alignItems: 'center',
	},
	optionAction: {
		width: 72,
		paddingLeft: 24,
	},
	optionLabel: {
		...typo.subhead,
	},
	actions: {
		height: 52,
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'flex-end',
		padding: 8,
	},
	actionSpacing: {
		marginLeft: 8,
	},
	action: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 8,
		minWidth: 64,
	},
	actionText: {
		...typo.button,
		textAlign: 'center',
	},
	stackedActions: {
		flexDirection: 'column',
		alignItems: 'stretch',
		paddingBottom: 8,
	},
	stackedAction: {
		height: 48,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingHorizontal: 16,
	},
	stackedActionText: {
		...typo.button,
		textAlign: 'right',
	},
});
