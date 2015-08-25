angular.module('VitApp')
       .controller('aboutController',['allAbout', function(allAbout){
          var self = this;
          self.contributors = allAbout.contributors
          self.messages = allAbout.messages
       }])