angular.module('VitApp')
       .controller('loginController', ['$filter', 'saveData','$location','Auth','$localStorage', function($filter, saveData,$location, Auth, $localStorage) {
          var self = this;
          if (!checkInput('date')) {
              console.log('Date Not Supported')
              document.getElementById('dob').setAttribute('type', 'text')
          }
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
            if (date instanceof Date) {
                var dateOfBirth = new Date(date)
                self.user.dob = $filter('date')(dateOfBirth, 'ddMMyyyy')
            }
            else {
                self.user.dob = document.getElementById('dob').value
            }
            console.log(self.user)
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

var checkInput = function(type) {
   var input = document.createElement("input");
   input.setAttribute("type", type);
   return input.type == type;
}
