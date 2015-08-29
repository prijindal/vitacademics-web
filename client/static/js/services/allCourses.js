angular.module('VitApp')
       .service('allCourses', function(){
        var details = {}
        var save = function(data) {
            details = data;
            console.log(data)
        }
         return {
           courses:function() {
                return details.courses
            },
            save:save
         };
       })