angular.module('VitApp')
       .controller('loginController', ['saveData', function(saveData) {
          var self = this;
          self.user = {
            campus:'vellore'
          }
          self.submit = function() {
            saveData.save()
            console.dir(self.user)
          }
       }])