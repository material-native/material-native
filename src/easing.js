'use strict';
import {Easing} from 'react-native';

export const standard = Easing.bezier(0.4, 0.0, 0.2, 1);
export const deceleration = Easing.bezier(0.0, 0.0, 0.2, 1);
export const acceleration = Easing.bezier(0.4, 0.0, 1, 1);
export const sharp = Easing.bezier(0.4, 0.0, 0.6, 1);
