var env = process.env.NODE_ENV || 'production'

var gulp;


assets = {
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
    main:'client/bower_components/angular-material/angular-material.css',
    output:{
      path: 'build/static/css/vendor/',
      filename: 'angular-material.css'
    } 
  },
  vendorJs: {
    main:[
      'client/bower_components/angular/angular.js', 
      'client/bower_components/angular-route/angular-route.js', 
      'client/bower_components/angular-animate/angular-animate.js', 
      'client/bower_components/angular-aria/angular-aria.min.js', 
      'client/bower_components/angular-messages/angular-messages.js', 
      'client/bower_components/angular-material/angular-material.js',
      'client/bower_components/ngstorage/ngStorage.js'],
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

if(env == 'development') {
	gulp = require('./gulp/development.js')
}
else {
	gulp = require('./gulp/production.js')
}