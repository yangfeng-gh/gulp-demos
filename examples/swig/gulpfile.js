var gulp = require('gulp');
var swig = require('gulp-swig');
var frontMatter = require('gulp-front-matter');

gulp.task('compile-page', function() {
  gulp.src('page.html')
      .pipe(frontMatter({ property: 'data' }))
      .pipe(swig())
      .pipe(gulp.dest('build'));
});

gulp.task('default', ['compile-page']);