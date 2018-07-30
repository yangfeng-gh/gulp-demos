var gulp = require('gulp');
var del = require('del');
var stripDebug = require('gulp-strip-debug');
var vinylPaths = require('vinyl-paths');
var tap = require('gulp-tap');
var path = require('path');

gulp.task('build', function(cb) {
    gulp.src('src/**/*')
    .pipe(tap(function(file, t) {
        if (path.extname(file.path) === '.js') {
            return t.through(stripDebug, [])
        }
    }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('del:dist', function(cb) {
    del([
        'dist/**/*',
        '!dist/deploy.json' // 删除dist目录下所有文件，但保留dist/deploy.json
    ], cb);
})

gulp.task('del:vinyl', function() {
    return gulp.src('dist/')
    .pipe(vinylPaths(del));
});

gulp.task('default', ['del:vinyl'])
