var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minimist = require('minimist');

var knownOptions = {
  string: 'env',
  default: {env: process.env.NODE_ENV || 'production'}
}

var options = minimist(process.argv.slice(2), knownOptions);
console.log('================' + JSON.stringify(options))

gulp.task('scripts', function() {
  return gulp.src('src/**/*.js')
  .pipe(gulpif(options.env === 'production', uglify())) // 仅在生产环境下进行压缩
  .pipe(gulp.dest('dist'));
});
