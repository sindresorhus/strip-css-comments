#!/usr/bin/env node
'use strict';
var fs = require('fs');
var stdin = require('get-stdin');
var meow = require('meow');
var stripCssComments = require('./');

var cli = meow({
	help: [
		'Usage',
		'  strip-css-comments <input-file> > <output-file>',
		'  strip-css-comments < <input-string>',
		'',
		'Example',
		'  strip-css-comments src/app.css > dist/app.css'
	].join('\n')
}, {
	string: ['_']
});

function init(data) {
	console.log(stripCssComments(data));
}

if (process.stdin.isTTY) {
	if (!cli.input[0]) {
		console.error('Filepath required');
		process.exit(1);
	}

	init(fs.readFileSync(cli.input[0], 'utf8'));
} else {
	stdin(init);
}
