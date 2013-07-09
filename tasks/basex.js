/*
 * grunt-basex
 * https://github.com/alxarch/grunt-basex
 *
 * Copyright (c) 2013 Alexandros Sigalas
 * Licensed under the MIT license.
 */

'use strict';

var format = require('util').format;
var path = require('path');
var stream = require('stream');
var fs = require('fs');
var _ = require('lodash');
var standalone = require('../lib/standalone.js');
module.exports = function(grunt) {


    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    var descr = 'Execute tasks with BaseX in standalone mode.'

    grunt.registerMultiTask('basex', descr, function() {

        grunt.file.mkdir('tmp/basex')

        var done = this.async()
          , opt = this.options(standalone.defaults)

          , out = function(data, handler){
                if(_.isFunction(handler)) handler(data)
            }
          , callback = function(error, stdout, stderr){
                out(stdout, opt.stdout)
                out(stderr, opt.stderr)

                if(error === null) done()
                else{
                    grunt.log.error(stderr)
                    done(false)
                }
            }

        // Handle special target 'modules' a bit differently
        if(this.target === 'modules'){

            opt.writeback = false
            opt.input = null
            opt.bind = null
            opt.serializer = null
            opt.exec = null
            // opt.stdout = _.bind(grunt.log.write, grunt.log)

            opt.commands = _(this.data)
                .pick(this.args.length ? this.args : _.identity)
                .reject('options', 'files')
                .toArray()
                .map(function(p){ 
                    return grunt.file.expand(p)
                })
                .flatten()
                .map(function(f){
                    return format('REPO INSTALL %s', f)
                })
                .valueOf()
        }
        
        console.log(this.target)
        standalone.exec(opt, callback)

    });

};
