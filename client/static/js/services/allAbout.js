angular.module('VitApp')
       .service('allAbout', function(){
        var details = {}
        var save = function(data) {
            details = data;
            console.log(data)
        }
           return {
            version:function() {
                return {
                  android:details.android,
                  ios:details.ios,
                  windows:details.windows
                }
            },
            contributors:function() {
                return details.contributors;
            }, 
            messages:function() {
                return details.messages;
            },
            save:save
           }
       })