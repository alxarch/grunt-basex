/*
 * grunt-basex
 * https://github.com/alxarch/grunt-basex
 *
 * Copyright (c) 2013 Alexandros Sigalas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var basexurl = 'http://files.basex.org/releases/BaseX.jar'

  // Project configuration.
  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js'
      , 'tasks/*.js'
      , 'lib/**/*.js'
      , '<%= nodeunit.tests %>'
      ]
    , options: {
        jshintrc: '.jshintrc',
      }
    }


    // Before generating any new files, remove any previously-created files.
  , clean: {
      tests: ['tmp']
    }
   
    // Configuration to be run (and then tested).
  , basex: {
        modules: {
          modA: 'test/fixtures/**/*.xqm'
        , options: {
            output: 'tmp/modules.txt'
          }
        }
      , options: {
          vmargs: {}
        }
      , test_simple: {
          options: {
            exec: '1 to 10'
          , output: 'tmp/simple.txt'
          }
        }
      , test_modules: {
          options: {
            exec: 'repo:list()',
            output: 'tmp/modules.txt'
          }
        }
      , test_full: {
          options: {
            exec: 'test/fixtures/test.xq' 
          , input: 'test/fixtures/test.xml'
          , debug: false
          , lines: true
          , output: 'tmp/full.txt'
          , writeback: true
          , chop: true
          , serializer: {
              method: 'xml'
            }
          , bind: {
                test: 'test'
            }
          , commands: ['GET createfilter']
          , set: {
              createfilter: '*.xml,*.xxx',
              addraw: false
            }
          }
        }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  })

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks')

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-nodeunit')

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'install', 'basex', 'nodeunit'])

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test'])

  grunt.registerTask('install', function(){
    
    if(grunt.file.exists('basex.jar')) return

    var http = require('http')
      , fs = require('fs')
      , done = this.async()
      , file = fs.createWriteStream("basex.jar")
      , request = http.get(basexurl, function(response) {
          response.pipe(file)
          response.on('end', function(){
            done()
          })
        })
    })

}
