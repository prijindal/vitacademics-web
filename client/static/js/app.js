var isAppRouting;
angular.module('VitApp', [
  'ngAnimate',
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
    .when('/courses', {
      templateUrl:'templates/courses.html'
    })
    .when('/timetable', {
      templateUrl:'templates/timetable.html'
    })
    .when('/advisor', {
      templateUrl:'templates/advisor.html'
    })
    .when('/logout', {
    redirectTo: function() {
        console.log('Redirecting...')
        return '/'
      }
    })

  $routeProvider.otherwise({
    redirectTo: function() {
      console.log('Redirecting...')
      return '/'
    }
  });
}])
.config(['$mdThemingProvider', function($mdThemingProvider) {
  // Define a Color Palette
  $mdThemingProvider.theme('default')
    .backgroundPalette('grey');

  $mdThemingProvider.theme('darkTheme')
    .primaryPalette('blue-grey')
    .accentPalette('deep-purple')
    .dark()
}])