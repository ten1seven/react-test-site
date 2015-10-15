var gulp = require('gulp');
var browserSync = require('browser-sync').create();


gulp.task('default', ['scripts', 'styles', 'fonts', 'images'], function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./src/images/**/*.{gif,png,jpg,jpeg,svg}', ['images']).on('change', browserSync.reload);
  gulp.watch('./src/scripts/**/*.js', ['scripts']).on('change', browserSync.reload);
  gulp.watch('./src/styles/**/*.css', ['styles']).on('change', browserSync.reload);
  gulp.watch('*.html').on('change', browserSync.reload);
});
