var config = {
	development:true
}

var gulp;

if(config.development) {
	gulp = require('./gulp/development.js')
}
else {
	gulp = require('./gulp/production.js')
}