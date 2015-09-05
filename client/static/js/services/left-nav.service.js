angular.module('VitApp')
	     .factory('leftNav', function() {
          return {
              menuList:[
              {
                name:'Courses',
                url:'#/courses'
              },
              {
                name:'TimeTable',
                url:'#/timetable'
              },
              {
                name:'Faculty Advisor',
                url:'#/advisor'
              }
            ]
          }
	     })
