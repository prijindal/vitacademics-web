angular.module('VitApp')
	     .factory('rightNav', function() {
          return {
              menuList:[
              {
                "title":"Further Links",
                "items":['Spotlight',
                              'Campus Map',
                              'About Us',
                              'Version Details',
                              'Feedback']
              },

              {
                "title":"Download on Your Mobile",
                "items":['Android',
                              'iOS',
                              'Windows']
              },

              {
                "title":"Contact Us",
                "items":['Github',
                              'Facebook']
              }
            ]
          }
	     })