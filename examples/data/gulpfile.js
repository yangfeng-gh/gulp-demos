var gulp = require('gulp');
var swig = require('gulp-swig');
var data = require('gulp-data');
var fm = require('front-matter');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');

/*
  Get data via JSON file, keyed on filename.
*/
gulp.task('json-test', function() {
  return gulp.src('./examples/test1.html')
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('./examples/' + path.basename(file.path) + '.json'));
    }))
    .pipe(swig())
    .pipe(gulp.dest('build'));
});

/*
  Get data via front matter
*/
gulp.task('fm-test', function() {
  return gulp.src('./examples/test2.html')
    .pipe(data(function(file) {
      var content = fm(String(file.contents));
      file.contents = new Buffer(content.body);
      return content.attributes;
    }))
    .pipe(swig())
    .pipe(gulp.dest('build'));
});

/*
  Get data via database, keyed on filename.
*/
gulp.task('db-test', function() {
  return gulp.src('./examples/test3.html')
    .pipe(data(function(file, cb) {
      MongoClient.connect('mongodb://127.0.0.1:27017/gulp-data-test', function(err, db) {
        if(err) return cb(err);
        cb(undefined, db.collection('file-data-test').findOne({filename: path.basename(file.path)}));
      });
    }))
    .pipe(swig())
    .pipe(gulp.dest('build'));
});