'use strict';

angular.module('etestApp')
  .controller('MainCtrl', function ($scope, $location,$mdSidenav,$timeout, Auth) {
    var vm = this;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAdmin = Auth.isAdmin;
    vm.getCurrentUser = Auth.getCurrentUser;
    vm.years=[];
    vm.branches=[];

    vm.logout = function () {
      Auth.logout();
      $location.path('/login');
    };

    vm.mainMenu = [
      {
        icon: "fa fa-lock fa-2x",
        title: "Verbal",
        tooltip: "Verbal Test",
        url: 'main.verbal'
      },
      {
        icon: "fa fa-lock",
        title: "Aptitude",
        tooltip: "Aptitude Test",
        url: 'main.aptitude'
      }
    ];
    vm.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };
    vm.userMenu = [
      {
        link : '',
        title: 'Dashboard',
        icon: 'fa fa-lock fa-2x'
      },
      {
        link : '',
        title: 'Friends',
        icon: 'fa fa-lock fa-2x'
      },
      {
        link : '',
        title: 'Messages',
        icon: 'fa fa-lock fa-2x'
      }
    ];


  });
