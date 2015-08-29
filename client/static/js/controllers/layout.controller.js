angular.module('VitApp')
     .controller('layoutController', ['$mdSidenav','leftNav', 'rightNav', 'currentPage', 'saveData', function($mdSidenav, leftNav, rightNav, currentPage, saveData){
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
          currentPage.showPage(pageDetails)
          closeBothNavs()
        }
        self.getCurrentPage = currentPage.getCurrentPage
        self.refresh = function() {
          console.log('Refreshing...')
          saveData.save({});
        }
    }])