'use strict';
import * as wcag from '../wcag';

describe('detectTheme', () => {
	test('dark colors return a light theme', () => {
		expect(wcag.detectTheme('#000')).toBe('light');
		expect(wcag.detectTheme('#000', 'light')).toBe('light');
		expect(wcag.detectTheme('#000', 'dark')).toBe('light');
		expect(wcag.detectTheme('#333')).toBe('light');
	});

	test('light colors return a dark theme', () => {
		expect(wcag.detectTheme('#fff')).toBe('dark');
		expect(wcag.detectTheme('#fff', 'dark')).toBe('dark');
		expect(wcag.detectTheme('#fff', 'dark')).toBe('dark');
		expect(wcag.detectTheme('#CCC')).toBe('dark');
	});

	test('colors safe under both themes use preferTheme default', () => {
		expect(wcag.detectTheme('#888')).toBe('light');
		expect(wcag.detectTheme('#888', 'light')).toBe('light');
		expect(wcag.detectTheme('#888', 'dark')).toBe('dark');
	});
});
