'use strict';

var gulp = require('gulp');
var webpack = require('gulp-webpack');
var KarmaServer = require('karma').Server;

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/client.js') //this will grab what's in client.js and build it into bundle.js and place it into the build folder.
    .pipe(webpack({
      output: {
        filename: 'bundle.js' //the output will be this file
      }
    }))
    .pipe(gulp.dest('build/')); /* This will create a build folder. Tyler likes
    to maintain a separate build and dest folder for eventually publicly served
    assets (or static assets). After we compile them with webpack, they all
    become static assets. */
});

gulp.task('webpack:test', function() {
  return gulp.src('test/karma_tests/entry.js') //this will grab what's in client.js and build it into bundle.js and place it into the build folder.
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/karma_tests/'));
});

gulp.task('copy', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('karmatest', function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('build', ['webpack:dev', 'copy']);
gulp.task('clienttest', ['webpack:test', 'karmatest']);
gulp.task('default', ['clienttest', 'build']);
