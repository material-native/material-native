'use strict';

const Sizes = {
	normal: {
		labelFontSize: 12,
		inputFontSize: 16,
		inputLineHeight: 24,
		paddingAboveInput: 4,
		paddingBelowInput: 8,
	},
	dense: {
		labelFontSize: 12,
		inputFontSize: 13,
		inputLineHeight: 20,
		paddingAboveInput: 4,
		paddingBelowInput: 8,
	},
};

for ( const dense of [false, true] ) {
	const sizes = Sizes[dense ? 'dense' : 'normal'];

	/**
	 * Height of the input field (text + padding above and below input)
	 */
	sizes.inputHeight = sizes.inputFontSize + sizes.paddingAboveInput + sizes.paddingBelowInput;

	/**
	 * Scale to use to shrink a label of 'fixed' size (large label text in place of input text)
	 * to be 'floating' size (smaller label above the input)
	 */
	sizes.floatingFontScale = sizes.labelFontSize / sizes.inputFontSize;

	/**
	 * Implicit line height of label after scale
	 */
	sizes.labelLineHeight = sizes.inputLineHeight * sizes.floatingFontScale;
}

export default Sizes;
