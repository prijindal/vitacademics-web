var gulp = require('gulp'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat');

var assets = {
  html: {
    main:['client/index.html'],
    files:'client/**/*.html',
    output:{
      path:'build'
    }
  },
  scss: {
    main:'client/static/scss/app.scss',
    files:['client/static/scss/**/*.scss'],
    output:{
      path: 'build/static/css/'
    }
  },
  js: {
    main:[
        'client/static/js/app.js',
        'client/static/js/services/*.js', 
        'client/static/js/filters/*.js',
        'client/static/js/controllers/*.js',
        'client/static/js/directives/*.js'
      ],
    files:'client/static/js/**/*.js',
    output:{
      path: 'build/static/js/',
      filename: 'app.js'
    }
  },
  vendorCss: {
    main:'client/bower_components/angular-material/angular-material.min.css',
    output:{
      path: 'build/static/css/vendor/',
      filename: 'angular-material.css'
    } 
  },
  vendorJs: {
    main:[
      'client/bower_components/underscore/underscore.js',
      'client/bower_components/jquery/dist/jquery.min.js',
      'client/bower_components/angular/angular.min.js', 
      'client/bower_components/angular-route/angular-route.min.js', 
      'client/bower_components/angular-animate/angular-animate.min.js', 
      'client/bower_components/angular-aria/angular-aria.min.js', 
      'client/bower_components/angular-messages/angular-messages.min.js', 
      'client/bower_components/angular-material/angular-material.min.js',
      'client/bower_components/ngstorage/ngStorage.min.js'],
    output:{
      path: 'build/static/js/vendor/',
      filename: 'angular.js'
    }
  },
  images: {
    main:['client/static/img/**/*'],
    output:'build/static/img'
  }
}

gulp.task('sass', function() {
  return gulp.src(assets.scss.main)
      .pipe(sass({compressed:true}))
      .pipe(gulp.dest(assets.scss.output.path))
})

gulp.task('js', function() {
  return gulp.src(assets.js.main)
    .pipe(concat(assets.js.output.filename))
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

gulp.task('build', ['vendor:css', 'vendor:javascript', 'sass', 'js', 'html', 'templates', 'partials', 'images', 'favicon'])

exports.gulp = gulp;