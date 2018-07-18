var stripDebug = require('gulp-strip-debug');

gulp.task('clean:tmp', function() {
    gulp.src('tmp/*').pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean:tmp']);