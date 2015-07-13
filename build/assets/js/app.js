(function() {
  'use strict';

  var VITapplication = angular.module('VITApplication', [
    'ui.router',
    'ngAnimate',
    'ngCookies',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations',
    'foundation.core',
    'angular-progress-arc'
  ])
    .config(config)
    .run(run)
  ;
  VITapplication.controller('loginController', function($scope, $http, dateFilter, FoundationApi, $cookies, ModalFactory) {
      if(typeof localStorage.loginDetails != "undefined") {
          console.log(localStorage.loginDetails)
          if (typeof localStorage.courses != undefined) {
              console.log(localStorage.courses)
              $scope.loggedin = true
              if(JSON.parse(localStorage.courses).status.code == 0){
                  $scope.courses = JSON.parse(localStorage.courses).courses
                  console.log($scope.courses[0])
              }
              else {
                  var data = JSON.parse(localStorage.loginDetails)
                  relogin(data)

              }
          }
          else {
              var data = JSON.parse(localStorage.loginDetails)
              console.log(data)
              fetchCourses(data.reg_no,data.dob,data.campus,data.mobile, function(data) {
                  console.log(data)
                  $scope.courses = data.courses
                  $scope.loggedin = true
              })
          }
      }
      else{
        $scope.loggedin = false
      }

      $scope.logout = function logout() {
          localStorage.removeItem("loginDetails");
          localStorage.removeItem("courses");
          $cookies.loginDetails = false
          $scope.loggedin = false
          window.location.href="/"
      }

      $scope.refresh = function refresh() {
          if($scope.loggedin) {
              var data = JSON.parse($cookies.loginDetails)
              fetchCourses(data.reg_no,data.dob,data.campus,data.mobile, function(data) {
                console.log(data)
                $scope.courses = data.courses
            })
          }
          else {
              console.warn("Please Log in First")
          }
      }

      function relogin(data) {
          fetchDetails(data.reg_no,data.dob,data.campus,data.mobile, true, function(data) {
              console.log(data)
              if(data.status.code==0) {
                  fetchCourses(data.reg_no,data.dob,data.campus,data.mobile, function(data) {
                    console.log(data)
                    $scope.courses = data.courses
                    $scope.loggedin = true
                })
              }
          })
      }

      $scope.login = function login(regno,dob,campus,mobile,remember) {
          var dobString = dateFilter(dob, 'ddMMyyyy')
          fetchDetails(regno,dobString,campus,mobile,remember, function(data) {
              console.log(data)
              if(data.status.code==0) {
                  fetchCourses(regno,dobString,campus,mobile, function(data) {
                    console.log(data)
                    $scope.courses = data.courses
                    $scope.loggedin = true
                })
              }
          });
      }

      $scope.days = function days(timings) {
          var dayWeek = ['M','T','W','Th','F','S','S']
          var dayList = []
          for (var i = 0; i < timings.length; i++) {
              dayList.push(dayWeek[timings[i].day])
          }
          return dayList
      }

      function fetchDetails(regno,dob,campus,mobile,remember, callback) {
          $http.post('https://vitacademics-rel.herokuapp.com/api/v2/'+campus+'/login',{
                  regno:regno,
                  dob:dob,
                  mobile:mobile
              })
              .success(function(data) {
                  if(typeof callback == "function")
                  callback(data);
                  if (remember) {
                      localStorage.setItem("loginDetails", JSON.stringify(data))
                  }
                  $cookies.loginDetails = JSON.stringify(data)
              }
          )
      }

      function fetchCourses(regno,dob,campus,mobile, callback) {
          console.log("Fetching Courses...")
          $http.post('https://vitacademics-rel.herokuapp.com/api/v2/'+campus+'/refresh',{
                  regno:regno,
                  dob:dob,
                  mobile:mobile
              })
              .success(function(data) {
                  console.log("Data Fetched")
                  if(typeof callback == "function")
                  callback(data);
                  localStorage.setItem("courses", JSON.stringify(data))
              }
          )
      }

      $scope.checkAttendance = function(event, value) {
          value = value || event.attendance.attendance_percentage;
          if (value > 79) {
              return 'success'
          }
          else if (value > 74) {
              return 'warning'
          }
          else{
              return 'danger'
          }
      }

      $scope.goPer = function(attendanceDetails,increment) {
          increment = increment || 1

          return ((attendanceDetails.attended_classes+increment) / (attendanceDetails.total_classes+increment))*100
      }

      $scope.notGoPer = function(attendanceDetails,decrement) {
          decrement = decrement || 1

          return ((attendanceDetails.attended_classes) / (attendanceDetails.total_classes+decrement))*100
      }
      $scope.showUserUpdate = function (popUpData) {
          var modal = new ModalFactory({
                templateUrl: 'partials/modal.html',
                contentScope: {
                    close: function() {
                      modal.deactivate();
                      $timeout(function() {
                        modal.destroy();
                      }, 1000);
                  },
                  content:popUpData
                  }
            });
            modal.activate();
        };
  })

  VITapplication.controller('timetableController', function($scope, dateFilter, $stateParams) {
      var loginDetails = JSON.parse(localStorage.loginDetails)
      if(loginDetails.status.code==0){
        var dayList = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
        $scope.dayList = dayList

        $scope.ListOfDays = dayList

        var now = new Date();
        var dayOfWeek = now.getDay()
        if (dayOfWeek == 0) {
            dayOfWeek = 6
        }
        else {
            dayOfWeek-=1
        }
        if(!$stateParams.timeday){
            window.location.href =  "#!/timetable/"+dayList[dayOfWeek]
        }
    }

  })

  VITapplication.controller('timedayController', function($scope, $stateParams) {
      if($stateParams.timeday) {
          var dayList = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
          var index = dayList.indexOf($stateParams.timeday)

          $scope.index = index
          $scope.dayList = getDetailsOfDay(index)
      }
          function getDetailsOfDay(index) {
              var dayDetails = []
              var courses = JSON.parse(localStorage.courses).courses

              for (var i = 0; i < courses.length; i+=1) {
                  for (var j = 0;j < courses[i].timings.length; j++) {
                      if (courses[i].timings[j].day == index) {
                          dayDetails.push(courses[i])
                          break;
                      }
                  }
              }
              return dayDetails;
          }

          $scope.filterByDay = function(timingObject) {
              return timingObject.day == index
          }

          $scope.localTime =function(UTCtime) {
              var hours = parseInt(UTCtime.slice(0,2))
              var minutes = parseInt(UTCtime.slice(3,5))
              var timezone = {hour:5,minute:30}
              minutes+=timezone.minute
              if (minutes>=60) {
                  minutes-=60
                  hours+=1
              }
              var minString = ''
              if (minutes == 0) {
                   minString = '00'
              }
              else {
                  minString = minutes.toString()
              }

              hours+=timezone.hour
              var W = ''
              if(hours >= 12) {
                  hours-=12
                  W = 'PM'
              }
              else {
                  W = 'AM'
              }

              var date = hours.toString() + ' : ' + minString + ' ' + W
              return date

          }

          $scope.orderByTime = function(event) {
              for (var i = 0; i < event.timings.length; i++) {
                  if(event.timings[i].day == index) {
                      return event.timings[i].start_time
                  }
              }
          }
  })

  VITapplication.controller('todayController', function($scope, dateFilter) {
      var loginDetails = JSON.parse(localStorage.loginDetails)
      if(loginDetails.status.code==0){
        var dayList = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
        $scope.dayList = dayList

        $scope.ListOfDays = dayList

        var now = new Date();
        var dayOfWeek = now.getDay()
        if (dayOfWeek == 0) {
            dayOfWeek = 6
        }
        else {
            dayOfWeek-=1
        }

        dayOfWeek = 0

        $scope.dayList = getDetailsOfDay(dayOfWeek)

        function getDetailsOfDay(index) {
            var dayDetails = []
            var courses = JSON.parse(localStorage.courses).courses

            for (var i = 0; i < courses.length; i+=1) {
                for (var j = 0;j < courses[i].timings.length; j++) {
                    if (courses[i].timings[j].day == index) {
                        dayDetails.push(courses[i])
                        break;
                    }
                }
            }
            return dayDetails;
        }


      $scope.orderByTime = function(event) {
          for (var i = 0; i < event.timings.length; i++) {
              if(event.timings[i].day == dayOfWeek) {
                  return event.timings[i].start_time
              }
          }
      }

          $scope.filterByToday = function(timingObject) {
              return timingObject.day == dayOfWeek
          }

        $scope.checkcurrent = function(event) {
            var todayTime
            for (var i = 0; i < event.timings.length; i++) {
                if($scope.filterByToday(event.timings[i])) {
                    todayTime = event.timings[i]
                    break;
                }
            }
            if(todayTime) {
                var start = createDate(todayTime.start_time)
                var finish = createDate(todayTime.end_time)
                var now = new Date()

                if( ((finish - now) > 0) && (now-start > 0) ) {
                    return 'current'
                }
                else if (now - finish > 0) {
                    return 'before'
                }
                else {
                    return 'future'
                }
            }
        }

        $scope.checkCompleted = function() {
            var completed = true
            for (var i = 0; i < $scope.dayList.length; i++) {
                if($scope.checkcurrent($scope.dayList[i])!='before') {
                    completed = false
                    return completed
                }
            }
            return completed
        }

        function createDate(timeInHH) {
            var time = timeInHH.split(':');
            var d = new Date(); // creates a Date Object using the clients current time

            d.setUTCHours(+time[0]); // set Time accordingly, using implicit type coercion
            d.setUTCMinutes( time[1]);
            d.setUTCSeconds(time[2].slice(0,-1))
            return d
        }
    }
  })

  VITapplication.controller('attendanceController', function($scope) {
      $scope.percentage = $scope.content.attendance.attendance_percentage
      $scope.attended = $scope.content.attendance.attended_classes
      $scope.total = $scope.content.attendance.total_classes

      $scope.missed = 0
      $scope.attends = 0

      $scope.miss = function(value) {
          if((value > 0) || ($scope.missed > 0)) {
              console.log(value);
              $scope.missed += value
              $scope.total += value
              $scope.percentage = ($scope.attended / $scope.total)*100
          }
      }

      $scope.attend = function(value){
          if((value>0) || ($scope.attends>0)){
              $scope.attends += value
              $scope.total+=value
              $scope.attended+=value
              $scope.percentage = ($scope.attended / $scope.total)*100
        }
      }

      $scope.getColor = function() {
          var value = $scope.percentage
          if (value > 79) {
              return 'green'
          }
          else if (value > 74) {
              return 'blue'
          }
          else{
              return 'red'
          }
      }
  })

  VITapplication.controller('versionController', function($scope, $http) {
          fetchVersion(function(data) {
              $scope.version = data
          })

        function fetchVersion(callback) {
            $http.get('https://vitacademics-rel.herokuapp.com/api/v2/system',{})
            .success(function(data) {
                if(typeof callback == "function") {
                    callback(data)
                }
            })
        }
  })

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

})();
