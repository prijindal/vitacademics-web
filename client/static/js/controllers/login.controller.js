angular.module('VitApp')
       .controller('loginController', function() {
          var self = this;
          self.user = {
            campus:'vellore'
          }
          self.submit = function() {
            console.dir(self.user)
          }
       })