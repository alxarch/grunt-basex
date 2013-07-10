/*
 * grunt-basex
 * https://github.com/alxarch/grunt-basex
 *
 * Copyright (c) 2013 Alexandros Sigalas
 * Licensed under the MIT license.
 */

'use strict';

var f = require('util').format
  , _ = require('lodash')
  , fs = require('fs')
  , path = require('path')
  , basex = require('basex-standalone')


module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json')
      , isfile = function(f){ 
          return f && (typeof f === 'string') &&  (f[f.length - 1] !== '/') && !grunt.file.isDir(f) 
        }
      , isdir = function(d){
          return d && typeof d === 'string' && 
            (d[d.length - 1] === '/' && !grunt.file.isFile(d))
        }

    // Setup 'global' environment settings for basex-standalone
     _.assign(basex.env, grunt.config.get('basex_env') || {})
    grunt.file.mkdir(basex.env.path)

    grunt.registerMultiTask('basex_modules', 'Installs XQuery modules.', function() {

      var done = this.async()
        , modules = [].concat(this.files.map(function(f){
            return f.src
          }))
        , install = modules.map(function(m){
            return f('REPO INSTALL %s', m)
          })

      basex({ commands: install})
        .then(function(){
          done()
        })
        .fail(function(error){
          grunt.log.error(error.message)
          done(false)
        })
    })

    grunt.registerMultiTask('basex', pkg.description, function() {

        var done = this.async()
          , targetopt = this.options()
          , count = 0
          , opened = {}
          , files = this.files
          , output = function(files, data){
              if(!_.isArray(files)) files = [files]

              files.forEach(function(f){
                if(_.has(opened, f)) 
                  opened[f].write(data)
                else if(isfile(f)){
                  grunt.file.write(f, '')
                  opened[f] = fs.createWriteStream(f)
                  opened[f].write(data)
                }
              })
            }
          , end = function(err){
              _.each(opened, function(ws){ ws.end() })

              if(err instanceof Error) throw err
              done()
            }


        if(files.length === 0) files = [{}]

        files.forEach(function(file){
          
          var dst = file.dest || []
            , src = file.src || []
            , fileopt = _.assign({}, targetopt, file)
            , run = grunt.file.expand(fileopt.run || [])

          if(typeof dst === 'string') dst = [dst]
          if(typeof src === 'string') src = [src]
          if(run.length === 0) run = [basex.defaults.run]
          if(src.length === 0) src = [basex.defaults.input]

          src.forEach(function(s){
            var d = dst.map(function(d){
                  return isdir(d) ? path.join(d[0], s) : d
                })
            
            run.forEach(function(r){
              var opt = _.assign({}, fileopt, { input: s, run: r })
              count++
              basex(opt)
              .then(function(data){
                count--

                output(d, data)
                if(count <= 0) end()
              })
              .fail(end)
            })
          })
        })
    })
}
