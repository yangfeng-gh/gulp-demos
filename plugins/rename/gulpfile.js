var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var scriptsPath = 'static/scripts';

function getFolders(dir) {
  return fs.readdirSync(dir)
  .filter(function(file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  })
}

gulp.task('scripts', function() {
  var folders = getFolders(scriptsPath);
  var tasks = folders.map(function(folder) {
    // 拼接成foldername.js
    // 写入输出
    // 压缩
    // 重命名为folder.min.js
    // 再一次写入输出
    return gulp.src(path.join(scriptsPath, folder, '/*.js'))
    .pipe(concat(folder + '.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    // .pipe(rename(folder + '.min.js'))
    // .pipe(rename({ extname: '.min.js' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
  });
  return merge(tasks);
});
