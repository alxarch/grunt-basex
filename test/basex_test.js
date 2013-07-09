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
    done();
  },
  simple: function(test){
    test.expect(1);
    var actual = grunt.file.read('tmp/simple.txt');
    test.equal(actual, '1 2 3 4 5 6 7 8 9 10', 'should be able to run simple queries.');
    test.done();
  },
  modules: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/modules.txt');
    var expected = '<package name="com.example.test" type="Internal"/>';
    test.equal(actual, expected, 'should install modules locally.');
    test.done();
  },
  full: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/full.txt');
    var expect = grunt.file.read('test/expect/full.txt');
        
    test.equal(actual, expect, 'complex tasks get done');
    test.done();
  },
};
