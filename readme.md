# strip-css-comments [![Build Status](https://travis-ci.org/sindresorhus/strip-css-comments.svg?branch=master)](https://travis-ci.org/sindresorhus/strip-css-comments)

> Strip comments from CSS

Also available as a [gulp](https://github.com/sindresorhus/gulp-strip-css-comments)/[grunt](https://github.com/sindresorhus/grunt-strip-css-comments)/[broccoli](https://github.com/sindresorhus/broccoli-strip-css-comments) plugin.


## Usage

```
$ npm install --save strip-css-comments
```

```js
var stripCssComments = require('strip-css-comments');

// by default important comments `/*!` are preserved
stripCssComments('/*! <copyright> */ body { /* unicorns */color: hotpink; }');
//=> '/*! <copyright> */ body { color: hotpink; }'

//assign the preserve option `false` to strip all comments including `/*!`
stripCssComments(
	'/*! <copyright> */ body { /* unicorns */color: hotpink; }', 
	{preserve: false}
);
//=> 'body { color: hotpink; }'

//assign the preserve option a regular expression to strip comments not matching the pattern
stripCssComments(
	'/*! <copyright> */ body { /* unicorns */color: hotpink; }', 
	{preserve: /^\\!/}
);
//=> '/*! <copyright> */ body { color: hotpink; }'

//assign the preserve option a function that returns `true` to preserve the comment or `false` to strip the comment
stripCssComments(
	'/*! <copyright> */ body { /* unicorns */color: hotpink; }', 
	{preserve: function(comment){/^\\!/.test(comment);}}
);
//=> '/*! <copyright> */ body { color: hotpink; }'

```

## API

### stripCssComments(input, [options])

## input

*Required*  
Type: `string`

String with CSS.


## options

### preserve

Type: `boolean`, `RegExp`, or `function` 
Default: `true`

- `preserve: true` &mdash; (default) preserve comments that use the `/*! */` syntax;
- `preserve: false` &mdash; strip all comments;
- `preserve: [RegExp]` &mdash; preserve comments that match a regular expression. The comment text but not the comment syntax (`/**/`) will be tested by the RegExp.
- `preserve: function (comment) { ... }` &mdash; a function that returns `true` to preserve the comment or `false` to strip it. The comment is invoked with a single argument, the string found between the comment syntax, `/**/`.


## CLI

```
$ npm install --global strip-css-comments
```

```
$ strip-css-comments --help

  Usage
    $ strip-css-comments <input-file> > <output-file>
    $ strip-css-comments < <input-string>

  Option
    -a, --all  Strip all comments including `/*!`

  Example
    $ strip-css-comments src/app.css > dist/app.css
    $ strip-css-comments < src/app.css --all
```

## Benchmark

```
$ npm run bench
```

## Related

- [strip-json-comments](https://github.com/sindresorhus/strip-json-comments)


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
