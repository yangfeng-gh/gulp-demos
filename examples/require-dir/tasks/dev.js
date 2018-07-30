var gulp = require('gulp');

gulp.task('dev', function() {
    gulp.src('src/**/*')
    .pipe(gulp.dest('dev'))
})