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
  simple: function(test){
    var msg = 'should run simple queries.'
      , actual = grunt.file.read('tmp/simple.txt')
      , expect = grunt.file.read('test/expect/simple.txt')

    test.expect(1)
    test.equal(actual, expect)
    test.done()
  },
  files: function(test){
    var msg = 'should add files and use them as context.'
      , actual = grunt.file.read('tmp/files.txt')

    test.expect(1)
    test.equal(actual, 'ok')
    test.done()
  },
  export: function(test){
    var msg = 'should export processed data to a specified directory.'
      , actual = grunt.file.read('tmp/export/test.xml')
      , expect = grunt.file.read('test/expect/export.xml')

    test.expect(1)
    test.equal(actual, expect)
    test.done()
  },
  binds: function(test){
    var msg = 'should bind external variables.'
      , actual = grunt.file.read('tmp/bind.txt')

    test.expect(1)
    test.equal(actual, 'ok')
    test.done()
  }
};
