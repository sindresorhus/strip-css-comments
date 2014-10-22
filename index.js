'use strict';
module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	var currentChar = '';
	var nextChar = '';
	var insideString = false;
	var insideComment = false;
	var ret = '';

	for (var i = 0; i < str.length; i++) {
		currentChar = str[i];
		nextChar = str[i + 1];

		if (!insideComment && str[i - 1] !== '\\') {
			if (currentChar === '"' || currentChar === '\'') {
				if (insideString === currentChar) {
					insideString = false;
				} else if (!insideString) {
					insideString = currentChar;
				}
			}
		}

		if (insideString) {
			ret += currentChar;
			continue;
		}

		if (!insideComment && currentChar + nextChar === '/*') {
			insideComment = true;
			i++;
			continue;
		}

		if (insideComment && currentChar + nextChar === '*/') {
			insideComment = false;
			i++;
			continue;
		}

		if (insideComment) {
			continue;
		}

		ret += currentChar;
	}

	return ret;
}
