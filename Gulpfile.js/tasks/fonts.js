var gulp = require('gulp');
var copy = require('gulp-copy');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

gulp.task('fonts', function () {
  return gulp.src('./src/fonts/*.{eot,ttf,woff,woff2}')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(gulp.dest('./assets/fonts/'))
    .pipe(notify('Fonts task complete'));
});
