angular.module('VitApp')
       .directive('hexagonBar', function(){
         // Runs during compile
         return {
           scope: {
            current:'=',
            max:'='
           },
           restrict: 'AE',
           templateUrl: 'partials/directives/hexagon-bar.html'
         };
       });