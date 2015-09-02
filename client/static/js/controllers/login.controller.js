angular.module('VitApp')
       .controller('loginController', ['$filter', 'saveData','Auth','$localStorage', function($filter, saveData, Auth, $localStorage) {
          var self = this;
          if($localStorage.userInfo) {
            self.user = $localStorage.userInfo
            self.dob = new Date($localStorage.dob)
          }
          self.submit = function() {
            var date = self.dob
            var dateOfBirth = new Date(date)
            self.user.dob = $filter('date')(dateOfBirth, 'ddMMyyyy')
            saveData.save(self.user, function() {
              console.dir(self.user)
              Auth.setUser(self.user);
              $localStorage.userInfo = self.user;
              $localStorage.dob = dateOfBirth;
            })
          }
       }])