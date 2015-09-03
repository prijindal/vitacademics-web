angular.module('VitApp')
       .controller('loginController', ['$filter', 'saveData','$location','Auth','$localStorage', function($filter, saveData,$location, Auth, $localStorage) {
          var self = this;
          if($localStorage.userInfo) {
            self.user = $localStorage.userInfo
            self.dob = new Date($localStorage.dob)
          }
          else {
            self.user = {
                campus:'vellore'
              }
          }
          self.submit = function() {
            angular.element(document.getElementById('login')).attr('disabled',true);
            var date = self.dob
            var dateOfBirth = new Date(date)
            self.user.dob = $filter('date')(dateOfBirth, 'ddMMyyyy')
            saveData.save(self.user, function() {
              console.dir(self.user)
              Auth.setUser(self.user);
              $localStorage.userInfo = self.user;
              $localStorage.dob = dateOfBirth;
              $location.path('/courses');
              angular.element(document.getElementById('login')).removeAttr("disabled")
            })
          }
       }])