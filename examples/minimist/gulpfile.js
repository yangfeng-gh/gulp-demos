var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minimist = require('minimist');

var argvs = minimist(process.argv.slice(2));
console.log('================' + JSON.stringify(argvs.prod))

gulp.task('scripts', function() {
  return gulp.src('src/**/*.js')
  .pipe(gulpif(argvs.prod || process.env.NODE_ENV === 'production', uglify())) // 仅在生产环境下进行压缩
  .pipe(gulp.dest('dist'));
});
