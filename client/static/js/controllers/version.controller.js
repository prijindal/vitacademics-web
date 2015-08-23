angular.module('VitApp')
       .controller('versionController', function(){
          var self = this;
          self.apps = {
          "android": {
              "supported": "4.0.0",
              "latest": "4.2.0",
              "link":"https://play.google.com/store/apps/details?id=com.karthikb351.vitinfo2&hl=en"
          },
          "ios": {
              "supported": "3.2.1",
              "latest": "3.2.1",
              "link":"https://itunes.apple.com/in/app/vitacademics/id727796987?mt=8"
          },
          "windows": {
              "supported": "3.0.0.3",
              "latest": "3.1.0.0",
              "link":"http://www.windowsphone.com/en-us/store/app/vitacademics-8-1/d6a9e028-4cc2-46ea-9f1b-84c02f4ae408"
          }}; 
       })