var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('sass', function() {
  return sass('src/styles/main.scss')
  .pipe(gulp.dest('dist/css'))
  .pipe(reload({ stream: true }));
});

gulp.task('')

gulp.task('serve', ['sass'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch(['*.html', 'scripts/**/*.js'], {cwd: 'src'}, reload);
  gulp.watch('src/styles/*.scss', ['sass']);
});
