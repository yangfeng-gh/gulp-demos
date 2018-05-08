const gulp = require('gulp');
const tap = require('gulp-tap');
const gutil = require('gulp-util');

gulp.task('default', function() {
  gulp.src('src/**/index.js')
    .pipe(tap(function(file, t) {
      gutil.log(file.contents.toString());
    }))
});
