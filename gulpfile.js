var env = process.env.NODE_ENV || 'development'

var gulp;

if(env == 'development') {
	gulp = require('./gulp/development.js')
}
else {
	gulp = require('./gulp/production.js')
}