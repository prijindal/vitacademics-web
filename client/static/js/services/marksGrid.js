angular.module('VitApp')
       .service('marksGrid', function(){
         var layout = {
          "1":{
            "total":1,
            "grid":{
              0:{
                show:true,
                class:'orange',
                rows:3,
                cols:10,
                index:0
              }
            }
          },
          "6":{
            "total":8,
            "grid":{
                      0:{
                        show:false,
                        class:'empty',
                        rows:1,
                        cols:5
                      },
                      1:{
                        show:true,
                        class:'blue',
                        rows:4,
                        cols:5,
                        index:2
                      },
                      2:{
                        show:true,
                        class:'green',
                        rows:5,
                        cols:5,
                        index:0
                      },
                      3:{
                        show:true,
                        class:'red',
                        rows:4,
                        cols:5,
                        index:3
                      },
                      4:{
                        show:true,
                        class:'yellow',
                        rows:5,
                        cols:5,
                        index:1
                      },
                      5:{
                        show:true,
                        class:'brown',
                        rows:4,
                        cols:5,
                        index:4
                      },
                      6:{
                        show:false,
                        class:'empty',
                        rows:1,
                        cols:5
                      },
                      7:{
                        show:true,
                        class:'purple',
                        rows:3,
                        cols:10,
                        index:5
                      }
                    }
            }
         }

         return {
          grid:layout
         }
       })