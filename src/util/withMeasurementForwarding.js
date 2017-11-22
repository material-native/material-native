'use strict';

const _measureRef = '_measureRef';
const _setMeasureRef = '_setMeasureRef';
export default function withMeasurementForwarding(BaseComponent) {
	Object.defineProperty(
		BaseComponent.prototype,
		_setMeasureRef,
		{
			enumerable: false,
			get() {
				const setMeasureRef = (ref) => {
					this[_measureRef] = ref;
				};

				if ( BaseComponent.prototype !== this ) {
					Object.defineProperty(this, _setMeasureRef, {
						enumerable: false,
						value: setMeasureRef,
					});
				}

				return setMeasureRef;
			},
		}
	);

	for ( const method of ['measure', 'measureInWindow', 'measureLayout'] ) {
		Object.defineProperty(BaseComponent.prototype, method, {
			enumerable: false,
			value: function(...args) { // eslint-disable-line object-shorthand
				const ref = this[_measureRef];
				if ( !ref ) {
					console.warn(`@${BaseComponent.displayName || BaseComponent.name || 'withMeasurementForwarding'}#${method}(): measure ref is undefined`); // eslint-disable-line no-console
					return;
				}

				return ref[method](...args);
			},
		});
	}

	return BaseComponent;
}
