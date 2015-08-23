angular.module('VitApp')
       .controller('feedbackController', function(){
           var self = this;
           self.submit = function() {
            console.log(self.content)
           }
       })