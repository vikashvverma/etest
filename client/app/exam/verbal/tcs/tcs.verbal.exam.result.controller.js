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
      vm.result.name=Auth.getCurrentUser().name;
      vm.seriesType='spline';
      vm.resultType='column';
      TCSVerbalService.updateTest(vm.id,vm.result)
        .success(function(data){
          vm.getGraphData();
        }).error(function(err){
          vm.getGraphData();
        });

      vm.getGraphData=function(){
        TCSVerbalService.getAllStatistics(Auth.getCurrentUser()._id)
          .success(function(data){
            vm.seriesData=data;
          });;
        TCSVerbalService.getStatistics(vm.id,Auth.getCurrentUser()._id)
          .success(function(data){
            vm.resultData=data;
          });
      };
      //vm.resultData=[54, 12, 14, 15, 54, 84, 54, 12, 52, 65, 0];

    }


    //$timeout(vm.checkSpellingAndGrammar,2000);
    //vm.checkSpellingAndGrammar();

    //$scope.$on('$destroy', function () { $interval.cancel(vm.interval); });
  });
