angular.module('VitApp')
       .controller('aboutController',['$scope', 'allAbout', function($scope, allAbout){
          var self = this;
          self.messages = allAbout.messages();
          var ABOUT_INFO = allAbout.contributors();
          self.contributors = ABOUT_INFO.slice(0, 2)
          
          var load_more = _.throttle((function() {
            var new_to_load = Math.floor(window_layout.scrollTop() / 100);
            
            self.contributors = ABOUT_INFO.slice(0, 2 + new_to_load)
            
            $scope.$digest();
          }), 0)

          var window_layout = angular.element(document.getElementById('container'));
          window_layout.on('scroll',load_more);
       }])