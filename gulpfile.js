var gulp = require('gulp');

var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var prefix = require('gulp-autoprefixer');

// default task
gulp.task('default', ['scripts','styles','watch']);

// watch task
gulp.task('watch', function(){
  gulp.watch('./src/js/*.js', ['scripts']);
  gulp.watch('./src/scss/*.scss', ['styles']);
});

// scripts task
gulp.task('scripts', function() {
  return gulp.src('./src/js/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js/'));
});

// styles task
gulp.task('styles', function(){
  return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css/'))
});
