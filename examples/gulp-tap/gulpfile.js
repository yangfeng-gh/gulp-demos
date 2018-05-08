const gulp = require('gulp');
const tap = require('gulp-tap');
const util = require('gulp-util');

gulp.task('default', function() {
  gulp.src('src/**/index.js')
    .pipe(tap(function(file, t) {
      util.log(file.contents.toString());
    }))
});
