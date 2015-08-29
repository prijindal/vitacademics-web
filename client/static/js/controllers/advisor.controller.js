angular.module('VitApp')
       .controller('advisorController',['allFaculty', function(allFaculty){
           var self = this;
           self.details = allFaculty.details()
       }])