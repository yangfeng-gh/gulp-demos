'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var globby = require('globby');
var through = require('through2');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var reactify = require('reactify');

gulp.task('default', function () {
  // gulp 希望任务能返回一个 stream，因此我们在这里创建一个
  var bundledStream = through();

  bundledStream
    // 将输出的 stream 转化成为一个包含 gulp 插件所期许的一些属性的 stream
    .pipe(source('app.js'))
    // 剩下的部分，和你往常缩写的一样。
    // 这里我们直接拷贝 Browserify + Uglify2 范例的代码。
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    // 在这里将相应 gulp 插件加入管道
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
  bundle(bundledStream);
});

const bundle = async (bundledStream) => {
  // "globby" 替换了往常的 "gulp.src" 为 Browserify
  // 创建的可读 stream。
  var paths = await globby(['entries/*.js'])
  gutil.log(paths);
  // 创建 Browserify 实例
  var b = browserify({
    entries: paths,
    debug: true,
    transform: [reactify]
  });
  // 将 Browserify stream 接入到我们之前创建的 stream 中去
  // 这里是 gulp 式管道正式开始的地方
  b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    // 将输出的 stream 转化成为一个包含 gulp 插件所期许的一些属性的 stream
    .pipe(bundledStream)

  // 最后，我们返回这个 stream，这样 gulp 会知道什么时候这个任务会完成
  return bundledStream;
}
