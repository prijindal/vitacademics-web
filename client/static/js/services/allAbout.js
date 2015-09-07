angular.module('VitApp')
       .service('allAbout', function(){
        var details = {}
        var save = function(data) {
            details = data;
            data.android.link = "https://play.google.com/store/apps/details?id=com.karthikb351.vitinfo2&hl=en"
            data.ios.link = "https://itunes.apple.com/in/app/vitacademics/id727796987?mt=8"
            data.windows.link = "http://www.windowsphone.com/en-us/store/app/vitacademics-8-1/d6a9e028-4cc2-46ea-9f1b-84c02f4ae408"
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
