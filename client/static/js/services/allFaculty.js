angular.module('VitApp')
       .service('allFaculty', function(){
        var details = {};
        var save = function(data) {
            details = data;
            console.log(data)
        }
          return {
            details:function() {
              return details.advisor;
            },
            save:save
          } 
       })