'use strict';
module.exports = function (buf, opts) {
	if (!Buffer.isBuffer(buf)) {
		throw new TypeError('Expected a buffer');
	}

	opts = opts || {};

	var preserve = !opts.all;
	var currentChar;
	var insideString = false;
	var ret = [];
	var len = 0;

	for (var i = 0; i < buf.length; i++) {
		len++;
		currentChar = buf[i];

		if (buf[i - 1] !== 0x5c) {
			if (currentChar === 0x22 || currentChar === 0x27) {
				if (insideString === currentChar) {
					insideString = false;
				} else if (!insideString) {
					insideString = currentChar;
				}
			}
		}

		// start /* type comment
		if (!insideString && currentChar === 0x2f && buf[i + 1] === 0x2a) {
			if (!preserve || preserve && buf[i + 2] !== 0x21) {
				// start skipping until we reach end of comment
				for (var j = i + 2; j < buf.length; j++) {
					if (buf[j] === 0x2a && buf[j + 1] === 0x2f) {
						break;
					}
				}
				// skip i to the end of the comment
				i = j + 1;
				continue;
			}
		}

		ret.push(currentChar);
	}

	return new Buffer(ret, len);
};
