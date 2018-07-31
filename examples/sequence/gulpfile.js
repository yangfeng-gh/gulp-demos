var gulp = require('gulp');
var del = require('del'); // rm -rf

gulp.task('clean', function(cb) {
    del(['output']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
        cb();
    }).catch(err => {
        cb(err);
    })
});

gulp.task('templates', ['clean'], function() {
    var stream = gulp.src(['src/templates/*.hbs'])
        // 执行拼接，压缩，等。
        .pipe(gulp.dest('output/templates/'));
    return stream; // 返回一个 stream 来表示它已经被完成

});

gulp.task('styles', ['clean'], function() {
    var stream = gulp.src(['src/styles/app.less'])
        // 执行一些代码检查，压缩，等
        .pipe(gulp.dest('output/css/app.css'));
    return stream;
});

gulp.task('build', ['templates', 'styles']);

// templates 和 styles 将会并行处理
// clean 将会保证在任一个任务开始之前完成
// clean 并不会被执行两次，尽管它被作为依赖调用了两次

gulp.task('default', ['build']);