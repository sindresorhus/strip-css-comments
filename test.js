'use strict';
var test = require('ava');
var strip = require('./');

test(function (t) {
	t.assert(strip('/*//comment*/body{}') === 'body{}');
	t.assert(strip('body{/*comment*/}') === 'body{}');
	t.assert(strip('body{/*\ncomment\n\\*/}') === 'body{}');
	t.assert(strip('body{content: "\'/*ad*/\' \\""}') === 'body{content: "\'/*ad*/\' \\""}');
	t.assert(strip('body{\r\n /*\n\n\n\nfoo*/\n}') === 'body{\r\n \n}');
	t.assert(strip('body/*foo*/{}') === 'body{}');
	t.assert(strip('body{/*"\'\\"*/}') === 'body{}');
	t.end();
});
