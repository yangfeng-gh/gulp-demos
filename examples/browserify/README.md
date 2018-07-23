# Browserify是一个浏览器端代码模块化工具

## 简介

服务器端NodeJS自带模块功能，可以使用require和module.exports构建项目

随着项目的增大，浏览器端任务越来越重，依赖关系越来越复杂，需要使用工具实现模块化。

Browserify通过require和module.exports来导入和导出。

Browserify的原理：部署时处理代码依赖，将模块打包为一个文件。

## 存在的问题：

### 打包为单个文件存在的问题：

- 暂时用不到的代码也会被打包，体积大，首次加载速度慢
- 只要一个模块更新，整个文件缓存失效

### Browserify的解决方案：entry point，入口点技术

- 每个入口点打包一个文件，两个入口点的相同依赖模块单独打包为common.js，避免空间的浪费。
- 可以解决单个文件的问题，代价是增加依赖维护成本

### 入口点技术带来的问题

- Browserify无法判断入口点，需要自己判断入口点。如果网站非常庞大，这就是个麻烦的问题。
- 所以需要自己定义入口点。

以一个gulpfile.js为例，假设已经安装好了所有的模块。

```js
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');

gulp.task('jsx', function () {
  browserify({
    entries: ['./app.jsx'],
    transform: [reactify]
  })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./'));
})
// gulp.task('default', ['jsx']);
```

`browserify()`：功能是将当前项目的依赖，也就是require的东西打包到当前的一个文件当中。但是它无法将jsx文件转换为js文件，这就需要用到reactify。

`reactify`：功能是将jsx转换为js。所以在browserify({})中我们设置了transform属性，它可以过滤或转换一些内容。这里用到的是转换。

`bundle()`：的功能时将多个文件打包成一个。

`source()`：由于browserify生成的代码无法直接让gulp使用，所以需要用到source()。它将browserify生成的代码转换为gulp可识别的代码。参数是生成的文件名。