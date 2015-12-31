import test from 'ava';
import fn from './';

test(t => {
	t.is(fn('/*//comment*/body{}'), 'body{}');
	t.is(fn('body{/*comment*/}'), 'body{}');
	t.is(fn('body{/*\ncomment\n\\*/}'), 'body{}');
	t.is(fn('body{content: "\'/*ad*/\' \\""}'), 'body{content: "\'/*ad*/\' \\""}');
	t.is(fn('body{\r\n /*\n\n\n\nfoo*/\n}'), 'body{\r\n \n}');
	t.is(fn('body/*foo*/{}'), 'body{}');
	t.is(fn('body{/*"\'\\"*/}'), 'body{}');

	t.is(fn('/*!//comment*/body{}'), '/*!//comment*/body{}');
	t.is(fn('body{/*!comment*/}'), 'body{/*!comment*/}');
	t.is(fn('body{/*!\ncomment\n\\*/}'), 'body{/*!\ncomment\n\\*/}');
	t.is(fn('body{content: "\'/*!ad*/\' \\""}'), 'body{content: "\'/*!ad*/\' \\""}');
	t.is(fn('body{\r\n /*!\n\n\n\nfoo*/\n}'), 'body{\r\n /*!\n\n\n\nfoo*/\n}');
	t.is(fn('body/*!foo*/{}'), 'body/*!foo*/{}');
	t.is(fn('body{/*!"\'\\"*/}'), 'body{/*!"\'\\"*/}');

	t.is(fn('/*!//comment*/body{}', {all: true}), 'body{}');
	t.is(fn('/*!//comment*/body{}', {all: true}), 'body{}');
	t.is(fn('body{/*!comment*/}', {all: true}), 'body{}');
	t.is(fn('body{/*!\ncomment\n\\*/}', {all: true}), 'body{}');
	t.is(fn('body{content: "\'/*!ad*/\' \\""}', {all: true}), 'body{content: "\'/*!ad*/\' \\""}');
	t.is(fn('body{\r\n /*!\n\n\n\nfoo*/\n}', {all: true}), 'body{\r\n \n}');
	t.is(fn('body/*!foo*/{}', {all: true}), 'body{}');
	t.is(fn('body{/*!"\'\\"*/}', {all: true}), 'body{}');

	t.is(fn('/*!//comment*/body{}', {preserve: false}), 'body{}');
	t.is(fn('body{/*!comment*/}', {preserve: false}), 'body{}');
	t.is(fn('body{/*!\ncomment\n\\*/}', {preserve: false}), 'body{}');
	t.is(fn('body{content: "\'/*!ad*/\' \\""}', {preserve: false}), 'body{content: "\'/*!ad*/\' \\""}');
	t.is(fn('body{\r\n /*!\n\n\n\nfoo*/\n}', {preserve: false}), 'body{\r\n \n}');
	t.is(fn('body/*!foo*/{}', {preserve: false}), 'body{}');
	t.is(fn('body{/*!"\'\\"*/}', {preserve: false}), 'body{}');

	t.is(fn(new Buffer('body{/*comment*/}')), 'body{}');

	t.is(fn('body{/*##foo##*/}', {preserve: /^##foo##/}), 'body{/*##foo##*/}');
	t.is(fn('body{/*foo*/}', {preserve: /^##foo##/}), 'body{}');
	t.is(fn('body{/*##foo##*//*foo*/}', {preserve: /^##foo##/}), 'body{/*##foo##*/}');
	t.is(fn('body{/*##foo##*//*!foo*/}', {preserve: /^##foo##/}), 'body{/*##foo##*/}');
	t.is(fn('body{/*!##foo##*//*foo*/}', {preserve: /^##foo##/}), 'body{}');

	t.is(
		fn('body{/*##foo##*/}', {
			preserve: comment => /^##foo##/.test(comment)
		}), 'body{/*##foo##*/}'
	);

	t.is(
		fn('body{/*foo*/}', {
			preserve: comment => /^##foo##/.test(comment)
		}), 'body{}'
	);

	t.is(
		fn('body{/*##foo##*//*foo*/}', {
			preserve: comment => /^##foo##/.test(comment)
		}), 'body{/*##foo##*/}'
	);

	t.is(
		fn('body{/*##foo##*//*!foo*/}', {
			preserve: comment => /^##foo##/.test(comment)
		}), 'body{/*##foo##*/}'
	);

	t.is(
		fn('body{/*!##foo##*//*foo*/}', {
			preserve: comment => /^##foo##/.test(comment)
		}), 'body{}'
	);
});
