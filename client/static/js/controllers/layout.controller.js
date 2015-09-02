angular.module('VitApp')
     .controller('layoutController', 
      ['$scope', '$location','Auth', 
       '$mdSidenav','leftNav', 'rightNav', 
       'currentPage', 'saveData', 
        function($scope, $location, Auth , 
        $mdSidenav, leftNav, rightNav, currentPage, saveData){

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

        var closeBothNavs = function() {
          $mdSidenav('left')
              .close()
          $mdSidenav('right')
            .close()
        }

        self.focusPage = function(pageDetails) {
          closeBothNavs()
        }
        self.getCurrentPage = currentPage.getCurrentPage
        self.refresh = function() {
          console.log('Refreshing...')
          saveData.save({});
        }

        $scope.$watch(Auth.isLoggedIn, function (value, oldValue) {

          if(!value && oldValue) {
            console.log("Disconnect");
            $location.path('/');
          }

          if(value) {
            console.log("Connect");
            //Do something when the user is connected
          }

        }, true);

        $scope.ICONS = CONFIG.material_icons;
    }])