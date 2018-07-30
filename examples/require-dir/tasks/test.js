var gulp = require('gulp');

gulp.task('test', function() {
    gulp.src('src/**/*')
    .pipe(gulp.dest('test'))
})