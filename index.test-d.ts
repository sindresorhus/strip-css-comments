import {expectType} from 'tsd';
import stripCssComments from './index.js';

expectType<string>(
	stripCssComments('/*! <copyright> */ body { /* unicorns */color: hotpink; }'),
);
expectType<string>(
	stripCssComments(
		'/*! <copyright> */ body { /* unicorns */color: hotpink; }', {
			preserve: false,
		}),
);
expectType<string>(
	stripCssComments('/*# preserved */ body { /* unicorns */color: hotpink; }', {
		preserve: /^#/,
	}),
);
expectType<string>(
	stripCssComments('/*# preserved */ body { /* unicorns */color: hotpink; }', {
		preserve: comment => comment.startsWith('#'),
	}),
);
expectType<string>(
	stripCssComments('/*# preserved */ body { /* unicorns */color: hotpink; }', {
		whitespace: false,
	}),
);
