'use strict';

angular.module('etestApp')
  .controller('TCSVerbalExamResultController', function ($scope, $stateParams, $timeout,$location, $log, $interval, $sce, $mdDialog, User, Auth,TCSVerbalService) {
    var vm = this;
    vm.id=$stateParams.id;
    if(!vm.id){
      $location.path('/');
    }
    $log.info($stateParams.id);

    vm.test=TCSVerbalService.get(vm.id);
    vm.checkSpellingAndGrammar = function () {
      AtD.checkCrossAJAX('verbal-exam-result',
        {
          success: function (errorCount) {
            if (errorCount == 0) {
              //alert("No writing errors were found");
            }
          },

          error: function (reason) {
            alert(reason);
          },
          ready:function(msg){
            alert(msg);
          }
        });
    };
    $timeout(vm.checkSpellingAndGrammar,2000);
    //vm.checkSpellingAndGrammar();

    //$scope.$on('$destroy', function () { $interval.cancel(vm.interval); });
  });
