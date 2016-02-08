angular.module('VitApp')
	     .factory('rightNav', function() {
          return {
              menuList:[
              {
                "title":"Further Links",
                "items":[
                              {
                                name:'About Us',
                                url:'#/about'
                              },
                              {
                                name:'Version Details',
                                url:'#/version'
                              },
                              {
                                name:'Feedback',
                                url:'#/feedback'
                            	},
                              {
                                name:'Spotlights',
                                url:'#/spotlights'
                              },
															{
																name:'Faculty Search',
																url:'#/faculty'
															}
                          ]
              },

              {
                "title":"Download on Your Mobile",
                "items":[     {
                                name:'Android',
                                url:"https://play.google.com/store/apps/details?id=com.karthikb351.vitinfo2&hl=en"
                              },
                              {
                                name:'iOS',
                                url:"https://itunes.apple.com/in/app/vitacademics/id727796987?mt=8"
                              },
                              {
                                name:'Windows',
                                url:"http://www.windowsphone.com/en-us/store/app/vitacademics-8-1/d6a9e028-4cc2-46ea-9f1b-84c02f4ae408"
                              }]
              },

              {
                "title":"Contact Us",
                "items":[     {
                                name:'Github',
                                url:'https://github.com/collegecode'
                              },
                              {
                                name:'Facebook',
                                url:'https://facebook.com/collegecode'
                              }]
              }
            ]
          }
	     })
