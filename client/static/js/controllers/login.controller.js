angular.module('VitApp')
       .controller('loginController', ['$filter', 'saveData','Auth', function($filter, saveData, Auth) {
          var self = this;
          self.user = {
            regno:'14BCE0607',
            dob:new Date('Thu Dec 07 1995 00:00:00 GMT+0530 (India Standard Time)'),
            mobile:'9711071395',
            campus:'vellore'
          }
          self.submit = function() {
            console.log(self.user.dob)
            self.user.dob = $filter('date')(self.user.dob, 'ddMMyyyy')
            saveData.save(self.user)
            console.dir(self.user)
            Auth.setUser(self.user);
          }
       }])