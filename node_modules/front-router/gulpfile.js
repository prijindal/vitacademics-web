var gulp = require('gulp');
var router = require('./index.js');

gulp.task('default', function() {
  gulp.src('./test/**/*.html')
    .pipe(router({
      path: './_build/routes.js',
      root: './test'
    }))
    .pipe(gulp.dest('./_build'));
});