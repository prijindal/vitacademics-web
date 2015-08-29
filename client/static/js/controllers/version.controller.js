angular.module('VitApp')
       .controller('versionController',['allAbout', function(allAbout){
                 var self = this;
                 self.apps = allAbout.version()
              }])