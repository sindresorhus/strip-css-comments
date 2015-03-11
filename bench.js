'use strict';
var fs = require('fs');
var stripCssComments = require('./');
var fixture = fs.readFileSync('fixture.css');

bench('strip CSS comments', function () {
	stripCssComments(fixture);
});
