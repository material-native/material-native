'use strict';
const fs = require('fs');
const gulp = require('gulp');
const request = require('request');
const cheerio = require('cheerio');
const camelCase = require('lodash/camelCase');

/**
 * Generate the Material Palette colors by fetching them directly from
 * the Material Design guideline.
 */
gulp.task('gen:colors', (cb) => {
	request('https://material.io/guidelines/style/color.html', function (err, response, body) {
		if ( err ) cb(err);
		const colors = [];
		const $ = cheerio.load(body, {normalizeWhitespace: true, decodeEntities: true});
		$('.color-palette section.color-group').each(function() {
			const colorName = $(this).find('.main-color .name').text();
			if ( colorName ) {
				if ( /[^a-z ]/i.test(colorName) ) throw new Error(`Invalid color name: "${colorName}"`);
				$(this).find('.color:not(.main-color)').each(function() {
					const shade = $(this).find('.shade').text();
					const hex = $(this).find('.hex').text();

					if ( /[^A\d]/.test(shade)) throw new Error(`Invalid shade: "${shade}"`);
					if ( /[^#0-9a-f]/i.test(hex)) throw new Error(`Invalid hex: "${hex}"`);
					colors.push([camelCase(colorName) + shade, hex]);
				});
			} else {
				$(this).find('.color').each(function() {
					const colorName = $(this).find('.shade').text();
					const hex = $(this).find('.hex').text();

					if ( /[^a-z ]/i.test(colorName) ) throw new Error(`Invalid color name: "${colorName}"`);
					if ( /[^#0-9a-f]/i.test(hex)) throw new Error(`Invalid hex: "${hex}"`);
					colors.push([camelCase(colorName), hex]);
				});
			}
		});

		let colorsFile = `'use strict';
			/**
			 * Material Color Palette values
			 * https://material.io/guidelines/style/color.html#color-color-palette
			 *
			 * WARNING: This file is dynamically generated, do not submit PRs directly against it
			 */
			\n`.replace(/^\t{3}/mg, '');

		colorsFile += colors.map(([name, hex]) => (
			`export const ${name} = '${hex}';`
		)).join('\n') + '\n';

		// colorsFile += `\nexport default ({${colors.map(([name]) => name).join(', ')}});\n`;

		fs.writeFileSync('src/styles/colors.js', colorsFile);
	});
});

gulp.task('gen', ['gen:colors']);
gulp.task('default', ['gen']);
