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
        isAppRouting = false;
        return '/'
      }
    })

  $routeProvider.otherwise({
    redirectTo: function() {
      console.log('Redirecting...')
      isAppRouting = false;
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
.run(['$rootScope', function ($rootScope) {
    $rootScope.checkLoading = function() {
      if(angular.element(document.getElementById('page')).hasClass('ng-leave')) {
        isAppRouting = false;
      }
      return isAppRouting
    }
    $rootScope.$on('$routeChangeStart', function (event, toState, toParams, fromState, fromParams, error) { 
        isAppRouting = true; // Fix This
        console.log('Loading started')
    });
    angular.element(document).ready(function () {
        isAppRouting = false;
        console.log('Document Loaded');
    });
}]);