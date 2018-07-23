'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourceMaps = require('gulp-sourcemaps');

var DEST = 'dist/';

gulp.task('default', function() {
  return gulp.src('src/**/*.js')
    // 这会输出一个未压缩过的版本
    // .pipe(gulp.dest(DEST))
    // 这会输出一个压缩过的并且重命名未 foo.min.js 的文件
    .pipe(sourceMaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest(DEST));
});
