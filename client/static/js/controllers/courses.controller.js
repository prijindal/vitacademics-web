angular.module('VitApp')
       .controller('coursesController',['$scope', 'allCourses', function($scope, allCourses){
           var self = this;         

          self.courses = allCourses.courses()

        }])