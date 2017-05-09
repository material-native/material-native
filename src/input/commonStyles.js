'use strict';
import {StyleSheet} from 'react-native';
import * as typo from '../styles/typo';
import Sizes from './Sizes';

export default StyleSheet.create({
	inputText: {
		...typo.fontNormal,
		fontSize: Sizes.normal.inputFontSize,
		lineHeight: 24,
		height: Sizes.normal.inputHeight,
	},
	denseText: {
		fontSize: Sizes.dense.inputFontSize,
		lineHeight: 20,
		height: Sizes.dense.inputHeight,
	},
});
