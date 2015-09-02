angular.module('VitApp')
       .directive('courseDetails',['$mdBottomSheet', 'marksGrid', 'attendanceGrid', 'courseColor', function($mdBottomSheet, marksGrid, attendanceGrid, courseColor){
         return {
            scope:{
              course:'=',
              index:'='
            } ,
           templateUrl: 'partials/directives/course-details.html',
           link:function($scope, $elements, $attr) {
              $scope.ICONS = CONFIG.material_icons;
              $scope.pickColor = courseColor.pick
              $scope.grid = marksGrid.grid
              $scope.week = attendanceGrid.week;
              var attendanceDetails = attendanceGrid.grid($scope.course)
              $scope.attendance = attendanceDetails.details
              $scope.maxLength = attendanceDetails.maxLength
              $scope.totalDays = attendanceDetails.totalDays
              $scope.openTimingsSheet = function() {
                $mdBottomSheet.show({
                  templateUrl: 'partials/course-timings.html',
                  parent:'#courseContent'+$scope.index,
                  controller:'courseTimings',
                  controllerAs:'timings',
                  scope:$scope,
                  preserveScope :true
                })
              }
           }
         };
       }])
       .controller('courseTimings',['$scope', '$filter', function($scope, $filter){
          var self = this;
          self.week = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
          ]

          self.checkTimings = function(index) {
            var timings = $scope.course.timings;
            for (var i = timings.length - 1; i >= 0; i--) {
              if(timings[i].day == index) {
                return i;
              }
            };
            return false;
          };

          self.getTimings = function(index) {
            var timings = $scope.course.timings;
            var element = self.checkTimings(index);
            if (element!==false) {
              return $filter('date')('2015-12-07T'+timings[element].start_time, 'shortTime') 
            };
            return false
          }
       }])