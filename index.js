'use strict';
const isRegExp = require('is-regexp');

module.exports = (input, options = {}) => {
	let preserveImportant = !(options.preserve === false || options.all === true);

	let preserveFilter;
	if (typeof options.preserve === 'function') {
		preserveImportant = false;
		preserveFilter = options.preserve;
	} else if (isRegExp(options.preserve)) {
		preserveImportant = false;
		preserveFilter = comment => options.preserve.test(comment);
	}

	let isInsideString = false;
	let currentCharacter = '';
	let comment = '';
	let returnValue = '';

	for (let i = 0; i < input.length; i++) {
		currentCharacter = input[i];

		if (input[i - 1] !== '\\') {
			if (currentCharacter === '"' || currentCharacter === '\'') {
				if (isInsideString === currentCharacter) {
					isInsideString = false;
				} else if (!isInsideString) {
					isInsideString = currentCharacter;
				}
			}
		}

		// Find beginning of /* type comment
		if (!isInsideString && currentCharacter === '/' && input[i + 1] === '*') {
			// Ignore important comment when configured to preserve comments using important syntax: /*!
			if (!(preserveImportant && input[i + 2] === '!')) {
				let j = i + 2;

				// Iterate over comment
				for (; j < input.length; j++) {
					// Find end of comment
					if (input[j] === '*' && input[j + 1] === '/') {
						if (preserveFilter) {
							// Evaluate comment text
							returnValue = preserveFilter(comment) ? returnValue + ('/*' + comment + '*/') : returnValue;
							comment = '';
						}

						break;
					}

					// Store comment text to be evaluated by the filter when the end of the comment is reached
					if (preserveFilter) {
						comment += input[j];
					}
				}

				// Resume iteration over CSS string from the end of the comment
				i = j + 1;

				continue;
			}
		}

		returnValue += currentCharacter;
	}

	return returnValue;
};
