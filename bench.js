'use strict';
/* global bench */
var fs = require('fs');
var stripCssComments = require('./');

var fixture = fs.readFileSync('fixture.css', 'utf8');

bench('strip CSS comments', function () {
	stripCssComments(fixture);
});

bench('preserve option', function () {
	stripCssComments(fixture, {preserve: /^!/});
});
