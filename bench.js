'use strict';
/* global bench */
const fs = require('fs');
const stripCssComments = require('.');

const fixture = fs.readFileSync('fixture.css', 'utf8');

bench('strip CSS comments', () => {
	stripCssComments(fixture);
});

bench('preserve option', () => {
	stripCssComments(fixture, {preserve: /^!/});
});
