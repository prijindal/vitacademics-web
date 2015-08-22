angular.module('VitApp', [
	'ngMaterial',
  'ngRoute'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
    templateUrl:'templates/login.html'
  })

  $routeProvider.otherwise({
    redirectTo: '/'
  });
}])