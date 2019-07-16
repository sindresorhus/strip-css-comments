import test from 'ava';
import stripCssComments from '.';

test('main', t => {
	t.is(stripCssComments('/*//comment*/body{}'), 'body{}');
	t.is(stripCssComments('body{/*comment*/}'), 'body{}');
	t.is(stripCssComments('body{/*\ncomment\n\\*/}'), 'body{}');
	t.is(stripCssComments('body{content: "\'/*ad*/\' \\""}'), 'body{content: "\'/*ad*/\' \\""}');
	t.is(stripCssComments('body{\r\n /*\n\n\n\nfoo*/\n}'), 'body{\r\n \n}');
	t.is(stripCssComments('body/*foo*/{}'), 'body{}');
	t.is(stripCssComments('body{/*"*/}'), 'body{}');
	t.is(stripCssComments('body{/*\'*/}'), 'body{}');
	t.is(stripCssComments('body{/*"\'\\"*/}'), 'body{}');
	t.is(stripCssComments('body{/*"\'"\'*/}'), 'body{}');

	t.is(stripCssComments('/*!//comment*/body{}'), '/*!//comment*/body{}');
	t.is(stripCssComments('/*!//"comment*/body{/*//comment*/}'), '/*!//"comment*/body{}');
	t.is(stripCssComments('/*!//\'comment*/body{/*//comment*/}'), '/*!//\'comment*/body{}');
	t.is(stripCssComments('body{/*!comment*/}'), 'body{/*!comment*/}');
	t.is(stripCssComments('body{/*!\ncomment\n\\*/}'), 'body{/*!\ncomment\n\\*/}');
	t.is(stripCssComments('body{content: "\'/*!ad*/\' \\""}'), 'body{content: "\'/*!ad*/\' \\""}');
	t.is(stripCssComments('body{\r\n /*!\n\n\n\nfoo*/\n}'), 'body{\r\n /*!\n\n\n\nfoo*/\n}');
	t.is(stripCssComments('body/*!foo*/{}'), 'body/*!foo*/{}');
	t.is(stripCssComments('body{/*!"*/}/*foo*/'), 'body{/*!"*/}');
	t.is(stripCssComments('body{/*!\'*/}/*foo*/'), 'body{/*!\'*/}');
	t.is(stripCssComments('body{/*!"\'\\"*/}'), 'body{/*!"\'\\"*/}');
	t.is(stripCssComments('body{/*!"\'"\'*/}'), 'body{/*!"\'"\'*/}');

	t.is(stripCssComments('/*!//comment*/body{}', {all: true}), 'body{}');
	t.is(stripCssComments('/*!//comment*/body{}', {all: true}), 'body{}');
	t.is(stripCssComments('/*!//"comment*/body{}', {all: true}), 'body{}');
	t.is(stripCssComments('/*!//\'comment*/body{}', {all: true}), 'body{}');
	t.is(stripCssComments('body{/*!comment*/}', {all: true}), 'body{}');
	t.is(stripCssComments('body{/*!\ncomment\n\\*/}', {all: true}), 'body{}');
	t.is(stripCssComments('body{content: "\'/*!ad*/\' \\""}', {all: true}), 'body{content: "\'/*!ad*/\' \\""}');
	t.is(stripCssComments('body{\r\n /*!\n\n\n\nfoo*/\n}', {all: true}), 'body{\r\n \n}');
	t.is(stripCssComments('body/*!foo*/{}', {all: true}), 'body{}');
	t.is(stripCssComments('body{/*!"*/}/*foo*/', {all: true}), 'body{}');
	t.is(stripCssComments('body{/*!\'*/}/*foo*/', {all: true}), 'body{}');
	t.is(stripCssComments('body{/*!"\'\\"*/}', {all: true}), 'body{}');
	t.is(stripCssComments('body{/*!"\'"\'*/}', {all: true}), 'body{}');

	t.is(stripCssComments('/*!//comment*/body{}', {preserve: false}), 'body{}');
	t.is(stripCssComments('/*!//"comment*/body{}', {preserve: false}), 'body{}');
	t.is(stripCssComments('/*!//\'comment*/body{}', {preserve: false}), 'body{}');
	t.is(stripCssComments('body{/*!comment*/}', {preserve: false}), 'body{}');
	t.is(stripCssComments('body{/*!\ncomment\n\\*/}', {preserve: false}), 'body{}');
	t.is(stripCssComments('body{content: "\'/*!ad*/\' \\""}', {preserve: false}), 'body{content: "\'/*!ad*/\' \\""}');
	t.is(stripCssComments('body{\r\n /*!\n\n\n\nfoo*/\n}', {preserve: false}), 'body{\r\n \n}');
	t.is(stripCssComments('body/*!foo*/{}', {preserve: false}), 'body{}');
	t.is(stripCssComments('body{/*!"*/}/*foo*/', {preserve: false}), 'body{}');
	t.is(stripCssComments('body{/*!\'*/}/*foo*/', {preserve: false}), 'body{}');
	t.is(stripCssComments('body{/*!"\'\\"*/}', {preserve: false}), 'body{}');
	t.is(stripCssComments('body{/*!"\'"\'*/}', {preserve: false}), 'body{}');

	t.is(stripCssComments('body{/*##foo##*/}', {preserve: /^##foo##/}), 'body{/*##foo##*/}');
	t.is(stripCssComments('body{/*foo*/}', {preserve: /^##foo##/}), 'body{}');
	t.is(stripCssComments('body{/*##foo##*//*foo*/}', {preserve: /^##foo##/}), 'body{/*##foo##*/}');
	t.is(stripCssComments('body{/*##foo##*//*!foo*/}', {preserve: /^##foo##/}), 'body{/*##foo##*/}');
	t.is(stripCssComments('body{/*!##foo##*//*foo*/}', {preserve: /^##foo##/}), 'body{}');
	t.is(stripCssComments('body{/*!##foo*//*foo*/}', {preserve: /foo$/}), 'body{/*!##foo*//*foo*/}');

	t.is(
		stripCssComments('body{/*##foo##*/}', {
			preserve: comment => comment.startsWith('##foo##')
		}), 'body{/*##foo##*/}'
	);

	t.is(
		stripCssComments('body{/*foo*/}', {
			preserve: comment => comment.startsWith('##foo##')
		}), 'body{}'
	);

	t.is(
		stripCssComments('body{/*##foo##*//*foo*/}', {
			preserve: comment => comment.startsWith('##foo##')
		}), 'body{/*##foo##*/}'
	);

	t.is(
		stripCssComments('body{/*##foo##*//*!foo*/}', {
			preserve: comment => comment.startsWith('##foo##')
		}), 'body{/*##foo##*/}'
	);

	t.is(
		stripCssComments('body{/*!##foo##*//*foo*/}', {
			preserve: comment => comment.startsWith('##foo##')
		}), 'body{}'
	);

	t.is(
		stripCssComments('body{/*!##foo*//*foo*/}', {
			preserve: comment => comment.endsWith('foo')
		}),
		'body{/*!##foo*//*foo*/}'
	);
});

	t.is(stripCssComments('/* foo */\n\nbody{}', {whitespace: false}), '\nbody{}');
	t.is(stripCssComments('/* foo */\r\n\r\nbody{}', {whitespace: false}), '\r\nbody{}');
	t.is(stripCssComments('/*! foo */\r\n\r\nbody{}', {whitespace: false}), '/*! foo */\r\n\r\nbody{}');
	t.is(stripCssComments('/*! foo */\r\n\r\nbody{}', {preserve: false, whitespace: false}), '\r\nbody{}');

	t.is(stripCssComments('/*##foo##*/\nbody{}', {preserve: /^##foo##/, whitespace: false}), '/*##foo##*/\nbody{}');
	t.is(stripCssComments('/*##foo##*/\r\nbody{}', {preserve: /^##foo##/, whitespace: false}), '/*##foo##*/\r\nbody{}');
});
