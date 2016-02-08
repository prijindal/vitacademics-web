angular.module('VitApp')
       .controller('spotlightController',['$scope', 'allSpotlights', function($scope, allSpotlights){
          var self = this;
          self.spotlights = allSpotlights.details()
       }])
