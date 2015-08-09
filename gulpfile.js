'use strict';

var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/client.js') //this will grab what's in client.js and build it into bundle.js and place it into the build folder.
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/')); /* This will create a build folder. Tyler likes
    to maintain a separate build and dest folder for eventually publicly served
    assets (or static assets). After we compile them with webpack, they all
    become static assets. */
});

gulp.task('copy', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('build', ['webpack:dev', 'copy']);
gulp.task('default', ['build']);
