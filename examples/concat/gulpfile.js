var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('javascript', function () {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename({suffix: 'min'}))
    .pipe(sourcemaps.write('./')) // write不指定路径，则为inline-sourcemaps
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['javascript']);
