angular.module('VitApp')
       .controller('loginController', ['$filter', 'saveData', function($filter, saveData) {
          var self = this;
          self.user = {
            campus:'vellore'
          }
          self.submit = function() {
            self.user.dob = $filter('date')(self.user.dob, 'ddMMyyyy')
            saveData.save(self.user)
            console.dir(self.user)
          }
       }])