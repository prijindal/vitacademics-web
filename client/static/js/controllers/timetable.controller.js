angular.module('VitApp')
       .controller('timetableController', ['$filter', 'allCourses', 'courseColor', function($filter, allCourses, courseColor){
           var self = this;
            var courses = allCourses.courses()
      var Content = {0:[],1:[],2:[],3:[],4:[],5:[]};
      for (var i = courses.length - 1; i >= 0; i--) {
        for(var j = courses[i].timings.length-1; j>=0;j--) {
          Content[courses[i].timings[j].day].push({
            course_code:courses[i].course_code,
            venue:courses[i].venue,
            start_time:courses[i].timings[j].start_time,
            end_time:courses[i].timings[j].end_time,
            slot:courses[i].slot
          })
        }
      };
      var maxLength = 0;
      for(var value in Content) {
        if(Content[value].length>maxLength) {
          maxLength = Content[value].length
        }
        Content[value] = sortByTag(Content[value])
      }


      self.getTheme = function(i, j) {
        if(Content[j][i] != undefined) {
          var k;
          return courseColor.pick(Content[j][i].slot)
        }
        if(Content[j].length == 0 && i==0) {
          return 'black'
        }
        return 'gray'
      }
      self.TableView = Content;
      self.maxLength = maxLength;

     self.getTimings = function(time) {
        return $filter('date')('2015-12-07T'+time, 'shortTime') 
      }
   }])

var sortByTag = function(anArray) {
  for (var i = anArray.length - 1; i >= 0; i--) {
    for (var j = anArray.length - 1; j >= 0; j--) {
      if(anArray[i].start_time > anArray[j].start_time) {
        var temp = anArray[i];
        anArray[i] = anArray[j];
        anArray[j] = temp;
      }
    };
  };
  return anArray;
}