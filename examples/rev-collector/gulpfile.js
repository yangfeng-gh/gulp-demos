const gulp = require('gulp');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const minifyHTML = require('gulp-minify-html');
const runSequence = require('run-sequence');
const gutil = require('gulp-util');
const del = require('del');

gulp.task('css', function () {
  return gulp.src('src/css/*.css')
    .pipe(rev())
    .pipe(gulp.dest('dist/static/css'))
    .pipe(rev.manifest('dist/rev-manifest.json', {
      base: 'dist',
      merge: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
  return gulp.src('src/js/*.js')
    .pipe(rev())
    .pipe(gulp.dest('dist/static/js'))
    .pipe(rev.manifest('dist/rev-manifest.json', {
      base: 'dist',
      merge: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
  return gulp.src(['dist/rev-manifest.json', 'src/templates/**/*.html'])
    .pipe(revCollector({
      replaceReved: true,
      dirReplacements: {
        'css': 'static/css',
        'js': 'static/js',
        'cdn/': function (manifest_value) {
          return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
        }
      }
    }))
    .pipe(minifyHTML({
      empty: true,
      spare: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', (cb) => {
  del(['dist'])
    .then(paths => {
      gutil.log('Deleted files and folders:\n', paths.join('\n'));
      cb();
    }).catch(err => {
      cb(err);
    })
})

gulp.task('default', function (callback) {
  runSequence(
    'clean',
    'css',
    'js',
    'html',
    function (error) {
      if (error) {
        gutil.log(error.message);
      } else {
        gutil.log('BUILD FINISHED SUCCESSFULLY');
      }
      callback(error);
    });
});
