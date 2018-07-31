var gulp = require('gulp');

gulp.task('release', function() {
    gulp.src('src/**/*')
    .pipe(gulp.dest('release'))
})