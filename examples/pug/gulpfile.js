var gulp = require('gulp');
var jade = require('jade');
var pug = require('pug');
var katex = require('katex');
var gulpJade = require('gulp-jade');
var gulpPug = require('gulp-pug');
var gulpWrapAmd = require('gulp-wrap-amd');

jade.filters.katex = katex.renderToString;
jade.filters.shoutFilter = function (str) {
  return str + '!!!!';
}

gulp.task('jade', function () {
  return gulp.src('src/**/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('pug', function buildHTML() {
  return gulp.src('src/**/*.pug')
  .pipe(gulpPug({
    pug: pug,
    pretty: true,
    locals: {
      pageTitle: 'page2',
      foo: true,
      bar: 'alert',
      youAreUsingPug: false
    },
    // data: {}, // same as locals
    verbose: true
  }))
  .pipe(gulp.dest('dist/'))
});

gulp.task('wrap', function() {
  gulp.src('src/**/*.jade')
    .pipe(gulpJade({
      client: true
    }))
    .pipe(gulpWrapAmd({
      deps: ['jade'],
      params: ['jade']
    }))
    .pipe(gulp.dest('dist'))
});