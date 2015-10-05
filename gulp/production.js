var gulp = require('gulp'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  stripDebug = require('gulp-strip-debug'),
  manifest = require('gulp-manifest');

gulp.task('sass', function() {
  return gulp.src(assets.scss.main)
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(gulp.dest(assets.scss.output.path))
})

gulp.task('js', function() {
  return gulp.src(assets.js.main)
    .pipe(concat(assets.js.output.filename))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(assets.js.output.path))
})

gulp.task('html', function() {
  return gulp.src(assets.html.main)
    .pipe(gulp.dest(assets.html.output.path))
})

gulp.task('vendor:css', function() {
  return gulp.src(assets.vendorCss.main)
    .pipe(concat(assets.vendorCss.output.filename))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(assets.vendorCss.output.path))
})

gulp.task('vendor:javascript', function() {
  return gulp.src(assets.vendorJs.main)
    .pipe(concat(assets.vendorJs.output.filename))
    .pipe(uglify())
    .pipe(gulp.dest(assets.vendorJs.output.path))
})

gulp.task('templates', function() {
  return gulp.src('client/templates/**/*')
         .pipe(gulp.dest('build/templates'))
})
gulp.task('partials', function() {
  return gulp.src('client/partials/**/*')
         .pipe(gulp.dest('build/partials'))
})

gulp.task('images', function() {
  return gulp.src(assets.images.main)
             .pipe(gulp.dest(assets.images.output))
})

gulp.task('favicon', function() {
  return gulp.src('client/favicon.ico')
             .pipe(gulp.dest('build'))
})

gulp.task('build', ['vendor:css', 'vendor:javascript', 'sass', 'js', 'html', 'templates', 'partials', 'images', 'favicon'], function() {
    gulp.src(assets.cacheFiles.main)
    .pipe(manifest({
      timestamp: true,
      network: ['*'],
      cache:assets.cacheFiles.external,
      filename: 'manifest.appcache',
      exclude: 'manifest.appcache'
     }))
    .pipe(gulp.dest('build'));
})

exports.gulp = gulp;
