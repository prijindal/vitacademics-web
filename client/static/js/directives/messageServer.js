angular.module('VitApp')
       .directive('messageServer', function(){
         // Runs during compile
         return {
           scope: {
              message:'='
           }, // Array = multiple requires, ? = optional, ^ = check parent elements
           restrict: 'AE',
           templateUrl: 'partials/directives/message-server.html',
           replace: true,
         };
       });