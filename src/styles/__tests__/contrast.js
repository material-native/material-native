'use strict';
import * as contrast from '../contrast';

describe('detectTheme', () => {
	test('dark colors return a light theme', () => {
		expect(contrast.detectTheme('#000')).toBe('light');
		expect(contrast.detectTheme('#000', 'light')).toBe('light');
		expect(contrast.detectTheme('#000', 'dark')).toBe('light');
		expect(contrast.detectTheme('#333')).toBe('light');
	});

	test('light colors return a dark theme', () => {
		expect(contrast.detectTheme('#fff')).toBe('dark');
		expect(contrast.detectTheme('#fff', 'dark')).toBe('dark');
		expect(contrast.detectTheme('#fff', 'dark')).toBe('dark');
		expect(contrast.detectTheme('#CCC')).toBe('dark');
	});

	test('colors safe under both themes use preferTheme default', () => {
		expect(contrast.detectTheme('#888')).toBe('light');
		expect(contrast.detectTheme('#888', 'light')).toBe('light');
		expect(contrast.detectTheme('#888', 'dark')).toBe('dark');
	});
});
