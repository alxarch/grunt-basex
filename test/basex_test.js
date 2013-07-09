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
  modules: function(test) {

    var msg = 'should install modules locally.'
      , actual = grunt.file.read('tmp/modules.txt')
      , expect = grunt.file.read('test/expect/modules.txt')

    test.expect(1)
    test.equal(actual, expect, msg)
    test.done()
  },
  full: function(test) {
    var msg = 'should get complex tasks done.'
      , actual = grunt.file.read('tmp/full.txt')
      , expect = grunt.file.read('test/expect/full.txt')

    test.expect(1)
    test.equal(actual, expect, msg)
    test.done()
  },
};
