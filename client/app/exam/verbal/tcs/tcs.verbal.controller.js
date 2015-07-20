'use strict';

angular.module('etestApp')
  .controller('TCSVerbalController', function ($scope, $location,$mdDialog, User, Auth) {
    var vm = this;
    vm.sets = [{
      tests: [{
        category: 'Verbal',
        title: 'TCS Vebal Test Set1',
        subtitle: 'Email to Corporate Team',
        description: 'You are Joy, a part of corporate communication team in your company. The working time period is revised as 8:30 am to 5:00pm. Using the following phrases, write an email with a minimum of 50 words and a maximum of 80 words to the employees in your company informing the same.',
        date: new Date(2014, 8, 23),
        count: 600,
        marks: 100,
        duration: 10,
        highest_score: 100,
        highest_scorer: 'Vikash',
        last_attempt_by: 'Vikash',
        last_attempt_on: new Date(2015, 7, 21)

      }, {
        category: 'Verbal',
        title: 'TCS Vebal Test Set1',
        subtitle: 'Email to Corporate Team',
        description: 'You are Joy, a part of corporate communication team in your company. The working time period is revised as 8:30 am to 5:00pm. Using the following phrases, write an email with a minimum of 50 words and a maximum of 80 words to the employees in your company informing the same.',
        date: new Date(2014, 8, 23),
        count: 600,
        marks: 100,
        duration: 10,
        highest_score: 100,
        highest_scorer: 'Vikash',
        last_attempt_by: 'Vikash',
        last_attempt_on: new Date(2015, 7, 21)

      }, {
        category: 'Verbal',
        title: 'TCS Vebal Test Set1',
        subtitle: 'Email to Corporate Team',
        description: 'You are Joy, a part of corporate communication team in your company. The working time period is revised as 8:30 am to 5:00pm. Using the following phrases, write an email with a minimum of 50 words and a maximum of 80 words to the employees in your company informing the same.',
        date: new Date(2014, 8, 23),
        count: 600,
        marks: 100,
        duration: 10,
        highest_score: 100,
        highest_scorer: 'Vikash',
        last_attempt_by: 'Vikash',
        last_attempt_on: new Date(2015, 7, 21)

      }]
    }, {
      tests: [{
        category: 'Verbal',
        title: 'TCS Vebal Test Set1',
        subtitle: 'Email to Corporate Team',
        description: 'You are Joy, a part of corporate communication team in your company. The working time period is revised as 8:30 am to 5:00pm. Using the following phrases, write an email with a minimum of 50 words and a maximum of 80 words to the employees in your company informing the same.',
        date: new Date(2014, 8, 23),
        count: 600,
        marks: 100,
        duration: 10,
        highest_score: 100,
        highest_scorer: 'Vikash',
        last_attempt_by: 'Vikash',
        last_attempt_on: new Date(2015, 7, 21)

      }, {
        category: 'Verbal',
        title: 'TCS Vebal Test Set1',
        subtitle: 'Email to Corporate Team',
        description: 'You are Joy, a part of corporate communication team in your company. The working time period is revised as 8:30 am to 5:00pm. Using the following phrases, write an email with a minimum of 50 words and a maximum of 80 words to the employees in your company informing the same.',
        date: new Date(2014, 8, 23),
        count: 600,
        marks: 100,
        duration: 10,
        highest_score: 100,
        highest_scorer: 'Vikash',
        last_attempt_by: 'Vikash',
        last_attempt_on: new Date(2015, 7, 21)

      }, {
        category: 'Verbal',
        title: 'TCS Vebal Test Set1',
        subtitle: 'Email to Corporate Team',
        description: 'You are Joy, a part of corporate communication team in your company. The working time period is revised as 8:30 am to 5:00pm. Using the following phrases, write an email with a minimum of 50 words and a maximum of 80 words to the employees in your company informing the same.',
        date: new Date(2014, 8, 23),
        count: 600,
        marks: 100,
        duration: 10,
        highest_score: 100,
        highest_scorer: 'Vikash',
        last_attempt_by: 'Vikash',
        last_attempt_on: new Date(2015, 7, 21)

      }]
    }, {
      tests: [{
        category: 'Verbal',
        title: 'TCS Vebal Test Set1',
        subtitle: 'Email to Corporate Team',
        description: 'You are Joy, a part of corporate communication team in your company. The working time period is revised as 8:30 am to 5:00pm. Using the following phrases, write an email with a minimum of 50 words and a maximum of 80 words to the employees in your company informing the same.',
        date: new Date(2014, 8, 23),
        count: 600,
        marks: 100,
        duration: 10,
        highest_score: 100,
        highest_scorer: 'Vikash',
        last_attempt_by: 'Vikash',
        last_attempt_on: new Date(2015, 7, 21)

      }, {
        category: 'Verbal',
        title: 'TCS Vebal Test Set1',
        subtitle: 'Email to Corporate Team',
        description: 'You are Joy, a part of corporate communication team in your company. The working time period is revised as 8:30 am to 5:00pm. Using the following phrases, write an email with a minimum of 50 words and a maximum of 80 words to the employees in your company informing the same.',
        date: new Date(2014, 8, 23),
        count: 600,
        marks: 100,
        duration: 10,
        highest_score: 100,
        highest_scorer: 'Vikash',
        last_attempt_by: 'Vikash',
        last_attempt_on: new Date(2015, 7, 21)

      }, {
        category: 'Verbal',
        title: 'TCS Vebal Test Set1',
        subtitle: 'Email to Corporate Team',
        description: 'You are Joy, a part of corporate communication team in your company. The working time period is revised as 8:30 am to 5:00pm. Using the following phrases, write an email with a minimum of 50 words and a maximum of 80 words to the employees in your company informing the same.',
        date: new Date(2014, 8, 23),
        count: 600,
        marks: 100,
        duration: 10,
        highest_score: 100,
        highest_scorer: 'Vikash',
        last_attempt_by: 'Vikash',
        last_attempt_on: new Date(2015, 7, 21)

      }]
    }];

    vm.start = function (ev,id) {
      //$location.path('/exam/tcs/verbal/1')
      $mdDialog.show({
        controller: vm.controller,
        templateUrl: 'app/exam/verbal/tcs/instructions.html',
        parent: angular.element(document.body),
        targetEvent: ev,
      })
        .then(function(answer) {
          alert('You said the information was "' + answer + '".');
        }, function() {
          alert('You cancelled the dialog.');
        });
    };
    vm.controller=function($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    };
  });
