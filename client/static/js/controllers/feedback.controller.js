angular.module('VitApp')
       .controller('feedbackController',['$http', function($http){
           var self = this;
           self.submit = function() {
            console.log(self.content)
            var url = 'https://slack.com/api/chat.postMessage?token=xoxp-2533890975-8552111447-10245570837-9aed3d&channel=C09LRQM8T'
            url+='&text='+self.content
            $http({
                    method:'GET',
                    url: url,
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                })
                .success(function(data) {
                    console.log(data)
                })
                .error(function(err) {
                    console.log(err)
                })
            }
       }])
