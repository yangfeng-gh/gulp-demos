var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var filter = require('gulp-filter');
var gutil = require('gulp-util');
var tap = require('gulp-tap');

function isChanged(file) {
  return file.event === 'change';
}
var filterChanged = filter(isChanged);

gulp.task('default', function() {
  return gulp.src('sass/*.scss')
  .pipe(sourcemaps.init())
  .pipe(watch('sass/*.scss', {ignoreInitial: true}))
  .on('change', function() {
    gutil.log('sass compile finished')
  })
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('dist'));
});
