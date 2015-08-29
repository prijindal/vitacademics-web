angular.module('VitApp')
       .service('saveData', ['$http', 'allAbout', 'allCourses', 'allFaculty', function($http, allAbout, allCourses, allFaculty){
          var saveAbout = function() {
            $http.get('https://vitacademics-rel.herokuapp.com/api/v2/system')
                .success(function(data) {
                  console.log(data);
                  allAbout.save(data);
                })
          }
          var saveCredentials = function(userDetails) {
            $http.post('https://vitacademics-rel.herokuapp.com/api/v2/'+userDetails.campus+'/login', {
              regno:userDetails.regno,
              dob:userDetails.dob,
              mobile:userDetails.mobile
            })
            .success(function(data) {
              saveCourses(userDetails);
              saveFaculty(userDetails);
            })
          }
          var saveCourses = function(userDetails) {
            $http.post('https://vitacademics-rel.herokuapp.com/api/v2/'+userDetails.campus+'/refresh', {
              regno:userDetails.regno,
              dob:userDetails.dob,
              mobile:userDetails.mobile
            })
            .success(function(data) {
              console.dir(data);
              allCourses.save(data);
            })
          }
          var saveFaculty = function(userDetails) {
            $http.post('https://vitacademics-rel.herokuapp.com/api/v2/'+userDetails.campus+'/advisor', {
              regno:userDetails.regno,
              dob:userDetails.dob,
              mobile:userDetails.mobile
            })
            .success(function(data) {
              console.dir(data);
              allFaculty.save(data);
            })
          }
          return {
            save:function() {
              saveAbout();
              saveCredentials({
                  campus:'vellore',
                  regno:'14BCE0607',
                  dob:'07121995',
                  mobile:'9711071395'
                })
            }
          }
       }])