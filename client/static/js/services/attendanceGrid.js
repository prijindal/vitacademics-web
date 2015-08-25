angular.module('VitApp')
       .service('attendanceGrid', ['$filter', function($filter){
          var week = [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
          ] 
          var getGrid = function(courseDetails) {
            var details = {0:[],1:[],2:[],3:[],4:[],5:[],6:[]};
            var nDays = courseDetails.credits
            for(var i = 0;i<courseDetails.attendance.details.length;++i) {
              var d = new Date($filter('date')(courseDetails.attendance.details[i].date, 'medium'))
              details[d.getDay()].push(courseDetails.attendance.details[i])
            }
            var maxLength = 0
            for(var num in details) {
              if(details[num].length>maxLength) {
                maxLength = details[num].length
              }
              if (details[num].length==0) {
                delete details[num]
              };
            }
            return {
              details:details,
              maxLength:maxLength,
              totalDays:nDays
            }
          }
          return {
            grid:getGrid,
            week:week
          } 
       }])