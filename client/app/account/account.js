'use strict';

angular.module('etestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.login', {
        url: 'login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('main.signup', {
        url: 'signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl as vm'
      })
      .state('main.settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });