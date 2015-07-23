'use strict';

angular.module('etestApp')
  .factory('TCSVerbalService', function Auth($location, $rootScope, $http, User, $cookieStore, $q,$log) {
    var currentUser = {};
    var currentTest={};

    return {
      getTests:function(){
        return $http.get('/api/verbal/tcs');
      },
      getTest:function(id){
        return $http.get('/api/verbal/tcs/'+id)
          .success(function(data){
            currentTest=data;
            currentTest.time={
              minute: 10,
              second: 0,
              seconds: 600
            };
            currentTest.word=0;
            currentTest.answer='';
            $q.resolve(data);
          }).error(function(err){
            $q.reject(err);
          });
      },
      updateTest:function(id){
        return $http.post('/api/verbal/tcs'+id);
      },
      resetTest:function(test){
        currentTest=test;
      },
      get:function(id){
        if(currentTest.id==id)
        return currentTest;
        else
        $location.path('/');
      }
    };
  });
