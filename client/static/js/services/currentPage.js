angular.module('VitApp')
       .service('currentPage',function() {
          var currentPage = {name:'VitAcadmics'};
          var showPage = function(pageTitle) {
            console.log('Focuss....', pageTitle)
            currentPage = pageTitle; 
          }
          return {
            showPage:showPage,
            getCurrentPage:function() {
              return currentPage;
            }
          }
       })