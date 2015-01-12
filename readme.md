# strip-css-comments [![Build Status](https://travis-ci.org/sindresorhus/strip-css-comments.svg?branch=master)](https://travis-ci.org/sindresorhus/strip-css-comments)

> Strip comments from CSS

Also available as a [gulp](https://github.com/sindresorhus/gulp-strip-css-comments)/[grunt](https://github.com/sindresorhus/grunt-strip-css-comments)/[broccoli](https://github.com/sindresorhus/broccoli-strip-css-comments) plugin.


## Usage

```sh
$ npm install --save strip-css-comments
```

```js
var stripCssComments = require('strip-css-comments');

// by default important comments `/*!` are preserved
stripCssComments('/*! <copyright> */ body { /* unicorns */color: hotpink; }');
//=> '/*! <copyright> */ body { color: hotpink; }'

// use the `all: true` option to strip everything
stripCssComments('/*! <copyright> */ body { /* unicorns */color: hotpink; }', {all: true});
//=> ' body { color: hotpink; }'
```


## API

### stripCssComments(input, [options])

## input

*Required*  
Type: `string`

String with CSS.

## options

### all

Type: `boolean`  
Default: `false`

Whether *important* CSS comments *(those starting with `/*!`)* should be stripped.


## CLI

```sh
$ npm install --global strip-css-comments
```

```
$ strip-css-comments --help

  Usage
    strip-css-comments <input-file> > <output-file>
    strip-css-comments < <input-string>

  Option
    -a, --all  Strip all comments including `/*!`

  Example
    strip-css-comments src/app.css > dist/app.css
    strip-css-comments < src/app.css --all
```


## Benchmark

```sh
$ npm run bench
```


## Related

- [`strip-json-comments`](https://github.com/sindresorhus/strip-json-comments)


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
