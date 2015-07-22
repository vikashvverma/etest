'use strict';

angular.module('etestApp')
  .controller('TCSVerbalExamResultController', function ($scope, $stateParams, $timeout,$log, $interval, $sce, $mdDialog, User, Auth) {
    var vm = this;
    $log.info($stateParams.id);

    //$scope.$on('$destroy', function () { $interval.cancel(vm.interval); });
  });
