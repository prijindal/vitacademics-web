angular.module('VitApp')
       .directive('appDetails', function(){
         return {
           scope: {
            platform:'=',
            details:'='
           }, // {} = isolate, true = child, false/undefined = no change
           restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
           templateUrl: 'partials/directives/app-details.html',
           replace: true,
           link:function($scope) {
            $scope.ICONS = CONFIG.material_icons;
           }
         };
       });