# strip-css-comments [![Build Status](https://travis-ci.org/sindresorhus/strip-css-comments.svg?branch=master)](https://travis-ci.org/sindresorhus/strip-css-comments)

> Strip comments from CSS

Also available as a [gulp](https://github.com/sindresorhus/gulp-strip-css-comments)/[grunt](https://github.com/sindresorhus/grunt-strip-css-comments)/[broccoli](https://github.com/sindresorhus/broccoli-strip-css-comments) plugin.


## Usage

```sh
$ npm install --save strip-css-comments
```

```js
var stripCssComments = require('strip-css-comments');

stripCssComments('body { /* unicorns */color: hotpink; }');
//=> body { color: hotpink; }
```


## CLI

```sh
$ npm install --global strip-css-comments
```

```
$ strip-css-comments --help

  Usage
    strip-css-comments <input-file> > <output-file>
    strip-css-comments < <input-string>

  Example
    strip-css-comments src/app.css > dist/app.css
```


## Benchmark

```sh
$ npm run bench
```


## Related

- [`strip-json-comments`](https://github.com/sindresorhus/strip-json-comments)


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
