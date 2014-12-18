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

	t.assert(strip('/*!//comment*/body{}') === '/*!//comment*/body{}');
	t.assert(strip('body{/*!comment*/}') === 'body{/*!comment*/}');
	t.assert(strip('body{/*!\ncomment\n\\*/}') === 'body{/*!\ncomment\n\\*/}');
	t.assert(strip('body{content: "\'/*!ad*/\' \\""}') === 'body{content: "\'/*!ad*/\' \\""}');
	t.assert(strip('body{\r\n /*!\n\n\n\nfoo*/\n}') === 'body{\r\n /*!\n\n\n\nfoo*/\n}');
	t.assert(strip('body/*!foo*/{}') === 'body/*!foo*/{}');
	t.assert(strip('body{/*!"\'\\"*/}') === 'body{/*!"\'\\"*/}');

	t.assert(strip('/*!//comment*/body{}', {preserve: false}) === 'body{}');
	t.assert(strip('body{/*!comment*/}', {preserve: false}) === 'body{}');
	t.assert(strip('body{/*!\ncomment\n\\*/}', {preserve: false}) === 'body{}');
	t.assert(strip('body{content: "\'/*!ad*/\' \\""}', {preserve: false}) === 'body{content: "\'/*!ad*/\' \\""}');
	t.assert(strip('body{\r\n /*!\n\n\n\nfoo*/\n}', {preserve: false}) === 'body{\r\n \n}');
	t.assert(strip('body/*!foo*/{}', {preserve: false}) === 'body{}');
	t.assert(strip('body{/*!"\'\\"*/}', {preserve: false}) === 'body{}');

	t.end();
});
