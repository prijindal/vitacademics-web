angular.module('VitApp', [
	'ngMaterial',
  'ngRoute',
  'ngMessages'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl:'templates/login.html'
    })
    .when('/about', {
      templateUrl:'templates/about.html'
    })
    .when('/version', {
      templateUrl:'templates/version.html'
    })
    .when('/feedback', {
      templateUrl:'templates/feedback.html'
    })

  $routeProvider.otherwise({
    redirectTo: '/'
  });
}])
.config(function($mdThemingProvider) {
  // Define a Color Palette
  $mdThemingProvider.theme('default')
    .backgroundPalette('grey');

});