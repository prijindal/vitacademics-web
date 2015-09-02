angular.module('VitApp')
       .controller('aboutController',['$scope', 'allAbout', function($scope, allAbout){
          var self = this;
          self.messages = allAbout.messages();
          self.contributors = allAbout.contributors();
       }])