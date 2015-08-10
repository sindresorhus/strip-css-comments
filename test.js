'use strict';
var test = require('ava');
var fn = require('./');

test(function (t) {
	t.assert(fn('/*//comment*/body{}') === 'body{}');
	t.assert(fn('body{/*comment*/}') === 'body{}');
	t.assert(fn('body{/*\ncomment\n\\*/}') === 'body{}');
	t.assert(fn('body{content: "\'/*ad*/\' \\""}') === 'body{content: "\'/*ad*/\' \\""}');
	t.assert(fn('body{\r\n /*\n\n\n\nfoo*/\n}') === 'body{\r\n \n}');
	t.assert(fn('body/*foo*/{}') === 'body{}');
	t.assert(fn('body{/*"\'\\"*/}') === 'body{}');

	t.assert(fn('/*!//comment*/body{}') === '/*!//comment*/body{}');
	t.assert(fn('body{/*!comment*/}') === 'body{/*!comment*/}');
	t.assert(fn('body{/*!\ncomment\n\\*/}') === 'body{/*!\ncomment\n\\*/}');
	t.assert(fn('body{content: "\'/*!ad*/\' \\""}') === 'body{content: "\'/*!ad*/\' \\""}');
	t.assert(fn('body{\r\n /*!\n\n\n\nfoo*/\n}') === 'body{\r\n /*!\n\n\n\nfoo*/\n}');
	t.assert(fn('body/*!foo*/{}') === 'body/*!foo*/{}');
	t.assert(fn('body{/*!"\'\\"*/}') === 'body{/*!"\'\\"*/}');

	t.assert(fn('/*!//comment*/body{}', {all: true}) === 'body{}');
	t.assert(fn('/*!//comment*/body{}', {all: true}) === 'body{}');
	t.assert(fn('body{/*!comment*/}', {all: true}) === 'body{}');
	t.assert(fn('body{/*!\ncomment\n\\*/}', {all: true}) === 'body{}');
	t.assert(fn('body{content: "\'/*!ad*/\' \\""}', {all: true}) === 'body{content: "\'/*!ad*/\' \\""}');
	t.assert(fn('body{\r\n /*!\n\n\n\nfoo*/\n}', {all: true}) === 'body{\r\n \n}');
	t.assert(fn('body/*!foo*/{}', {all: true}) === 'body{}');
	t.assert(fn('body{/*!"\'\\"*/}', {all: true}) === 'body{}');

	t.assert(fn('/*!//comment*/body{}', {preserve: false}) === 'body{}');
	t.assert(fn('body{/*!comment*/}', {preserve: false}) === 'body{}');
	t.assert(fn('body{/*!\ncomment\n\\*/}', {preserve: false}) === 'body{}');
	t.assert(fn('body{content: "\'/*!ad*/\' \\""}', {preserve: false}) === 'body{content: "\'/*!ad*/\' \\""}');
	t.assert(fn('body{\r\n /*!\n\n\n\nfoo*/\n}', {preserve: false}) === 'body{\r\n \n}');
	t.assert(fn('body/*!foo*/{}', {preserve: false}) === 'body{}');
	t.assert(fn('body{/*!"\'\\"*/}', {preserve: false}) === 'body{}');

	t.assert(fn(new Buffer('body{/*comment*/}')) === 'body{}');

	t.assert(fn('body{/*##foo##*/}', {preserve: /^##foo##/}) === 'body{/*##foo##*/}');
	t.assert(fn('body{/*foo*/}', {preserve: /^##foo##/}) === 'body{}');
	t.assert(fn('body{/*##foo##*//*foo*/}', {preserve: /^##foo##/}) === 'body{/*##foo##*/}');
	t.assert(fn('body{/*##foo##*//*!foo*/}', {preserve: /^##foo##/}) === 'body{/*##foo##*/}');
	t.assert(fn('body{/*!##foo##*//*foo*/}', {preserve: /^##foo##/}) === 'body{}');

	t.assert(
		fn('body{/*##foo##*/}', {
			preserve: function (comment) {
				return /^##foo##/.test(comment);
			}
		}) === 'body{/*##foo##*/}'
	);

	t.assert(
		fn('body{/*foo*/}', {
			preserve: function (comment) {
				return /^##foo##/.test(comment);
			}
		}) === 'body{}'
	);

	t.assert(
		fn('body{/*##foo##*//*foo*/}', {
			preserve: function (comment) {
				return /^##foo##/.test(comment);
			}
		}) === 'body{/*##foo##*/}'
	);

	t.assert(
		fn('body{/*##foo##*//*!foo*/}', {
			preserve: function (comment) {
				return /^##foo##/.test(comment);
			}
		}) === 'body{/*##foo##*/}'
	);

	t.assert(
		fn('body{/*!##foo##*//*foo*/}', {
			preserve: function (comment) {
				return /^##foo##/.test(comment);
			}
		}) === 'body{}'
	);

	t.end();
});
