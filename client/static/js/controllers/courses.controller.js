angular.module('VitApp')
       .controller('coursesController',['$scope', 'allCourses', function($scope, allCourses){
           var self = this;         

          var COURSES = allCourses.courses()

          self.courses = COURSES.slice(0, 2);

          var load_more = _.throttle((function() {
            var new_to_load = Math.floor(window_layout.scrollTop() / 560);
            self.courses = COURSES.slice(0, 2 + new_to_load)
            
            $scope.$digest();
          }), 0)

          var window_layout = angular.element(document.getElementById('container'));
          window_layout.on('scroll',load_more);
        }])