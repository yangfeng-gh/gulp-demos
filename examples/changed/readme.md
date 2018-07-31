# gulp-changed

> Only pass through changed files

No more wasting precious time on processing unchanged files.

By default it's only able to detect whether files in the stream changed. If you require something more advanced like knowing if imports/dependencies changed, create a custom comparator, or use [another plugin](https://github.com/gulpjs/gulp#incremental-builds).

## Install

```
$ npm install --save-dev gulp-changed
```

*Support this module by buying this excellent Node.js course.*

## Usage

```
const gulp = require('gulp');
const changed = require('gulp-changed');
const ngAnnotate = require('gulp-ng-annotate'); // Just as an example

const SRC = 'src/*.js';
const DEST = 'dist';

gulp.task('default', () =>
	gulp.src(SRC)
		.pipe(changed(DEST))
		// `ngAnnotate` will only get the files that
		// changed since the last time it was run
		.pipe(ngAnnotate())
		.pipe(gulp.dest(DEST))
);
```

## API

### changed(destination, [options])

#### destination

Type: `string` `Function`

Destination directory. Same as you put into `gulp.dest()`.

This is needed to be able to compare the current files with the destination files.

Can also be a function returning a destination directory path.

#### options

Type: `Object`

##### cwd

Type: `string`
Default: `process.cwd()`

Working directory the folder is relative to.

##### extension

Type: `string`

Extension of the destination files.

Useful if it differs from the original, like in the example below:

```
gulp.task('jade', () =>
	gulp.src('src/**/*.jade')
		.pipe(changed('app', {extension: '.html'}))
		.pipe(jade())
		.pipe(gulp.dest('app'))
);
```
**jade has been renamed to pug, please install the latest version of pug**

##### hasChanged

Type: `Function`
Default: `changed.compareLastModifiedTime`

Function that determines whether the source file is different from the destination file.

###### Built-in comparators

- `changed.compareLastModifiedTime`
- `changed.compareContents`
- `changed.compareSha1Digest` (Deprecated)

###### Example

```
gulp.task('jade', () =>
	gulp.src('src/**/*.jade')
		.pipe(changed('app', {hasChanged: changed.compareContents}))
		.pipe(jade())
		.pipe(gulp.dest('app'))
);
```

You can also supply a custom comparator function which will receive the following arguments and should return `Promise`.

- `stream` *(transform object stream)* - Should be used to queue `sourceFile` if it passes some comparison
- `sourceFile` *(Vinyl file object)*
- `destPath` *(string)* - Destination for `sourceFile` as an absolute path

##### transformPath

Type: `Function`

Function to transform the path to the destination file. Should return the absolute path to the (renamed) destination file.

Useful if you rename your file later on, like in the below example:

```
gulp.task('marked', () =>
	gulp.src('src/content/about.md')
		.pipe(changed('dist', {transformPath: newPath => path.join(path.dirname(newPath), path.basename(newPath, '.md'), 'index.html')}))
		.pipe(marked())
		.pipe(rename(newPath => path.join(path.dirname(newPath), path.basename(newPath, '.md'), 'index.html'))))
		.pipe(gulp.dest('dist'))
);
```

## In-place change monitoring

If you're looking to process source files in-place without any build output (formatting, linting, etc), have a look at [gulp-changed-in-place](https://github.com/alexgorbatchev/gulp-changed-in-place).

## License

MIT © [Sindre Sorhus](https://sindresorhus.com/)

---

# jade

**jade has been renamed to pug, please install the latest version of pug**

Full documentation is at [jade-lang.com](http://jade-lang.com/)

## Installation

via npm:

```
$ npm install jade
```

## Syntax

Jade is a clean, whitespace sensitive syntax for writing html. Here is a simple example:

```
doctype html
html(lang="en")
  head
    title= pageTitle
    script(type='text/javascript').
      if (foo) bar(1 + 5)
  body
    h1 Jade - node template engine
    #container.col
      if youAreUsingJade
        p You are amazing
      else
        p Get on it!
      p.
        Jade is a terse and simple templating language with a
        strong focus on performance and powerful features.
```

becomes

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Jade</title>
    <script type="text/javascript">
      if (foo) bar(1 + 5)
    </script>
  </head>
  <body>
    <h1>Jade - node template engine</h1>
    <div id="container" class="col">
      <p>You are amazing</p>
      <p>Jade is a terse and simple templating language with a strong focus on performance and powerful features.</p>
    </div>
  </body>
</html>
```

The official [jade tutorial](http://jade-lang.com/tutorial/) is a great place to start. While that (and the syntax documentation) is being finished, you can view some of the old documentation [here](https://github.com/jadejs/jade/blob/master/jade.md) and [here](https://github.com/jadejs/jade/blob/master/jade-language.md)

## API

For full API, see [jade-lang.com/api](http://jade-lang.com/api/)

```
var jade = require('jade');

// compile
var fn = jade.compile('string of jade', options);
var html = fn(locals);

// render
var html = jade.render('string of jade', merge(options, locals));

// renderFile
var html = jade.renderFile('filename.jade', merge(options, locals));
```

### Options

- `filename` Used in exceptions, and required when using includes
- `compileDebug` When `false` no debug instrumentation is compiled
- `pretty` Add pretty-indentation whitespace to output *(false by default)*

## Browser Support

The latest version of jade can be download for the browser in standalone form from [here](https://github.com/jadejs/jade/raw/master/jade.js). It only supports the very latest browsers though, and is a large file. It is recommended that you pre-compile your jade templates to JavaScript and then just use the [runtime.js](https://github.com/jadejs/jade/raw/master/runtime.js) library on the client.

To compile a template for use on the client using the command line, do:

```
$ jade --client --no-debug filename.jade
```

which will produce `filename.js` containing the compiled template.

## Command Line

After installing the latest version of [node](http://nodejs.org/), install with:

```
$ npm install jade -g
```

and run with

```
$ jade --help
```

## Additional Resources

Tutorials:

- cssdeck interactive [Jade syntax tutorial](http://cssdeck.com/labs/learning-the-jade-templating-engine-syntax)
- cssdeck interactive [Jade logic tutorial](http://cssdeck.com/labs/jade-templating-tutorial-codecast-part-2)
- [Jade について。](https://gist.github.com/japboy/5402844) (A Japanese Tutorial)
- [Jade - 模板引擎](https://github.com/jadejs/jade/blob/master/Readme_zh-cn.md)

Implementations in other languages:

- [php](http://github.com/everzet/jade.php)
- [scala](http://scalate.fusesource.org/versions/snapshot/documentation/scaml-reference.html)
- [ruby](https://github.com/slim-template/slim)
- [python](https://github.com/SyrusAkbary/pyjade)
- [java](https://github.com/neuland/jade4j)

Other:

- [Emacs Mode](https://github.com/brianc/jade-mode)
- [Vim Syntax](https://github.com/digitaltoad/vim-jade)
- [TextMate Bundle](http://github.com/miksago/jade-tmbundle)
- [Coda/SubEtha syntax Mode](https://github.com/aaronmccall/jade.mode)
- [Screencasts](http://tjholowaychuk.com/post/1004255394/jade-screencast-template-engine-for-nodejs)
- [html2jade](https://github.com/donpark/html2jade) converter
- [jade2php](https://github.com/SE7ENSKY/jade2php) converter
- [Jade Server](https://github.com/ded/jade-server) Ideal for building local prototypes apart from any application

## License

MIT