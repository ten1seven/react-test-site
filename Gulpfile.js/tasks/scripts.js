var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

gulp.task('scripts', function () {
  return gulp.src(['./src/scripts/*.js', './node_modules/react/dist/react.js', 'node_modules/react-dom/dist/react-dom.js'])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./assets/scripts/'))
    .pipe(notify('Scripts task complete'));
});
