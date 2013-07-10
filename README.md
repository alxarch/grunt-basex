# grunt-basex

> Grunt plugin to run XQuery tasks with [BaseX](http://basex.org).

## Getting Started

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-basex --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-basex');
```

## The "basex" task

### Overview
In your project's Gruntfile, add a section named `basex` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  basex: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

## Files

All matched files will be used as input / output pairs.

File matching behaviour:

- If `dest` is a single file, the operation will 
  be executed for each `src` and *all* output 
  will be appended to `dest`.

> Note 'single file' means either an existing file *or* not an existing directory.

> Note: For the moment the order of the output is not preserved. In order to preserve it use multiple pairs or a command script

- If `dest` is a directory, the operation will 
  be executed for each `src` and *each* output
  will be put in a file at `dest/src`

> Note: 'is a directory' means either name ending in '/' or an existing directory.

> Note: If some `src` is a directory all output will be put in a *single* file.

- If `dest` are multiple files/dirs *both* of the above 
  described behaviours will occur
 

### Options

All [options](https://github.com/alxarch/basex-standalone#options) of `basex-standalone` can be used to configure each target and even each pair.

To override options for a specific `src/dest` pair use [Files Array Format](http://gruntjs.com/configuring-tasks#files-array-format)

> The *only* option that behaves differently is `run`.
> `run` is treated as a file pattern and expanded.
> The operation will execute *for each* `src` *for each*
> resolved file in `run`.


### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  basex: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  basex: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
    