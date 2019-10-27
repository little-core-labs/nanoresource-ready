const assert = require('nanoassert')

/**
 * `RESOURCE_CLOSED_ERR` is thrown when the resource
 * is closing or closed.
 * @private
 */
class RESOURCE_CLOSED_ERR extends Error {
  constructor() {
    super('Resource is closed.')
  }
}

/**
 * Waits for a nanoresource to be ready (opened) and
 * call a callback.
 * @public
 * @default
 * @param {NanoResource} resource
 * @param {?(Object)} opts
 * @param {?(Boolean)} [opts.opening = false]
 * @param {Function} callback
 * @throws AssertionError
 * @return {NanoResource}
 */
function ready(resource, opts, callback) {
  if ('function' === typeof opts) {
    callback = opts
  }

  if (null === opts || 'object' !== typeof opts) {
    opts = {}
  }

  assert('function' === typeof callback, 'Callback is not a function.')
  assert('object' === typeof opts, 'Options is not an object.')

  if (resource.closed || resource.closing) {
    process.nextTick(callback, new RESOURCE_CLOSED_ERR())
  } else if (resource.opened) {
    process.nextTick(callback, null)
  } else if (resource.opening && true === opts.opening) {
    // sync
    callback(null)
  } else {
    // open resource if in candidate state
    resource.open(callback)
  }

  return resource
}

/**
 * Mixin a `ready()` method to 'nanoresource' object.
 * @public
 * @param {NanoResource} resource
 * @return {NanoResource}
*/
function mixin(resource) {
  return Object.assign(resource, {
    ready(...args) {
      return ready(resource, ...args)
    }
  })
}

/**
 * Module exports.
 */
module.exports = Object.assign(ready, {
  mixin
})
