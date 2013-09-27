/*
 * grunt-basex
 * https://github.com/alxarch/grunt-basex
 *
 * Copyright (c) 2013 Alexandros Sigalas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var basex = require('basex-standalone')

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js'
      , 'tasks/*.js'
      , '<%= nodeunit.tests %>'
      ]
    , options: {
        jshintrc: '.jshintrc',
      }
    }
  , copy: {
      test: {
        src: 'test/data/test.xml'
      , dest: 'tmp/simple_update_src.xml'
      }
    }
    // Before generating any new files, remove any previously-created files.
  , clean: {
      tests: ['tmp', '!tmp/basex', 'tmp/basex/*']
    }
   
    // Configuration to be run (and then tested).
  , basex_modules: {
      test: {
        src: ['test/fixtures/**/*.xqm']
      }
    }
  , basex: {
      options: {
        basexpath: 'tmp/basex'
      }
    , xquery: {
        options: {
          xquery: 'file:write("tmp/xquery.txt", 1 to 10)'
        }
      }
    , output: {
        options: {
          xquery: '1 to 10',
          output: 'tmp/output.txt'
        }
      }
    , execute: {
        options: {
          execute: (new basex.Job()).xquery('1 to 10'),
          output: 'tmp/execute.txt'
        }
      }
    , import: {
        options: {
          xquery: '//text()',
          output: 'tmp/import.txt'
        },
        src: ['test/fixtures/test.xml']
      }
    , export: {
        options: {
          xquery: 'for $a in //a return replace node $a with <b>{$a/(*,text())}</b>',
          export: 'tmp/export'
        },
        src: ['test/fixtures/test.xml']
      }
    , bind: {
        options: {
          xquery: 'declare variable $e external; $e'
        , output: 'tmp/bind.txt'
        , bind: {e: 'ok'}
        }
      }
    }

    // Unit tests.
  , nodeunit: {
      tests: ['test/*_test.js']
    }

  })

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks')

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-nodeunit')

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy:test', 'basex', 'nodeunit'])

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test'])

}
