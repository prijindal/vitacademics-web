(function() {
  'use strict';
  //https://vitacademics-rel.herokuapp.com/api/v2/'+campus+'/login
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
  VITapplication.controller('loginController', function($scope, $cookies, ModalFactory, dateFilter,vitacademicsRel, notifications, dayTime) {

      $scope.reg_no = function() {
          return JSON.parse(localStorage.loginDetails).reg_no
      }

      $scope.semester = function() {
          var sem = JSON.parse(localStorage.courses).semester;
          var year = '2015-16'
          if (sem == 'FS') {
              return 'Fall Semester '+year
          }
          else if (sem == 'WS') {
              return 'Winter Semester '+year
          }
      }

      if(typeof localStorage.loginDetails != "undefined") {
          console.log(localStorage.loginDetails)
          if (typeof localStorage.courses != "undefined") {
              console.log(localStorage.courses)
              if(JSON.parse(localStorage.courses).status.code == 0){
                  $scope.courses = JSON.parse(localStorage.courses).courses
                  console.log($scope.courses);
                  $scope.loggedin = true
              }
              else {
                  var data = JSON.parse(localStorage.loginDetails)
                  relogin(data)
              }
          }
          else {
              var data = JSON.parse(localStorage.loginDetails)
              console.log(data)
              vitacademicsRel.details(data.reg_no,data.dob,data.campus,data.mobile, function(data) {
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
          localStorage.clear()
          $cookies.loginDetails = false
          $scope.loggedin = false
          window.location.href="#!/"
          window.location.reload()
      }

      $scope.refresh = function refresh() {
          if($scope.loggedin) {
              var data = JSON.parse($cookies.loginDetails)
              vitacademicsRel.login(data.reg_no,data.dob,data.campus,data.mobile, function(data) {
                console.log(data)
                $scope.courses = data.courses
            })
          }
          else {
              console.warn("Please Log in First")
          }
      }

      function relogin(data) {
          vitacademicsRel.login(data.reg_no,data.dob,data.campus,data.mobile, true, function(data) {
              console.log(data)
              if(data.status.code==0) {
                  vitacademicsRel.details(data.reg_no,data.dob,data.campus,data.mobile, function(data) {
                    console.log(data)
                    $scope.courses = data.courses
                    $scope.loggedin = true
                })
              }
          })
      }

      $scope.login = function login(regno,dob,campus,mobile,remember) {
          var button = angular.element(document.getElementById('loginbtn'))
          button.addClass('disabled')

            var buttonEnable = 'angular.element(document.getElementById("loginbtn")).removeClass("disabled");'

          notifications.destroy('bottom-right')
          if (!regno) {
              notifications.set('Warning','Please specify a Registeration number','bottom-right','alert',2000)
              setTimeout(buttonEnable, 1000);
          }
          else if(!dob) {
              notifications.set('Warning','Please specify your date of birth','bottom-right','alert',2000)
              setTimeout(buttonEnable, 1000);
          }
          else if(!mobile) {
              notifications.set('Warning','Please specify your parents/guardians mobile number','bottom-right','alert',2000)
              setTimeout(buttonEnable, 1000);
          }
          else if(!campus) {
              notifications.set('Warning','Please specify your campus','bottom-right','alert',2000)
              setTimeout(buttonEnable, 1000);
          }
          else {
              var dobString = dateFilter(dob, 'ddMMyyyy')
              vitacademicsRel.login(regno,dobString,campus,mobile,remember, function(data) {
                  setTimeout(buttonEnable, 1000);
                  console.log(data)
                  if(data.status.code==0) {
                      vitacademicsRel.details(regno,dobString,campus,mobile, function(data) {
                        console.log(data)
                        $scope.courses = data.courses
                        $scope.loggedin = true
                    })
                  }
              });
        }
      }

      $scope.days = dayTime.daysOfCourse

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
                  content:popUpData,
                  days:dayTime.daysOfCourse
                  }
            });
            modal.activate();
        };
  })

  VITapplication.controller('timetableController', function($scope, dateFilter, $stateParams, dayTime) {

      var loginDetails = JSON.parse(localStorage.loginDetails)      // Giving error if not logged in
      if(loginDetails.status.code==0){
          // To show the Left Menu and to redirect to current day

        $scope.ListOfDays = dayTime.list

        if(!$stateParams.timeday){
            window.location.href =  "#!/timetable/"+dayTime.day
        }
    }

  })

  VITapplication.controller('timedayController', function($scope, $stateParams, dayTime) {
      if($stateParams.timeday) {
          var dayList = dayTime.list
          var index = dayList.indexOf($stateParams.timeday)

          $scope.index = index
          $scope.dayList = dayTime.getTodayDetails(index)
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

  VITapplication.controller('todayController', function($scope, dateFilter, dayTime) {
      var loginDetails = JSON.parse(localStorage.loginDetails)
      if(loginDetails.status.code==0){

          $scope.ListOfDays = dayTime.list

        $scope.dayList = dayTime.getTodayDetails(dayTime.todayDay())

      $scope.orderByTime = function(event) {
          for (var i = 0; i < event.timings.length; i++) {
              if(event.timings[i].day == dayTime.todayDay()) {
                  return event.timings[i].start_time
              }
          }
      }

          $scope.filterByToday = function(timingObject) {
              return timingObject.day == dayTime.todayDay()
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
            var listDay = $scope.dayList
            for (var i = 0; i < listDay.length; i++) {
                if($scope.checkcurrent(listDay[i])!='before') {
                    completed = false
                    return completed
                }
            }
            return completed
        }

        function createDate(timeInHH) {

            var time = timeInHH.split(':')
            var d = new Date(); // creates a Date Object using the clients current time

            d.setUTCHours(+time[0]); // set Time accordingly, using implicit type coercion
            d.setUTCMinutes( time[1]);
            d.setSeconds('00')
            return d
        }
    }
  })

  VITapplication.controller('attendanceController', function($scope, attendance) {
      $scope.percentage = $scope.content.attendance.attendance_percentage
      $scope.attended = $scope.content.attendance.attended_classes
      $scope.total = $scope.content.attendance.total_classes

      $scope.missed = 0
      $scope.attends = 0

      $scope.miss = function(value) {
          value  = value * attendance.getClassValue($scope.content)
          if((value > 0) || ($scope.missed > 0)) {
              $scope.missed += value
              $scope.total += value
              $scope.percentage = ($scope.attended / $scope.total)*100
          }
      }

      $scope.attend = function(value){
          value  = value * attendance.getClassValue($scope.content)
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
              return 'orange'
          }
          else{
              return 'red'
          }
      }
  })

  VITapplication.controller('versionController', function($scope, vitacademicsRel) {
          vitacademicsRel.version(function(data) {
                $scope.version = data
          })
  })

  VITapplication.controller('gradesController', function($scope,vitacademicsRel) {
      if(localStorage.grades) {
          $scope.grades = JSON.parse(localStorage.grades)
          console.log($scope.grades);
          if ($scope.grades.status.code != 0) {
              var loginDetails = JSON.parse(localStorage.loginDetails)
              vitacademicsRel.grades(loginDetails.reg_no,loginDetails.dob,loginDetails.campus,loginDetails.mobile,function(data) {
                    localStorage.grades = JSON.stringify(data)
                    $scope.grades = localStorage.grades
              })
          }
      }
      else{
          var loginDetails = JSON.parse(localStorage.loginDetails)
          vitacademicsRel.grades(loginDetails.reg_no,loginDetails.dob,loginDetails.campus,loginDetails.mobile,function(data) {
                localStorage.grades = JSON.stringify(data)
                $scope.grades = localStorage.grades
          })
      }
  })

  /*
    ----------- FACTORIES ----------
  */

  VITapplication.factory('attendance', function() {
      function getClassValue(content) {
          var details = content.attendance.details;
          if(details) {
              for (var i = 0; i < details.length; i++) {
                  if(details[i].class_units) {
                      return details[i].class_units
                  }
              }
          }
          if(content.course_type == 2) {
              return 2;
          }
          return 1
      }
      return {
          getClassValue:getClassValue
      }
  })


  VITapplication.factory('dayTime', function() {
        var dayList = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

        var todayDay = function(){
            // Returns an int representing today's day
            var now = new Date();
            var dayOfWeek = now.getDay()
            if (dayOfWeek == 0) {
                dayOfWeek = 6
            }
            else {
                dayOfWeek-=1
            }
            return dayOfWeek
        }

        var getDetailsOfDay = function(indexDay) {
            var dayDetails = []
            var index = indexDay
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

        function daysOfCourse(timings) {
            var dayWeek = ['M','T','W','Th','F','S','S']
            var dayList = []
            for (var i = 0; i < timings.length; i++) {
                dayList.push(dayWeek[timings[i].day])
            }
            return dayList
        }

        return {
            list:dayList,
            todayDay:todayDay,
            day:dayList[todayDay()],
            getTodayDetails: getDetailsOfDay,
            daysOfCourse: daysOfCourse
        }
  })

  VITapplication.factory('vitacademicsRel',function($http, $cookies, notifications) {

      var apiServer = 'https://vitacademics-rel.herokuapp.com'

      var fetchDetails = function(regno,dob,campus,mobile,remember, callback) {
          notifications.set('Logging in','Please Wait...','top-left','info')
          $http.post(apiServer+'/api/v2/'+campus+'/login',{
                  regno:regno,
                  dob:dob,
                  mobile:mobile
              })
              .success(function(data) {
                  console.log(data);
                  if(typeof callback == "function")
                  callback(data);
                  if (remember) {
                      localStorage.setItem("loginDetails", JSON.stringify(data))
                  }
                  $cookies.loginDetails = JSON.stringify(data)
                  notifications.destroy('top-left')
                  if(data.status.code==0) {
                      notifications.set('','Succesfully logged in','top-left','success',2000)
                  }
                  else {
                      notifications.set("Can't Login",data.status.message,'top-left','alert',2000)
                  }
              })
              .error(function(data) {
                  notifications.destroy('top-left')
                  notifications.set('ERROR','Connection Problem','top-left','alert',10000)
              })
      }

      var fetchCourses = function(regno,dob,campus,mobile, callback) {
          notifications.set('Fetching Data','Please Wait...','top-right','info')
          $http.post(apiServer+'/api/v2/'+campus+'/refresh',{
                  regno:regno,
                  dob:dob,
                  mobile:mobile
              })
              .success(function(data) {
                  if(typeof callback == "function")
                  callback(data);
                  localStorage.setItem("courses", JSON.stringify(data))
                  notifications.destroy('top-right')
                  if(data.status.code==0) {
                      notifications.set('','Data Succesfully fetched','top-right','success',2000)
                  }
                  else {
                      notifications.set("Can't Fetch Data",data.status.message,'top-right','alert',2000)
                  }
              })
              .error(function(err) {
                  notifications.destroy('top-right')
                  notifications.set('ERROR','Connection Problem','top-right','alert',10000)
              })
      }


      var fetchVersion = function(callback) {
          // Returns data if the request is possible else returns an
          notifications.set('Fetching Data','Please Wait...','top-left','info')
          $http.get(apiServer+'/api/v2/system',{})
          .success(function(data) {
              notifications.destroy('top-left')
              if(typeof callback == "function") {
                  callback(data)
              }
              if(data.status.code==0) {
                  notifications.set('','Data Succesfully fetched','top-left','success',2000)
              }
              else {
                  notifications.set("Can't Fetch Data",data.status.message,'top-left','alert',2000)
              }
          })
          .error(function(data) {
              notifications.destroy('top-left')
              notifications.set('ERROR','Connection Problem','top-left','alert',10000)
          })
      }

      var fetchGrades = function(regno,dob,campus,mobile, callback) {
          notifications.set('Fetching Grades','Please Wait...','top-right','info')
          $http.post(apiServer+'/api/v2/'+campus+'/grades',{
                  regno:regno,
                  dob:dob,
                  mobile:mobile
              })
              .success(function(data) {
                  if(typeof callback == "function")
                  callback(data);
                  notifications.destroy('top-right')
                  if(data.status.code==0) {
                      notifications.set('','Grades Succesfully fetched','top-right','success',2000)
                  }
                  else {
                      notifications.set("Can't Fetch your grades",data.status.message,'top-right','alert',2000)
                  }
              })
              .error(function(err) {
                  notifications.destroy('top-right')
                  notifications.set('ERROR','Connection Problem','top-right','alert',10000)
              })
      }

        return {
            version: fetchVersion,
            login: fetchDetails,
            details: fetchCourses,
            grades: fetchGrades
        }
  })

  VITapplication.factory('notifications', function(FoundationApi) {
      var setNotification = function(title, content, position, color, autoclose) {
          title = title || ''
          content = content || ''
          position = position || 'top-left'
          color = color || 'primary'
          autoclose = autoclose || false

          FoundationApi.publish(position+'-notification',
                      {
                          title: title,
                          content: content,
                          color:color,
                          autoclose:autoclose

                      });
      }

      var destroyNotification = function(position) {
          var childrens = angular.element(document.getElementById(position+'-notification')).children()
          for (var i = 0; i < childrens.length; i++) {
              childrens[i].innerHTML = ''
              childrens[i].style.display = 'none'
          }
      }


      return {
          set:setNotification,
          destroy:destroyNotification
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
