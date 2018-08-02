var gulp = require('gulp');
var merge = require('merge-stream');
var concat = require('gulp-concat');

gulp.task('build', function () {
  var bootstrap = gulp.src('src/bootstrap/js/*.js')
    .pipe(gulp.dest('dist'));

  var jquery = gulp.src('src/jquery-cookie/*.js')
    .pipe(gulp.dest('dist'));

  return merge(bootstrap, jquery);
});

gulp.task('default', ['build'], function () {
  return gulp.src(['src/foo/*', 'src/bar/*'])
    .pipe(concat('result.txt'))
    .pipe(gulp.dest('dist'));
});
