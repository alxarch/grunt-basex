/*
 * grunt-basex
 * https://github.com/alxarch/grunt-basex
 *
 * Copyright (c) 2013 Alexandros Sigalas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = (function(){

var f = require('util').format
  , _ = require('lodash')
  , exec = require('child_process').exec
  , path = require('path')
  , defaults = {
        commands: []
      , path: path.join(process.cwd(), 'tmp', 'basex')
      , java: '/usr/bin/env java'
      , jar: 'basex.jar'
      , input: null
      , output: null
      , writeback: false
      , chop: true
      , debug: false
      , lines: false
      , set: {}
      , bind: {}
      , serializer: {}
      , exec: null
    }
  , esc = function(str){
        // Helper function to escape double quotes in strings.
        return str.toString().replace(/"/g, '\\"')
    }
  , val = function(opt){
        return _.isPlainObject(opt) ? 
        _(opt)
            .map(function(value, name){
                return f('%s=%s', name, value)
            })
            .valueOf()
            .join(',')
        : 
        opt
    }
  , o2a = function(obj, a){
        a = a || ''
        return _(obj).map(function(v, n) {
            return f('-%s%s=%s', a, n, val(v))
        }).valueOf()
    }
  , standalone = {
        exec: function(options, callback){
            return exec(this.cmd(options), callback)
        },
        cmd: function(options){
            var opt = _.extend({}, defaults, (options || {}))
              , set = _(opt.set).map(function(v,n){ 
                    return f('SET %s %s', n, v) 
                }).valueOf()
              , com = set.concat(opt.commands).map(esc).join(';')
              , cmd = [].concat(
                    opt.java
                  , o2a(opt.vmargs)
                  , f('-Dorg.basex.path="%s"', opt.path)
                  , f('-cp %s org.basex.BaseX', opt.jar)

                  , opt.input && f('-i"%s"', esc(opt.input))
                  , opt.output && f('-o "%s"', esc(opt.output))
                  , opt.lines && '-L'
                  , opt.writeback && '-u'
                  , !opt.chop && '-w'
                  , opt.debug && '-d'

                  , com && f('-c"%s"', com)

                  , o2a(opt.bind, 'b')
                  , o2a(opt.serializer, 's')

                  , opt.exec && f('"%s"', esc(opt.exec))

                )

            // add empty-sequence query if no commands 
            // and no exec options are defined.
            if(opt.exec || com)
            ;else cmd.push('"()"')
            
            return cmd.filter(_.identity).join(' ')
        }
    }

return {
    cmd: standalone.cmd,
    exec: standalone.exec,
    defaults: defaults
}

})()
