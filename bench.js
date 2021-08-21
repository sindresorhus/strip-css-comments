/* global bench */
import fs from 'node:fs';
import stripCssComments from './index.js';

const fixture = fs.readFileSync('fixture.css', 'utf8');

bench('strip CSS comments', () => {
	stripCssComments(fixture);
});

bench('preserve option', () => {
	stripCssComments(fixture, {preserve: /^!/});
});

bench('whitespace option', () => {
	stripCssComments(fixture, {whitespace: false});
});
