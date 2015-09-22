'use strict';

angular.module('etestApp')
  .controller('VerbalController', function ($scope, User, Auth) {
    var vm=this;
    vm.tests=[
      {
        image:'assets/images/tcs_logo_stacked.png',
        title:'TCS Verbal Ability Tests',
        content:'Take TCS Verbal Ability test',
        link:'main.tcsverbal'
      },
      {
        image:'assets/images/ibm_logo.png',
        title:'IBM Verbal Test',
        content:'Coming Soon',
        link:'main.verbal'
      },
      {
        image:'assets/images/mu-sigma.jpg',
        title:'Mu Apt',
        content:'Coming Soon',
        link:'main.verbal'
      }
    ];




  });
