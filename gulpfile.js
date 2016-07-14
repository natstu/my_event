'use strict';
var gulp = require('gulp'), 
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    server = require('gulp-server-livereload');

var paths = {
  sass: ['sass/*.scss']
};

gulp.task('default', ['compileSass', 'minifyScripts']);

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['compileSass']);
});

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
gulp.task('webserver', function() {
  gulp.src('event_offline')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});
