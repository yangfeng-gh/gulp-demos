var gulp = require('gulp');
var combiner = require('stream-combiner2');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

gulp.task('combine', ['clean'], function() {
  var combined = combiner.obj([
    gulp.src('src/**/*.js'),
    uglify(), rename({suffix: '.min'}),
    gulp.dest('dist/js/')
  ]);

  // 任何在上面的 stream 中发生的错误，都不会抛出，而是会被监听器捕获
  combined.on('error', console.error.bind(console));

  return combined;
});

gulp.task('clean', function(cb) {
  return del([
    'dist/'
  ], cb)
});

gulp.task('default', ['combine']);
