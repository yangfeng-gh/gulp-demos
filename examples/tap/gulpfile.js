const gulp = require('gulp');
const tap = require('gulp-tap');
const gutil = require('gulp-util');
const coffee = require('gulp-coffee');
const path = require('path');
const sass = require('gulp-sass');

gulp.task('script', function () {
  gulp.src("src/**/*.{coffee,js}")
    .pipe(tap(function (file, t) {
      gutil.log(file.contents.toString());
      if (path.extname(file.path) === '.coffee') {
        return t.through(coffee, []);
      }
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('scss', function () {
  gulp.src('src/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build'))
});

// Run your own functions on a pipeline contents, as string
gulp.task('html', function () {
  gulp.src('src/**/*.html')
    .pipe(tap(function (file) {
      // gutil.log(file.contents.toString());
      file.contents = Buffer.from(yourFunction(file.contents.toString()))
    }))
});

function yourFunction(input) {
  return input.replace(/h3/g, 'h2');
}

// Save files to different locations based on file extension.
gulp.task('default', function () {
  var destinations = {
    html: 'dist',
    js: 'dist/scripts',
    css: 'dist/styles',
    img: 'dist/assets'
  };

  var srcFiles = ['src/*.html', 'src/*.scss', 'src/*.coffee', 'src/*'];

  gulp.src(srcFiles).pipe(tap(where));

  function where(file, t) {
    var destPath;
    var match;
    match = function (p) {
      var ext;
      ext = path.extname(p).substr(1); // remove leading .
      if (ext === 'jpg' || ext === 'png' || ext === 'svg' || ext === 'gif') {
        ext = 'img'
      }
      return destinations[ext] || false
    };
    destPath = match(file.path);
    if (destPath) {
      return t.through(gulp.dest, [destPath])
    }
  }
});
