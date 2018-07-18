var gulp = require('gulp');
var header = require('gulp-header');
var footer = require('gulp-footer');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var cached = require('gulp-cached');
var remember = require('gulp-remember');
var scriptsGlob = 'src/**/*.js';

// 增量编译打包
gulp.task('scripts', function () {
  return gulp.src(scriptsGlob)
    .pipe(cached('scripts')) // scripts可选，只是一个名字，以便在后续的任务中操作cached返回的流
    .pipe(jshint()) // 对这些更改过的文件做一些特殊的处理,比如 jshinting
    .pipe(header('(function () {')) // 增加一些类似模块封装的东西
    .pipe(footer('})();'))
    .pipe(remember('scripts')) // scripts可选，只是一个名字，以便在后续的任务中操作remember返回的流
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/'));
});

gulp.task('watch', function () {
  var watcher = gulp.watch(scriptsGlob, ['scripts']); // 监视与 scripts 任务中同样的文件
  watcher.on('change', function (event) {
    if (event.type === 'deleted') { // 如果一个文件被删除了，则将其忘记
      delete cached.caches.scripts[event.path]; // gulp-cached 的删除 api
      remember.forget('scripts', event.path); // gulp-remember 的删除 api
    }
  });
});
