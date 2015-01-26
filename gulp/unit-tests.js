'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep');
var paths = gulp.paths;

function runTests (singleRun, done) {
  var bowerDeps = wiredep({
    directory: 'bower_components',
    exclude: ['bootstrap-sass-official'],
    dependencies: true,
    devDependencies: true
  });

  var testFiles = bowerDeps.js.concat([
    paths.tmp + '/serve/{app,components}/**/*.js',
    paths.src + '/{app,components}/**/*.spec.js',
    paths.src + '/{app,components}/**/*.mock.js'
  ]);


  gulp.src(testFiles)
    .pipe($.karma({
      configFile: 'karma.conf.js',
      action: (singleRun)? 'run': 'watch'
    }))
    .on('error', function (err) {
      throw err;
    });
  gulp.watch(paths.src + '/../server/**/*js', ['serverTests'])


};

gulp.task('serverTests', function(){
  var serverFiles = [paths.src + '/../server/**/*.spec.js'];

  gulp.src(serverFiles)
    .pipe($.mocha({
    }))
    .on('error', function(){
      console.error('tests failed')
    })
    .on('end', function(){
      console.log('ended')
    })
})

gulp.task('test', ['scripts'], function (done) { runTests(true /* singleRun */, done) });
gulp.task('test:auto', ['scripts'], function (done) { runTests(false /* singleRun */, done) });
