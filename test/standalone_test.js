'use strict';

var standalone = require('../lib/standalone.js');

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

exports.standalone = {
    addsEmptySequence: function(test){
        var msg = 'should add empty-sequence query if nothing to do.'
          , cmd = standalone.cmd()
          , ok = cmd.match(/ "\(\)"$/)

        test.expect(1)
        test.ok(ok, msg)
        test.done()
    },
    addsSerializerArgs: function(test){
        var msg = 'should add serialization arguments.'
          , ser = {
                method: 'html',
                version: '5'
            }
          , cmd = standalone.cmd({serializer: ser})
          , ok = cmd.match(/ \-smethod=html \-sversion=5 /)

        test.expect(1)
        test.ok(ok, msg)
        test.done()
    },
    addsOutputArg: function(test){
        var msg = 'should add output argument.'
          , cmd = standalone.cmd({output: 'test.txt'})
          , ok = cmd.match(/ \-o "test.txt" /)

        test.expect(1)
        test.ok(ok, msg)
        test.done()
    },
    bindsVariables: function(test){
        var msg = 'should add arguments to bind variables.'
          , cmd = standalone.cmd({
                exec: '()',
                bind: {test: 'test'}
            })
          , ok = cmd.indexOf('-btest=test') > 0

        test.expect(1)
        test.ok(ok, msg)
        test.done()
    }
};