var gulp = require('gulp');
var del = require('del');

gulp.task('compile', function(cb) {
    gulp.src('src/**/*')
    .pipe(gulp.dest('dist/'))
})

gulp.task('clean', function(cb) {
    del([
        'dist/',
        // '!dist/deploy.json' // 删除dist目录下所有文件，但保留dist/deploy.json
    ], cb);
})

gulp.task('default', ['clean', 'compile'])
