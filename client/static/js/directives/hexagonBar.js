angular.module('VitApp')
       .directive('hexagonBar', function(){
         // Runs during compile
         return {
           scope: {
            current:'=',
            max:'='
           },
           restrict: 'AE',
           templateUrl: 'partials/directives/hexagon-bar.html',
           link:function($scope, $elements, $attrs) {
              $scope.completed = 100*$scope.current/$scope.max;
              $scope.remaining = 100 - $scope.completed;
              $scope.checkDebarred = function() {
                return $scope.completed < 75;
              }
           }
         };
       });