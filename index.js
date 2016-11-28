'use strict'

function fromMaybe (defaultVal, maybe) {
  if (maybe.getOrElse) {
    return maybe.getOrElse(defaultVal)
  }

  return maybe.isJust ? maybe.value : defaultVal
}

module.exports = {
  isJust: function isJust (context, options) {
    if (typeof context === 'function') { context = context.call(this) }
    var value = fromMaybe(undefined, context)

    if (context.fold) {
      return context.fold(options.fn, options.inverse)
    }

    return options[context.isJust ? 'fn' : 'inverse'](value)
  },

  maybe: function maybe (context, options) {
    if (typeof context === 'function') { context = context.call(this) }
    return fromMaybe(options.hash.defaultValue, context)
  }
}
