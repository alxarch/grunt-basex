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
	noExecAndNoCommands: function(test){
		test.expect(1);
		test.ok(standalone.cmd().match(/ "\(\)"$/), 'should add empty-sequence query if no commands or exec is provided.');
		test.done();
	},
	addsSerializerArgs: function(test){
		test.expect(1);
		var cmd = standalone.cmd({serializer: {
			method: 'html',
			version: '5'
		}});

		test.ok(cmd.match(/ \-smethod=html \-sversion=5 /), 'should add serialization arguments.');
		test.done();
	},
	addsOutputArg: function(test){
		test.expect(1);
		var cmd = standalone.cmd({output: 'test.txt'});
		test.ok(cmd.match(/ \-o "test.txt" /), 'should add output argument.');
		test.done();
	},
	bindsVariables: function(test){
		test.expect(1);
		var ok = standalone.cmd({
			exec: '()',
			bind: {
				test: 'test'
			}
		}).indexOf('-btest=test') > 0;
		console.log('a');
		test.ok(ok, 'should add arguments to bind variables.');
		test.done();
	}
};