nanoresource-ready
==================

> Wait for a [nanoresource][nanoresource] to be ready (opened) and call
> a callback.

## Installation

```sh
$ npm install nanoresource-ready
```

## Status

> **Stable**

## Usage

```js
const ready = require('nanoresource-ready')

// will call `resource.open()` if not already "opening"
ready(resource, (err) => {
})

// fast ready (possibly synchronous) if `true === resource.opening`
ready(resource, { opening: true }, (err) => {
})
```

## API

<a name="ready"></a>
### `ready(resource[, opts], callback)`

Waits for a [nanoresource][nanoresource] to be ready (`opened`) and
calls `callback(err)`. `opts` can be an object that can look like:

```js
{
  opening: false // if `true`, will call callback synchronously if resource is "opening"
}
```

### `ready.mixin(resource)`

Mixes in a [`ready()`](#ready) method to [nanoresource][nanoresource]
instance object.

```js
resource = ready.mixin(resource)
```

## License

MIT

[nanoresource]: https://github.com/mafintosh/nanoresource
