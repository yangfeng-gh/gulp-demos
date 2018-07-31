// npm install --save-dev gulp gulp-changed gulp-jscs gulp-uglify

var gulp = require('gulp');
var changed = require('gulp-changed');
var jscs = require('gulp-jscs');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');

// 我们在这里定义一些常量以供使用
var SRC = 'src/**/*.js';
var DEST = 'dist';

gulp.task('default', function() {
	return gulp.src(SRC)
		// `changed` 任务需要提前知道目标目录位置
		// 才能找出哪些文件是被修改过的
		.pipe(changed(DEST))
		// 只有被更改过的文件才会通过这里
    .pipe(jscs({
      config: '.jscsrc',
      esnext: true, // If you use ES6 http://jscs.info/overview.html#esnext
      fix: true, // Autofix code style violations when possible.
      verbose: true, // If you need output with rule names http://jscs.info/overview.html#verbose

    }))
    .pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'))
		// .pipe(uglify())
		.pipe(gulp.dest(DEST));
});

gulp.task('jade', function(){
	gulp.src('src/**/*.jade')
	.pipe(changed('app', {hasChanged: changed.compareContents}))
	.pipe(jade())
	.pipe(gulp.dest('app'))
});

gulp.task('marked', function() {
	gulp.src('src/content/about.md')
	.pipe(changed('dist', {transformPath: newPath => path.join(path.dirname(newPath), path.basename(newPath, '.md'), 'index.html')}))
	.pipe(marked())
	.pipe(rename(newPath => path.join(path.dirname(newPath), path.basename(newPath, '.md'), 'index.html')))
	.pipe(gulp.dest('dist'))
});