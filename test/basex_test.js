'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.basex = {
  setUp: function(done) {
    // setup here if necessary
    done()
  },
  xquery: function(test){
    var msg = 'Should run simple queries.'
      , actual = grunt.file.read('tmp/xquery.txt')
      , expect = '1 2 3 4 5 6 7 8 9 10'

    test.expect(1)
    test.equal(actual, expect)
    test.done()
  },
  output: function(test){
    var msg = 'Should output results in files.'
      , actual = grunt.file.read('tmp/output.txt')
      , expect = '1 2 3 4 5 6 7 8 9 10'

    test.expect(1)
    test.equal(actual, expect)
    test.done()
  },
  import: function(test){
    var msg = 'Should add files and use them as context.'
      , actual = grunt.file.read('tmp/import.txt')

    test.expect(1)
    test.equal(actual, 'ok')
    test.done()
  },
  export: function(test){
    var msg = 'Should export processed data to a specified directory.'
      , actual = grunt.file.read('tmp/export/test.xml')
      , expect = grunt.file.read('test/expect/export.xml')

    test.expect(1)
    test.equal(actual, expect)
    test.done()
  },
  execute: function(test){
    var msg = 'Should execute jobs.'
      , actual = grunt.file.read('tmp/execute.txt')
      , expect = '1 2 3 4 5 6 7 8 9 10'

    test.expect(1)
    test.equal(actual, expect)
    test.done()
  },
  bind: function(test){
    var msg = 'should bind external variables.'
      , actual = grunt.file.read('tmp/bind.txt')

    test.expect(1)
    test.equal(actual, 'ok')
    test.done()
  }
};
