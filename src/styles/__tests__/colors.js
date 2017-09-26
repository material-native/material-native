'use strict';
import * as colors from '../colors';

test('all color values are hex colors', () => {
	for ( const key in colors ) {
		expect(colors[key]).toMatch(/^#[a-fA-F0-9]{6}$/);
	}
});

test('colors.white and colors.black are present', () => {
	expect(colors).toHaveProperty('black', '#000000');
	expect(colors).toHaveProperty('white', '#FFFFFF');
});

test('colors appears to match the material palette', () => {
	const colorGroups = [
		'red',
		'pink',
		'purple',
		'deepPurple',
		'indigo',
		'blue',
		'lightBlue',
		'cyan',
		'teal',
		'green',
		'lightGreen',
		'lime',
		'yellow',
		'amber',
		'orange',
		'deepOrange',
		'brown',
		'grey',
		'blueGrey'
	];
	const colorShades = [
		'50',
		'100',
		'200',
		'300',
		'400',
		'500',
		'600',
		'700',
		'800',
		'900',
		'A100',
		'A200',
		'A400',
		'A700'
	];

	for ( const colorGroup of colorGroups ) {
		for ( const shade of colorShades ) {
			if ( shade.startsWith('A') && ['brown', 'grey', 'blueGrey'].includes(colorGroup) ) continue;
			expect(colors).toHaveProperty(colorGroup + shade);
		}
	}
});
