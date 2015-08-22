var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	livereload = require('gulp-livereload');

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
		main:['client/static/js/app.js',
			  'client/static/js/services/*.js', 
			  'client/static/js/filters/*.js',
			  'client/static/js/controllers/*.js'
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
			'client/bower_components/angular-animate/angular-animate.js', 
			'client/bower_components/angular-aria/angular-aria.js', 
			'client/bower_components/angular-material/angular-material.js'],
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
	return sass(assets.scss.main, {sourcemap: true})
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(assets.scss.output.path))
		.pipe(livereload());
})

gulp.task('js', function() {
	return gulp.src(assets.js.main)
		.pipe(sourcemaps.init())
		.pipe(concat(assets.js.output.filename))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(assets.js.output.path))
		.pipe(livereload());
})

gulp.task('html', function() {
	return gulp.src(assets.html.main)
		.pipe(gulp.dest(assets.html.output.path))
		.pipe(livereload());
})

gulp.task('vendor:css', function() {
	return gulp.src(assets.vendorCss.main)
		.pipe(sourcemaps.init())
		.pipe(concat(assets.vendorCss.output.filename))
		.pipe(sourcemaps.init())
		.pipe(gulp.dest(assets.vendorCss.output.path))
})

gulp.task('vendor:javascript', function() {
	return gulp.src(assets.vendorJs.main)
		.pipe(sourcemaps.init())
		.pipe(concat(assets.vendorJs.output.filename))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(assets.vendorJs.output.path))
})

gulp.task('templates', function() {
	return gulp.src('client/templates/**/*')
			   .pipe(gulp.dest('build/templates'))
			   .pipe(livereload());
})
gulp.task('partials', function() {
	return gulp.src('client/partials/**/*')
			   .pipe(gulp.dest('build/partials'))
			   .pipe(livereload());
})

gulp.task('images', function() {
	return gulp.src(assets.images.main)
						 .pipe(gulp.dest(assets.images.output))
})

gulp.task('watch', ['vendor:css', 'vendor:javascript', 'sass', 'js', 'html', 'templates', 'partials', 'images'], function() {
	livereload.listen({basePath:'build'});
	gulp.watch(assets.scss.files, ['sass'])
	gulp.watch(assets.js.files, ['js'])
	gulp.watch('client/index.html', ['html'])
	gulp.watch('client/templates/**/*.html', ['templates'])
	gulp.watch('client/partials/**/*.html', ['partials'])
})