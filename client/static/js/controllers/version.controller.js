angular.module('VitApp')
       .controller('versionController',['saveData','allAbout', function(saveData, allAbout){
             var self = this;
             saveData.saveAbout(function(data) {
               if(data.error == 0) {
                 self.apps = allAbout.version()
               }
             })
             self.apps = allAbout.version()
        }])
