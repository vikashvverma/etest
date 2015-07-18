'use strict';

angular.module('etestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.verbal', {
        url: 'exam/verbal',
        templateUrl: 'app/exam/verbal/verbal.html',
        controller: 'VerbalController as vm'
      }).state('main.tcsverbal', {
        url: 'exam/tcs/verbal',
        templateUrl: 'app/exam/verbal/tcs/tcs.verbal.html',
        controller: 'TCSVerbalController'
      });
  });
