# handlebars-helper-maybe

[Handlebars][] helpers for rendering optional values.

[![npm Version][npm-badge]][npm]
[![Build Status][build-badge]][build-status]
[![Test Coverage][coverage-badge]][coverage-result]
[![Dependency Status][dep-badge]][dep-status]

## Installation

Install using npm:

    $ npm install handlebars-helper-maybe

## Usage

```js
var Handlebars = require('handlebars');
var MaybeHelpers = require('handlebars-helper-maybe');

Handlebars.registerHelper('isJust', MaybeHelper.isJust);
Handlebars.registerHelper('maybe', MaybeHelper.maybe);
```

## Helpers

### {{#isJust}}

Block helper that renders the block if the given value is a `Just`. If an
inverse block is specified, it will be rendered if the value is a `Nothing`.

**Example**

```handlebars
{{#isJust value}}
  Just {{this}}
{{else}}
  Nothing
{{/isJust}}
```

### {{maybe}}

Returns the value inside the Maybe. If the argument is a `Nothing` and the
`defaultValue` option is specified, this will return the provided default
value. Otherwise it will return `undefined`.

**Example**

```handlebars
{{maybe value defaultValue="Not Available"}}
```

## Related

### What's a Maybe?

- [Mostly Adequate Guide - Ch. 8.3: Schrödinger's Maybe](https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch8.html#schrödingers-maybe)

### Known Supported Maybe Implementations

- [ramda/ramda-fantasy](https://github.com/ramda/ramda-fantasy)
- [folktale/data.maybe](https://github.com/folktale/data.maybe)
- [sanctuary-js/sanctuary](https://github.com/sanctuary-js/sanctuary)
- [fantasyland/fantasy-options](https://github.com/fantasyland/fantasy-options)

## License

MIT

[Handlebars]: http://handlebarsjs.com/
[build-badge]: https://img.shields.io/travis/jimf/handlebars-helper-maybe/master.svg
[build-status]: https://travis-ci.org/jimf/handlebars-helper-maybe
[npm-badge]: https://img.shields.io/npm/v/handlebars-helper-maybe.svg
[npm]: https://www.npmjs.org/package/handlebars-helper-maybe
[coverage-badge]: https://img.shields.io/coveralls/jimf/handlebars-helper-maybe.svg
[coverage-result]: https://coveralls.io/r/jimf/handlebars-helper-maybe
[dep-badge]: https://img.shields.io/david/jimf/handlebars-helper-maybe.svg
[dep-status]: https://david-dm.org/jimf/handlebars-helper-maybe
