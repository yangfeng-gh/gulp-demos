var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourceMaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var ejs = require('gulp-ejs');

gulp.task('sass', function () {
  return sass('src/styles/*.scss')
    .pipe(gulp.dest('dist/static/css'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('js', function () {
  return gulp.src('src/scripts/*.js')
    .pipe(sourceMaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest('dist/static/js'));
})

gulp.task('ejs', function() {
  return gulp.src('src/templates/*.ejs')
  .pipe(ejs({title: 'ejs demo', msg: 'Hello ejs'}, {}, { ext: '.html' }))
  .on('error', gutil.log)
  .pipe(gulp.dest('dist'))
})

gulp.task('default', ['sass', 'js', 'ejs'])

gulp.task('serve', ['sass', 'js', 'ejs'], function () {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch('src/templates/*.ejs', ['ejs']);
  gulp.watch('src/styles/*.scss', ['sass']);
  gulp.watch('src/scripts/*.js', ['js']);
  gulp.watch(['*.html', 'static/js/*.js', 'static/css/*.css'], {
    cwd: 'dist'
  }, reload);
});
