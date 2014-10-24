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

test(function (t) {
	var stream = strip();
	var ret = '';

	stream.on('data', function (data) {
		ret += data.toString();
	});

	stream.on('end', function () {
		var css = 'body{}body{}body{}body{content: "\'/*ad*/\' \\""}body{\r\n \n}body{}body{}';
		t.assert(ret === css);
		t.end();
	});

	stream.write('/*//comment*/body{}');
	stream.write('body{/*comment*/}');
	stream.write('body{/*\ncomment\n\\*/}');
	stream.write('body{content: "\'/*ad*/\' \\""}');
	stream.write('body{\r\n /*\n\n\n\nfoo*/\n}');
	stream.write('body/*foo*/{}');
	stream.write('body{/*"\'\\"*/}');
	stream.end();
});
