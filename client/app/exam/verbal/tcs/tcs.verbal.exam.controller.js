'use strict';

angular.module('etestApp')
  .controller('TCSVerbalExamController', function ($scope, $stateParams,$location, $timeout, $interval, $sce, $mdDialog, User, Auth) {
    var vm = this;
    var set=$stateParams.id;
    if(!set){
      $location.path('/')
    }
    vm.time = {
      minutes: 10,
      second: 0
    };
    vm.test = {
      set: set,
      question: 'You are Navin, working in an organization that works with overseas clients. There is a call scheduled for March 27 with the client leader German national living in Berlin. Suddenly you realize that March 27th is Holi. None of your team members would be coming to office (in India) that day. You realize that you need to reschedule the call. You are a little busy so you send an email to the German client in Berlin. Write the email using following phrases : ',
      outline: 'Cancel - meeting - March 27th - Holi - national holiday - reschedule - response - email - apologize - inconvenience - date',
      instructions: [
        {
          icon: 'fa fa-hand-o-right',
          instruction: $sce.trustAsHtml("It is <b>compulsory</b> to use all the <b>specific words mentioned in the Outline</b> in your email. You can add other sentences of your choice, as appropriate.")
        }, {
          icon: 'fa fa-hand-o-right',
          instruction: $sce.trustAsHtml('The name of the <b>sender and receiver</b> should be as given.')
        }, {
          icon: 'fa fa-hand-o-right',
          instruction: $sce.trustAsHtml('The email must contain a minimum of <b>fifty words</b>, or it will not be evaluated at all.')
        }, {
          icon: 'fa fa-hand-o-right',
          instruction: 'If the outline is not strictly followed (including the speific words used), or correct English (including spelling and grammar) is not used, the grade in this section will be poor.'
        }
      ],
      time: {
        minute: 10,
        second: 0,
        seconds: 600
      },
      word: 0,
      answer: ''
    };
    vm.log = function () {
    };
    vm.startTest = function () {
      vm.startTime();
    };
    vm.startTime = function () {
     vm.interval = $interval(function () {
        vm.test.time.seconds -= 1;
        if (vm.test.time.seconds > 0) {
          vm.test.time.minute = parseInt(vm.test.time.seconds / 60);
          vm.test.time.second = vm.test.time.seconds % 60;
        } else {
          vm.endTime();
        }
      }, 1000);


    };
    vm.endTime = function () {
      $interval.cancel(vm.interval);
      vm.evaluateAnswer();
    };
    vm.evaluateAnswer = function () {
      //alert('Test Ended!');
      $location.path('/exam/tcs/verbal/'+set+'/result')
    };
    vm.endTest = function (ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .parent(angular.element(document.body))
        .title('Are you sure you want to exit this section?')
        .content('Click on Submit to see your result.')
        .ariaLabel('Finish')
        .ok('Yes')
        .cancel('No')
        .targetEvent(ev ? ev : null);
      $mdDialog.show(confirm).then(function () {
        vm.endTime();
      }, function () {

      });
    };
    vm.setCount = function () {
      vm.test.word = vm.wordCount(vm.test.answer);
    };
    vm.wordCount = function (content) {
      if (content.length == 0)
        return content.length;
      var seperatePlusText = content.replace(/\s/g, '+');
      var m = seperatePlusText.replace(/^\s/g, '+');
      var str1 = m.replace(/\+*$/gi, '');
      var str2 = str1.replace(/\++/g, ' ');
      //alert(str2);
      return str2.split(' ').length;
    };
    vm.startTest();
    $scope.$on('$destroy', function () { $interval.cancel(vm.interval); });
  });
