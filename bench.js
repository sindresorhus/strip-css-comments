/* global bench */
'use strict';
var fs = require('fs');
var stripCssComments = require('./');
var fixture = fs.readFileSync('fixture.css', 'utf8');

bench('strip CSS comments', function () {
	stripCssComments(fixture);
});
