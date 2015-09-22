'use strict';

angular.module('etestApp')
  .controller('TCSVerbalExamResultController', function ($scope, $stateParams, $timeout, $location, $log, $interval, $sce, $mdDialog, User, Auth, TCSVerbalService) {
    var vm = this;
    vm.id = $stateParams.id;
    if (!vm.id || !TCSVerbalService.get(vm.id) || !TCSVerbalService.get(vm.id)) {
      return  $location.path('/');
    }else{
      vm.test = TCSVerbalService.get(vm.id);
      vm.result = TCSVerbalService.getTestTResult(vm.id);
      vm.result.userId=Auth.getCurrentUser()._id;
      vm.result.name=Auth.getCurrentUser().name?Auth.getCurrentUser().name:Auth.getCurrentUser().first_name+" "+Auth.getCurrentUser().last_name;
      vm.seriesType='spline';
      vm.resultType='column';
      vm.rankType='spline';
      vm._id='';

      vm.timeout=$timeout(function(){
        if(!vm.result.score) return;
        vm.result.spellcheck().then(function(data){
          var names=countNames(vm.test.names,vm.test.answer);
          if((data.errorCount-names)>0){
            TCSVerbalService.notify("You have made "+(data.errorCount-names)+" mistake(s)!",'error');
            vm.result.score-=10;
          }else{
            vm.result.score+=10;
          }
          if(vm._id){
            TCSVerbalService.patchTest(vm.id,vm._id,vm.result).success(function(data){
              $log.info("Score has been adjusted!",data)
              TCSVerbalService.notify("Your score has been adjusted after checking spelling or grammatical error(s)!",'success');
              vm.getGraphData();
            });
          }

        },function(err){
          TCSVerbalService.notify("Couldn't check spelling and grammar mistake(s)!",'error');
        },function(data){
          TCSVerbalService.notify("Checking Spelling and Grammar!",'info');
        })
      },0);
      TCSVerbalService.updateTest(vm.id,vm.result)
        .success(function(data){
          $log.info(data);
          vm._id=data._id;
          vm.getGraphData();
        }).error(function(err){
          vm.getGraphData();
        });

      vm.getGraphData=function(){

        TCSVerbalService.getStatistics(vm.id,Auth.getCurrentUser()._id)
          .success(function(data){
            vm.resultData=data;
          });
        TCSVerbalService.getAllStatistics(Auth.getCurrentUser()._id)
          .success(function(data){
            vm.seriesData=data;
          });
        TCSVerbalService.getRankStatistics(vm.id,Auth.getCurrentUser()._id)
          .success(function(data){
            vm.rankData=data;
          });
      };
      //vm.resultData=[54, 12, 14, 15, 54, 84, 54, 12, 52, 65, 0];
      $scope.$on('$destroy', function () { $timeout.cancel(vm.timeout); });
    }


    //$timeout(vm.checkSpellingAndGrammar,2000);
    //vm.checkSpellingAndGrammar();
    function countNames(names,string){
      var count=0;
      for(var i=names.length-1;i>=0;i--){
        var len=names[i].length;
        count+=(string.length-string.replace(/names[i]/g,''))/len;
      }
      return count;
    }
  });
