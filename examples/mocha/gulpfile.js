var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var tap = require('gulp-tap');

gulp.task('default', function() {
  return gulp.src(['test/test.spec.js']) 
  // 此处glob没有匹配到任何文件，但是mocha依然能够正常执行，
  // 是因为没有给mocha传递globs时，默认会执行test目录下的测试用例
  .pipe(tap(function(file) {
    gutil.log(file.contents.toString());
  }))
  .pipe(mocha({
    reporter: 'spec',
    globals: {
      should: require('should')
    }
  }));
});

gulp.task('mocha', function() {
  return gulp.src(['test/*.js'], {read: false})
  .pipe(mocha({
    reporter: 'list'
  }))
  .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
  gulp.watch(['src/**', 'lib/**', 'test/**'], ['mocha']);
});
