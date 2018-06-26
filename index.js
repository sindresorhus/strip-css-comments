'use strict';
const isRegExp = require('is-regexp');

module.exports = function (str, opts) {
	str = str.toString();
	opts = opts || {};

	let preserveFilter;
	let comment = '';
	let currentChar = '';
	let insideString = false;
	let preserveImportant = !(opts.preserve === false || opts.all === true);
	let ret = '';

	if (typeof opts.preserve === 'function') {
		preserveImportant = false;
		preserveFilter = opts.preserve;
	} else if (isRegExp(opts.preserve)) {
		preserveImportant = false;
		preserveFilter = function (comment) {
			return opts.preserve.test(comment);
		};
	}

	for (let i = 0; i < str.length; i++) {
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

		// Find beginning of /* type comment
		if (!insideString && currentChar === '/' && str[i + 1] === '*') {
			// ignore important comment when configured to preserve comments using important syntax: /*!
			if (!(preserveImportant && str[i + 2] === '!')) {
				let j = i + 2;

				// Iterate over comment
				for (; j < str.length; j++) {
					// Find end of comment
					if (str[j] === '*' && str[j + 1] === '/') {
						if (preserveFilter) {
							// Evaluate comment text
							ret = preserveFilter(comment) ? ret + ('/*' + comment + '*/') : ret;
							comment = '';
						}

						break;
					}

					// Store comment text to be evaluated by the filter when the end of the comment is reached
					if (preserveFilter) {
						comment += str[j];
					}
				}

				// Resume iteration over CSS string from the end of the comment
				i = j + 1;

				continue;
			}
		}

		ret += currentChar;
	}

	return ret;
};
