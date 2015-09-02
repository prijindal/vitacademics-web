angular.module('VitApp')
       .service('saveData', ['$http', '$mdToast', 'allAbout', 'allCourses', 'allFaculty', function($http, $mdToast, allAbout, allCourses, allFaculty){
          var credentials;

          var makeToast = function(content, color) {
            return '<md-toast class="'+color+'"><span flex>'+content+'</span></md-toast>'
          }

          var saveAbout = function(cb ) {
            $http.get('https://vitacademics-rel.herokuapp.com/api/v2/system')
                .success(function(data) {
                  allAbout.save(data);
                  cb({error:data.status.code})
                })
                .error(function(err) {
                  cb({error:1})
                })
          }
          var saveCredentials = function(userDetails, cb) {      
            if(Object.keys(userDetails).length == 0 && credentials) {
              // Data Already present
              console.log('Loading Data')
              cb({error:0, userDetails:credentials})
            }
            else if(Object.keys(userDetails).length != 0) {   
              $http.post('https://vitacademics-rel.herokuapp.com/api/v2/'+userDetails.campus+'/login', {
                regno:userDetails.regno,
                dob:userDetails.dob,
                mobile:userDetails.mobile
              })
              .success(function(data) {
                // Login Succesfull
                credentials = userDetails;
                cb({error:data.status.code, userDetails:credentials})
              })
              .error(function(error) {
                // Login Insucessfull
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
              cb({error:data.status.code})
            })
            .error(function(error) {
              cb({error:1})
            })
          }
          var saveFaculty = function(userDetails, cb) {
            $http.post('https://vitacademics-rel.herokuapp.com/api/v2/'+userDetails.campus+'/advisor', {
              regno:userDetails.regno,
              dob:userDetails.dob,
              mobile:userDetails.mobile
            })
            .success(function(data) {
              console.dir(data);
              allFaculty.save(data);
              cb({error:data.status.code})
            })
            .error(function(error) {
              cb({error:1})
            })
          }
          return {
            save:function(userDetails, cb) {
              // Starting Getting Data
              $mdToast.show({
                template:makeToast('Logging You in...', 'black'),
                position:'top left',
                hideDelay:false
              })
              console.log('Getting Data')
              saveAbout(function(data) {
                  if(data.error==1) {
                    // Error in About Loading
                    console.error('Error in refreshing System Info')
                  }
                  else {
                    // About Loaded Succesfully
                    console.log('System Info succesfully fetched')
                  }
                })
              saveCredentials(userDetails, function(data) {
                  if(data.error==1) {
                    // Error in Loggin in
                    console.error('Error in getting User Credentials')
                    $mdToast.show({
                      template:makeToast('Sorry Please try Later...', 'red'),
                      position:'top left',
                      hideDelay:false
                    })
                  }
                  else if(data.error==0){
                    // Logged in succesfull
                    var gettingData = $mdToast.show({
                      template:makeToast('Fetching Data...', 'black'),
                      position:'top left',
                      hideDelay:false
                    })
                    console.log('Login Succesfull')
                    console.log('Getting Data')
                    // Load new Data

                    saveCourses(data.userDetails, function(data) {
                      $mdToast.hide(gettingData)
                      if(data.error == 1) {
                        console.error('Cant get user courses')
                        // Error in Getting Course info
                        $mdToast.show({
                          template:makeToast('Reload and try again...', 'red'),
                          position:'top left',
                          hideDelay:false
                        })
                      }
                      else if(data.error == 0) {
                        console.log('Courses fetched')
                        // Data Succesfully Fetched
                        cb({error:0})
                        $mdToast.show({
                          template: makeToast('Succesfully Loaded All Your Data', 'green'),
                          hideDelay: 1000,
                          position: 'top left'
                        });
                      }
                    });
                    saveFaculty(data.userDetails,  function(data) {
                      if(data.error == 1) {
                        console.error('Error in getting Faculty Info')
                        // Error in Getting Faculty info
                      }
                      else if(data.error == 0) {
                        // Data Succesfully Fetched
                        console.log('Faculty info Succesfully fetched')
                      }
                    });
                  }
                  else {
                    // Unknown error
                  }
                })
            }
          }
       }])