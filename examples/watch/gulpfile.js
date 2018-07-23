var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function() {
  return gulp.src('sass/*.scss')
  .pipe(sourcemaps.init())
  .pipe(watch('sass/*.scss'))
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('dist'));
});
