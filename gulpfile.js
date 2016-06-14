'use strict';
var gulp = require('gulp'), 
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

gulp.task('concatScripts', function(){
 gulp.src(['js/jquery-1.11.3.min.js', 
           'js/jqueryui/jquery-ui.min.js', 
           'js/bootstrap.min.js', 
           'js/angular/angular.js', 
           'js/angular-route/angular-route.js'
           ])
 .pipe(concat('libraries.js'))
 .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", function(){
  gulp.src('js/libraries.js')
  .pipe(uglify())
  .pipe(rename('libraries.min.js'))
  .pipe(gulp.dest('js'));
});

gulp.task("compileSass", function(){
 gulp.src("sass/main.scss")
  .pipe(sass())
  .pipe(gulp.dest('css'));
});
gulp.task('default', ['hello'], function(){
 console.log("This is the default task");
});