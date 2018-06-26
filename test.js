import test from 'ava';
import m from '.';

test('main', t => {
	t.is(m('/*//comment*/body{}'), 'body{}');
	t.is(m('body{/*comment*/}'), 'body{}');
	t.is(m('body{/*\ncomment\n\\*/}'), 'body{}');
	t.is(m('body{content: "\'/*ad*/\' \\""}'), 'body{content: "\'/*ad*/\' \\""}');
	t.is(m('body{\r\n /*\n\n\n\nfoo*/\n}'), 'body{\r\n \n}');
	t.is(m('body/*foo*/{}'), 'body{}');
	t.is(m('body{/*"\'\\"*/}'), 'body{}');

	t.is(m('/*!//comment*/body{}'), '/*!//comment*/body{}');
	t.is(m('body{/*!comment*/}'), 'body{/*!comment*/}');
	t.is(m('body{/*!\ncomment\n\\*/}'), 'body{/*!\ncomment\n\\*/}');
	t.is(m('body{content: "\'/*!ad*/\' \\""}'), 'body{content: "\'/*!ad*/\' \\""}');
	t.is(m('body{\r\n /*!\n\n\n\nfoo*/\n}'), 'body{\r\n /*!\n\n\n\nfoo*/\n}');
	t.is(m('body/*!foo*/{}'), 'body/*!foo*/{}');
	t.is(m('body{/*!"\'\\"*/}'), 'body{/*!"\'\\"*/}');

	t.is(m('/*!//comment*/body{}', {all: true}), 'body{}');
	t.is(m('/*!//comment*/body{}', {all: true}), 'body{}');
	t.is(m('body{/*!comment*/}', {all: true}), 'body{}');
	t.is(m('body{/*!\ncomment\n\\*/}', {all: true}), 'body{}');
	t.is(m('body{content: "\'/*!ad*/\' \\""}', {all: true}), 'body{content: "\'/*!ad*/\' \\""}');
	t.is(m('body{\r\n /*!\n\n\n\nfoo*/\n}', {all: true}), 'body{\r\n \n}');
	t.is(m('body/*!foo*/{}', {all: true}), 'body{}');
	t.is(m('body{/*!"\'\\"*/}', {all: true}), 'body{}');

	t.is(m('/*!//comment*/body{}', {preserve: false}), 'body{}');
	t.is(m('body{/*!comment*/}', {preserve: false}), 'body{}');
	t.is(m('body{/*!\ncomment\n\\*/}', {preserve: false}), 'body{}');
	t.is(m('body{content: "\'/*!ad*/\' \\""}', {preserve: false}), 'body{content: "\'/*!ad*/\' \\""}');
	t.is(m('body{\r\n /*!\n\n\n\nfoo*/\n}', {preserve: false}), 'body{\r\n \n}');
	t.is(m('body/*!foo*/{}', {preserve: false}), 'body{}');
	t.is(m('body{/*!"\'\\"*/}', {preserve: false}), 'body{}');

	t.is(m('body{/*##foo##*/}', {preserve: /^##foo##/}), 'body{/*##foo##*/}');
	t.is(m('body{/*foo*/}', {preserve: /^##foo##/}), 'body{}');
	t.is(m('body{/*##foo##*//*foo*/}', {preserve: /^##foo##/}), 'body{/*##foo##*/}');
	t.is(m('body{/*##foo##*//*!foo*/}', {preserve: /^##foo##/}), 'body{/*##foo##*/}');
	t.is(m('body{/*!##foo##*//*foo*/}', {preserve: /^##foo##/}), 'body{}');

	t.is(
		m('body{/*##foo##*/}', {
			preserve: comment => comment.startsWith('##foo##')
		}), 'body{/*##foo##*/}'
	);

	t.is(
		m('body{/*foo*/}', {
			preserve: comment => comment.startsWith('##foo##')
		}), 'body{}'
	);

	t.is(
		m('body{/*##foo##*//*foo*/}', {
			preserve: comment => comment.startsWith('##foo##')
		}), 'body{/*##foo##*/}'
	);

	t.is(
		m('body{/*##foo##*//*!foo*/}', {
			preserve: comment => comment.startsWith('##foo##')
		}), 'body{/*##foo##*/}'
	);

	t.is(
		m('body{/*!##foo##*//*foo*/}', {
			preserve: comment => comment.startsWith('##foo##')
		}), 'body{}'
	);
});

test.failing('strips trailing comment newline', t => {
	t.is(m('/* foo */\n\nbody{}'), '\nbody{}');
	t.is(m('/* foo */\r\n\r\nbody{}'), '\nbody{}');
	t.is(m('/*! foo */\r\n\r\nbody{}'), '/*! foo */\r\n\r\nbody{}');
});
