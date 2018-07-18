var gulp = require('gulp');
var stripDebug = require('gulp-strip-debug');

gulp.task('strip:src', function() {
    gulp.src('src/*')
    .pipe(stripDebug())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['strip:src']);