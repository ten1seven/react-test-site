var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

gulp.task('react', function () {
  return gulp.src([
    './src/scripts/*.js',
    '!./src/scripts/vendor/'
  ])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(babel())
    //.pipe(uglify())
    .pipe(gulp.dest('./assets/scripts/'))
    .pipe(notify('React/Babel task complete'));
});

gulp.task('move-scripts', function () {
  return gulp.src([
    './node_modules/react-dom/dist/react-dom.js',
    './node_modules/react/dist/react.js',
    './src/scripts/vendor/*.js',
    './node_modules/what-input/what-input.js'
  ])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/scripts/vendor/'))
    .pipe(notify('Scripts task complete'));
});

gulp.task('scripts', ['react', 'move-scripts']);
