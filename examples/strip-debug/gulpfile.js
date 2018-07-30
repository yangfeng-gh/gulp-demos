/**
 * 用于打包生产环境，从源码中清除alert,console,debugger
 */
var gulp = require('gulp');
var stripDebug = require('gulp-strip-debug');

gulp.task('strip:src', function() {
    gulp.src('src/*')
    .pipe(stripDebug())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['strip:src']);