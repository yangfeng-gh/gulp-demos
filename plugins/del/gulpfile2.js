var gulp = require('gulp');
var stripDebug = require('gulp-strip-debug'); // 仅用于本例做演示
var del = require('del');
var vinylPaths = require('vinyl-paths');

gulp.task('clean:tmp', function () {
  return gulp.src('tmp/*')
    .pipe(stripDebug())
    .pipe(gulp.dest('dist'))
    // .pipe(vinylPaths(del));
});

gulp.task('default', ['clean:tmp']);