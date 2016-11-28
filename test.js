var test = require('tape')
var Handlebars = require('handlebars')
var maybeHelper = require('./')

function K (value) {
  return function () {
    return value
  }
}

function runTests (Maybe) {
  test('isJust - template with Just block', function (t) {
    Handlebars.registerHelper('isJust', maybeHelper.isJust)

    var template = Handlebars.compile(
      '{{#isJust maybeNum}}{{this}}{{/isJust}}'
    )

    var cases = [
      { context: { maybeNum: Maybe.Just(42) }, expected: '42' },
      { context: { maybeNum: Maybe.Nothing() }, expected: '' },
      { context: { maybeNum: K(Maybe.Just(42)) }, expected: '42' },
      { context: { maybeNum: K(Maybe.Nothing()) }, expected: '' }
    ]

    cases.forEach(function (testcase) {
      t.equal(template(testcase.context), testcase.expected)
    })

    Handlebars.unregisterHelper('isJust')
    t.end()
  })

  test('isJust - template with Just and Nothing blocks', function (t) {
    Handlebars.registerHelper('isJust', maybeHelper.isJust)

    var template = Handlebars.compile(
      '{{#isJust maybeNum}}{{this}}{{else}}N/A{{/isJust}}'
    )

    var cases = [
      { context: { maybeNum: Maybe.Just(42) }, expected: '42' },
      { context: { maybeNum: Maybe.Nothing() }, expected: 'N/A' },
      { context: { maybeNum: K(Maybe.Just(42)) }, expected: '42' },
      { context: { maybeNum: K(Maybe.Nothing()) }, expected: 'N/A' }
    ]

    cases.forEach(function (testcase) {
      t.equal(template(testcase.context), testcase.expected)
    })

    Handlebars.unregisterHelper('isJust')
    t.end()
  })

  test('maybe - template with no default value', function (t) {
    Handlebars.registerHelper('maybe', maybeHelper.maybe)

    var template = Handlebars.compile(
      '{{maybe maybeNum}}'
    )

    var cases = [
      { context: { maybeNum: Maybe.Just(42) }, expected: '42' },
      { context: { maybeNum: Maybe.Nothing() }, expected: '' },
      { context: { maybeNum: K(Maybe.Just(42)) }, expected: '42' },
      { context: { maybeNum: K(Maybe.Nothing()) }, expected: '' }
    ]

    cases.forEach(function (testcase) {
      t.equal(template(testcase.context), testcase.expected)
    })

    Handlebars.unregisterHelper('maybe')
    t.end()
  })

  test('maybe - template with default value', function (t) {
    Handlebars.registerHelper('maybe', maybeHelper.maybe)

    var template = Handlebars.compile(
      '{{maybe maybeNum defaultValue="N/A"}}'
    )

    var cases = [
      { context: { maybeNum: Maybe.Just(42) }, expected: '42' },
      { context: { maybeNum: Maybe.Nothing() }, expected: 'N/A' },
      { context: { maybeNum: K(Maybe.Just(42)) }, expected: '42' },
      { context: { maybeNum: K(Maybe.Nothing()) }, expected: 'N/A' }
    ]

    cases.forEach(function (testcase) {
      t.equal(template(testcase.context), testcase.expected)
    })

    Handlebars.unregisterHelper('maybe')
    t.end()
  })

  test('maybe - as a sub-expression', function (t) {
    Handlebars.registerHelper('maybe', maybeHelper.maybe)
    Handlebars.registerHelper('toUpper', function (context) {
      return context && context.toUpperCase()
    })

    var template = Handlebars.compile(
      '{{toUpper (maybe maybeNum)}}'
    )

    var cases = [
      { context: { maybeNum: Maybe.Just('foo') }, expected: 'FOO' },
      { context: { maybeNum: Maybe.Nothing() }, expected: '' },
      { context: { maybeNum: K(Maybe.Just('foo')) }, expected: 'FOO' },
      { context: { maybeNum: K(Maybe.Nothing()) }, expected: '' }
    ]

    cases.forEach(function (testcase) {
      t.equal(template(testcase.context), testcase.expected)
    })

    Handlebars.unregisterHelper('maybe')
    t.end()
  })
}

var Options = require('fantasy-options')
runTests(require('data.maybe'))
runTests(require('ramda-fantasy/src/Maybe'))
runTests(require('sanctuary'))
runTests({ Just: Options.Some, Nothing: K(Options.None) })
