var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

gulp.task('images', function() {
  return gulp.src('./src/images/**/*.{gif,png,jpg,jpeg,svg}')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./assets/images'))
    .pipe(notify('Images task complete'));
});
