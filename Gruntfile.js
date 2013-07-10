/*
 * grunt-basex
 * https://github.com/alxarch/grunt-basex
 *
 * Copyright (c) 2013 Alexandros Sigalas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    basex_env: {
        jar: 'basex.jar'
      , path: 'tmp/basex'
    }

  , jshint: {
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
      simple_query: {
        options: {
          xquery: '1 to 10'
        }
      , dest: 'tmp/simple.txt'
      }
    , test_modules: {
        options: {
          xquery: 'repo:list()'
        }
      , dest: 'tmp/modules.txt'
    }
    , simple_update: {
        options: {
          update: true
        , xquery: '(for $n in //* return replace node $n with <replaced/>,db:output("ok"))'
        }
      , files: [
          {
            src: 'tmp/simple_update_src.xml'
          , dest: 'tmp/simple_update_dest.xml'
          }
        , {
            src: 'tmp/simple_update_src.xml'
          , dest: 'tmp/simple_update_dest.xml'
          }
        ]
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
  grunt.registerTask('test', ['clean', 'copy:test', 'basex_modules', 'basex', 'nodeunit'])

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test'])

}
