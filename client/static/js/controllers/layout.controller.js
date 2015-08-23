angular.module('VitApp')
     .controller('layoutController', ['$mdSidenav','leftNav', 'rightNav', function($mdSidenav, leftNav, rightNav){
        var self = this;

        self.toggleSideBar = function(navId) {
          $mdSidenav(navId)
            .toggle()
            .then(function(){
              console.log('Toggled', navId);
          });
        }

        self.leftMenu = function() {
          return leftNav.menuList
        }

        self.rightMenu = function() {
          return rightNav.menuList
        }
    }])