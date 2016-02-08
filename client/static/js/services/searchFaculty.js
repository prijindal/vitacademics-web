var HOST = 'https://vitacademics-rel.herokuapp.com'
// HOST = 'http://localhost:3000'
angular.module('VitApp')
    .service('searchFaculty', ['$http','Auth',function($http,Auth) {
      var search = function(query, callback) {
        if(!Auth.isLoggedIn()) return callback({error:1});
        $http.post(HOST + '/api/v2/vellore/faculty',{name:query})
        .success(function(data) {
          console.log(data);
          if(!data.status || data.status.code!=0) return ;
          // cb({error:data.status.code, })
        })
        .error(function(err) {
          cb({error:1})
        })
      }

      return {
        search:search
      }

    }])
