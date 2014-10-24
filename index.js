'use strict';
module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	var currentChar = '';
	var nextChar = '';
	var insideString = false;
	var ret = '';

	for (var i = 0, strLength = str.length; i < strLength; i++) {
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

		if (insideString) {
			ret += currentChar;
			continue;
		}

		nextChar = str[i + 1];
		//start /* type comment
		if (currentChar + nextChar === '/*') {
			//start skipping until we reach end of comment
			for (var j = i + 2; j < strLength; j++) {
				if (str[j] + str[j + 1] === '*/') {
					break;
				}
			}
			//skip i to the end of the comment
			i = j + 1;
			continue;
		}

		ret += currentChar;
	}

	return ret;
};
