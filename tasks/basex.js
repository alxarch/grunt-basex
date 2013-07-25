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
      , pkg = grunt.file.readJSON('package.json')
      , crypto = require('crypto')
      , _ = require('lodash')
      , __ = function(){
            return _(arguments).toArray().flatten().compact()
        }

    grunt.registerMultiTask('basex', pkg.description, function(){
        var done = this.async()
          , opt = this.options()
          , omit = ['bind', 'run', 'xquery', 'commands', 'input', 'output']
          , b = basex.partial(_.omit(opt, omit))
          , job = new basex.Job()
          , db = opt.db || crypto.randomBytes(32).toString('hex')

        job.bind('db', db)

        if(opt.modules) job.requires(opt.modules)

        job.bind(opt.bind || {})
    
        if(this.files.length > 0)
            job.check(db)

        this.files.forEach(function(f){
            var path = __(f.dest)

            path.each(function(p){
                job.import(f.src, p, f.orig)
            })

            if(path.isEmpty()) job.import(f.src, f.orig)
               
        })


        __(opt.execute).each(job.execute.bind(job))
        __(opt.xquery).each(job.xquery.bind(job))
        __(opt.run).each(function(r){
            __(grunt.file.expand(r)).each(job.run.bind(job))
        })

        if(opt.export)
            job.export(opt.export)

        if(opt.drop) job.dropdb(db)

        b(job)  
            .then(function(data){
                __(opt.output).each(function(f){
                    grunt.file.write(f, data)
                })
                done()
            })
            .fail(function(error){
                grunt.log.error(error)
                done(false)
            })
            .done()
    })
}
