angular.module('VitApp')
       .service('saveData', ['$http', 'allAbout', 'allCourses', 'allFaculty', function($http, allAbout, allCourses, allFaculty){
          var credentials;

          var saveAbout = function(cb ) {
            $http.get('https://vitacademics-rel.herokuapp.com/api/v2/system')
                .success(function(data) {
                  allAbout.save(data);
                  cb({error:0})
                })
                .error(function(err) {
                  cb({error:1})
                })
          }
          var saveCredentials = function(userDetails, cb) {      
            if(Object.keys(userDetails).length == 0 && credentials) {
              saveCourses(credentials, function() {
                cb({error:0})
              });
              saveFaculty(credentials);
            }
            else if(Object.keys(userDetails).length != 0) {   
              $http.post('https://vitacademics-rel.herokuapp.com/api/v2/'+userDetails.campus+'/login', {
                regno:userDetails.regno,
                dob:userDetails.dob,
                mobile:userDetails.mobile
              })
              .success(function(data) {
                credentials = userDetails;
                saveCourses(userDetails, function() {
                  cb({error:0})
                });
                saveFaculty(userDetails);
              })
              .error(function(error) {
                console.error('ERROR')
                cb({error:1})
              })
            }
            else {
              cb({error:2})
            }
          }
          var saveCourses = function(userDetails, cb) {
            $http.post('https://vitacademics-rel.herokuapp.com/api/v2/'+userDetails.campus+'/refresh', {
              regno:userDetails.regno,
              dob:userDetails.dob,
              mobile:userDetails.mobile
            })
            .success(function(data) {
              console.dir(data);
              allCourses.save(data);
              cb()
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
            save:function(userDetails) {
              saveAbout(function(data) {
                  if(data.error==1) {

                  }
                  else {

                  }
                })
              saveCredentials(userDetails, function(data) {
                  if(data.error==1) {

                  }
                  else if(data.error==0){

                  }
                })
            }
          }
       }])