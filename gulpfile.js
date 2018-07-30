// gulp --cwd example/mocha

var gulp = require('gulp');
var mocha = require('mocha');
var config = require('./config.json')

gulp.task('default', function() {
    return gulp.src([config.mocha + 'test/*.js'])
    .pipe(mocha({
        reporter: 'list'
    }))
    .on('error', gutil.log);
}); 
