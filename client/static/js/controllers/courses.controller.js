angular.module('VitApp')
       .controller('coursesController',['allCourses', function(allCourses){
                 var self = this;         
                 self.courses = allCourses.courses;
              }])