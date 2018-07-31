> Gulp plugin for compiling Pug templates

This Gulp plugin enables you to compile your Pug templates into HTML or JS, with support for template locals, custom Pug filters, AMD wrapping, and others. Here is a simple example using `gulp-pug`:

```
var pug = require('gulp-pug');

gulp.task('views', function buildHTML() {
  return gulp.src('views/*.pug')
  .pipe(pug({
    // Your options in here.
  }))
});
```

## API

### `pug([opts])`

- `opts` (`Object`): Any options from [Pug's API](https://pugjs.org/api/reference.html) in addition to `pug`'s own options.
- `opts.locals` (`Object`): Locals to compile the Pug with. You can also provide locals through the `data` field of the file object, e.g. with [`gulp-data`](https://npmjs.com/gulp-data). They will be merged with `opts.locals`.
- `opts.data` (`Object`): Same as `opts.locals`.
- `opts.client` (`Boolean`): Compile Pug to JavaScript code.
- `opts.pug`: A custom instance of Pug for `gulp-pug` to use.
- `opts.verbose`: display name of file from stream that is being compiled.

To change `opts.filename` use [`gulp-rename`](https://npmjs.com/gulp-rename) before `gulp-pug`.

Returns a stream that compiles Vinyl files as Pug.

## Also See

- [`pug`](http://github.com/gulp-community/pug)
- [`gulp-data`](https://npmjs.com/gulp-data): Using locals in your Pug templates easier.
- [`gulp-rename`](https://npmjs.com/gulp-rename): Change `opts.filename` passed into Pug.
- [`gulp-wrap-amd`](https://github.com/phated/gulp-wrap-amd): Wrap your Pug in an AMD wrapper.

## Thanks

- Many thanks to [Blaine Bublitz](https://github.com/phated) for the original `gulp-jade` plugin.

## LICENSE

[MIT](https://npm.taobao.org/package/gulp-pug) © Jamen Marzonie
