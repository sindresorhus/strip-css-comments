'use strict';
var through = require('through2');

function stripCssComments(str) {
	var currentChar = '';
	var insideString = false;
	var ret = '';

	for (var i = 0; i < str.length; i++) {
		currentChar = str[i];

		if (str[i - 1] !== '\\') {
			if (currentChar === '"' || currentChar === '\'') {
				if (insideString === currentChar) {
					insideString = false;
				} else if (!insideString) {
					insideString = currentChar;
				}
			}
		}

		// start /* type comment
		if (!insideString && currentChar + str[i + 1] === '/*') {
			// start skipping until we reach end of comment
			for (var j = i + 2; j < str.length; j++) {
				if (str[j] + str[j + 1] === '*/') {
					break;
				}
			}
			// skip i to the end of the comment
			i = j + 1;
			continue;
		}

		ret += currentChar;
	}

	return ret;
}

module.exports = function (str) {
	if (str && typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	if (str) {
		return stripCssComments(str);
	}

	return through(function (data, enc, cb) {
		var ret = stripCssComments(data.toString());
		cb(null, new Buffer(ret));
	});
};
