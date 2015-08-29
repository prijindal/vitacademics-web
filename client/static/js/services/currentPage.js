angular.module('VitApp')
       .service('currentPage',['$location', function($location) {
          var showPage = function() {
            var currentPage = {name:'VitAcadmics'};
            switch($location.path()) {
              case '/':
                    currentPage = {name:'Home'}
                    break;
              case '/courses':
                    currentPage = {name:'Courses'}
                    break;
              case '/timetable':
                    currentPage = {name:'TimeTable'}
                    break;
              case '/advisor':
                    currentPage = {name:'Advisor'}
                    break;
              case '/about':
                    currentPage = {name:'About Us'}
                    break;
              case '/version':
                    currentPage = {name:'Version Info'}
                    break;
              case '/feedback':
                    currentPage = {name:'FeedBack'}
                    break;
              default:
                    currentPage = {name:'VitAcadmics'};
            }
            return currentPage;
          }
          return {
            getCurrentPage:showPage
          }
       }])