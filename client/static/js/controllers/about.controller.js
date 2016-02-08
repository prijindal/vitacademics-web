angular.module('VitApp')
       .controller('aboutController',['saveData', 'allAbout', function(saveData, allAbout){
          var self = this;
          saveData.saveAbout(function(data) {
            if(data.error == 0){
              console.log('System Info succesfully fetched')
              self.messages = allAbout.messages();
              self.contributors = allAbout.contributors();
            }
          })
          self.messages = allAbout.messages();
          self.contributors = allAbout.contributors();
       }])
