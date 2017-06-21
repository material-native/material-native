'use strict';
import React, {PureComponent} from 'react';
import {Platform, StyleSheet, View, TextInput} from 'react-native';
import withMaterialTheme from '../styles/withMaterialTheme';
import shades from '../styles/shades';
import FloatingLabel from './FloatingLabel';
import Underline from './Underline';
import HelperText from './HelperText';
import InsetText from './InsetText';
import Sizes from './Sizes';
import commonStyles from './commonStyles';

class TextField extends PureComponent {
	static defaultProps = {
		dense: false,
		disabled: false,
		transitionDuration: 200,
	};

	state = {
		focused: false,
		lines: 1,
		valueLength: 0,
		contentHeight: 0,
	};

	componentWillMount() {
		const value = typeof this.props.value === 'string'
			? this.props.value
			: this.props.defaultValue;

		this.setState({valueLength: typeof value === 'string' ? value.length : 0});
	}

	componentWillReceiveProps(props) {
		if ( typeof props.value === 'string' ) {
			this._valueLength(props.value);
		}
	}

	_valueLength(value) {
		const valueLength = typeof value === 'string' ? value.length : 0;

		if ( valueLength !== this.state.valueLength ) {
			this.setState({valueLength});
		}
	}

	_setInputRef = (ref) => {
		this._inputRef = ref;
	};

	getInputNode() { return this._inputRef; }
	focus(...args) { return this._inputRef && this._inputRef.focus(...args); }
	blur(...args) { return this._inputRef && this._inputRef.blur(...args); }
	isFocused(...args) { return this._inputRef && this._inputRef.isFocused(...args); }
	clear(...args) { return this._inputRef && this._inputRef.clear(...args); }

	_onFocus = (e) => {
		this.setState({focused: true});
		this.props.onFocus && this.props.onFocus(e);
	};

	_onBlur = (e) => {
		this.setState({focused: false});
		this.props.onBlur && this.props.onBlur(e);
	};

	_onContentSizeChange = (e) => {
		const {nativeEvent: {contentSize: {height}}} = e;

		// Calculate lines on mount
		this._calculateContentHeight(height);

		this.props._onContentSizeChange && this.props._onContentSizeChange(e);
	};

	_onChange = (e) => {
		const {nativeEvent: {contentSize: {height}={}, text}} = e;

		if ( typeof this.props.value !== 'string' ) {
			this._valueLength(text);
		}

		if ( this.props.multiline && height ) {
			// Recalculate height on content change
			this._calculateContentHeight(height);
		}

		this.props.onChange && this.props.onChange(e);
	};

	_calculateContentHeight(contentHeight) {
		if ( this.state.contentHeight !== contentHeight ) {
			this.setState({contentHeight});
		}
	}

	render() {
		const {
			materialTheme,
			style,
			inputStyle,
			allowFontScaling,
			maxLength,
			softMaxLength,
			multiline,
			transitionDuration,
			dense,
			disabled,
			label,
			prefix,
			suffix,
			helper,
			error,
			light,
			dark,
			tintColor: tintColorOverride,
			errorColor: errorColorOverride,
			placeholderTextColor: placeholderTextColorOverride,
			...inputProps, // eslint-disable-line comma-dangle
		} = this.props;
		const {
			focused,
			valueLength,
			contentHeight,
		} = this.state;

		const sizes = dense ? Sizes.dense : Sizes.normal;

		const theme = dark && 'dark' || light && 'light' || materialTheme.input.theme;
		const tintColor = tintColorOverride || materialTheme.input.tintColor;
		const errorColor = errorColorOverride || materialTheme.input.errorColor;
		const placeholderTextColor = placeholderTextColorOverride || shades[theme].hintText;
		// @todo Automatically set selectionColor

		const isLabelFloating = !!label && (focused || (valueLength > 0) || !!this.props.placeholder);
		const invalid = !!(error || (maxLength && valueLength > maxLength) || (softMaxLength && valueLength > softMaxLength));

		const floatingLabel = label && (
			<FloatingLabel
				{...{allowFontScaling, transitionDuration, dense, disabled, focused, tintColor, errorColor}}
				normalColor={shades[theme].secondaryText}
				floating={isLabelFloating}
				invalid={invalid}
				text={label} />
		);

		return (
			<View
				style={[
					dense ? styles.denseRoot : styles.root,
					style
				]}>
				<View
					style={[
						styles.container,
						label && (dense ? styles.withDenseLabel : styles.withLabel)
					]}>
					<View
						style={styles.inputContainer}>
						{prefix &&
							<InsetText
								{...{dense, transitionDuration}}
								floating={isLabelFloating}
								color={shades[theme].secondaryText}
								prefix
								text={prefix} />}
						<TextInput
							ref={this._setInputRef}
							{...inputProps}
							{...{allowFontScaling, multiline, maxLength, placeholderTextColor}}
							style={[
								styles.input,
								commonStyles.inputText,
								dense && commonStyles.denseText,
								multiline && {
									height: Math.max(
										Platform.OS === 'ios'
											? contentHeight + sizes.paddingAboveInput // iOS has some extra bottom spacing so drop the paddingBelowInput
											: contentHeight + sizes.paddingAboveInput + sizes.paddingBelowInput,
										sizes.inputHeight
									),
								},
								inputStyle
							]}
							onFocus={this._onFocus}
							onBlur={this._onBlur}
							onContentSizeChange={multiline ? this._onContentSizeChange : this.props.onContentSizeChange}
							onChange={this._onChange}
							editable={!disabled}
							underlineColorAndroid='transparent' />
						{suffix &&
							<InsetText
								{...{dense, transitionDuration}}
								floating={isLabelFloating}
								color={shades[theme].secondaryText}
								suffix
								text={suffix} />}
					</View>
					<Underline
						{...{disabled, focused}}
						invalid={invalid}
						normalColor={shades[theme].fieldBottomLine}
						{...{tintColor, errorColor, transitionDuration}} />
					<HelperText
						length={maxLength || softMaxLength ? valueLength : undefined}
						maxLength={maxLength || softMaxLength}
						normalColor={shades[theme].secondaryText}
						{...{allowFontScaling, errorColor, transitionDuration, dense, helper, error}} />
					{floatingLabel}
				</View>
			</View>
		);
	}
}

export default withMaterialTheme(TextField);

const styles = StyleSheet.create({
	root: {
		marginTop: 16,
	},
	denseRoot: {
		marginTop: 8,
	},
	container: {
		position: 'relative',
		flexDirection: 'column',
		alignItems: 'stretch',
	},
	withLabel: {
		paddingTop: Sizes.normal.labelLineHeight,
	},
	withDenseLabel: {
		paddingTop: Sizes.dense.labelLineHeight,
	},
	inputContainer: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		alignItems: 'stretch',
	},
	input: {
		flex: 1,
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
});
