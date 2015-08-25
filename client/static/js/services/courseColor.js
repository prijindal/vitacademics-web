angular.module('VitApp')
       .service('courseColor', function(){
          var colors = [
            'red',
            'green',
            'brown',
            'yellow',
            'purple',
            'blue',
            'orange',
            'blueGray'
          ]

          var chooseColor = function(courseSlot) {
             switch(courseSlot[0].toUpperCase()) {
                case 'A':
                  k = 0;
                  break;
                
                case 'B':
                  k = 1;
                  break;
                
                case 'C':
                  k = 2;
                  break;
                
                case 'D':
                  k = 3;
                  break;
                
                case 'E':
                  k = 4;
                  break;
                
                case 'F':
                  k = 5;
                  break;
                
                case 'G':
                  k = 6;
                  break;

                case 'L':
                  k = 7;
                  break;
              }
              return colors[k]
          }
          return {
            pick:chooseColor
          } 
       })