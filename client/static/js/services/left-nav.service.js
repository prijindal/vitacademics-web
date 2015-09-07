angular.module('VitApp')
	     .factory('leftNav', function() {
          return {
              menuList:[
              {
                name:'Courses',
                url:'#/courses'
              },
              {
                name:'Timetable',
                url:'#/timetable'
              },
              {
                name:'Faculty Advisor',
                url:'#/advisor'
              }
            ]
          }
	     })
