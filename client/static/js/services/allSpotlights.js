angular.module('VitApp')
       .service('allSpotlights', function(){
        var details = {};
        var save = function(data) {
            details = data;
            console.log(data)
        }
          return {
            details:function() {
              return details.spotlight;
            },
            save:save
          }
       })
