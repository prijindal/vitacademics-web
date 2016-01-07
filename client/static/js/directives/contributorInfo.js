angular.module('VitApp')
       .directive('contributorInfo', function(){
         return {
           scope: {
            contributor:'='
           },
           restrict: 'AE',
           replace:true,
           templateUrl: 'partials/directives/contributor-info.html'
         };
       });
