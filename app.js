// app.js

var etest = angular.module('etest', ['ngMaterial', 'ui.router', 'ngFacebook', 'LocalStorageModule']);

etest.config(['$stateProvider', '$urlRouterProvider', '$facebookProvider', 'localStorageServiceProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $facebookProvider, localStorageServiceProvider, $locationProvider) {
    $locationProvider.hashPrefix("!");
    localStorageServiceProvider.setPrefix('programminggeek');

    $urlRouterProvider.otherwise('/error');


    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
      .state('Home', {
      url: '/Home',
      templateUrl: './app/views/home.html',
      controller: 'mainController'
    })

    .state(" ", {
      url: '',
      templateUrl: './app/views/home.html',
      controller: 'mainController'
    })

    .state("Verbal", {
        url: '/Verbal',
        templateUrl: './app/views/verbal.html',
        controller: 'verbalController'
      })
      .state("Verbal/TCS/Set", {
        url: '/Verbal/TCS/Set/:id',
        templateUrl: './app/views/tcs_verbal_test.html',
        controller: 'TCSVerbalTestController'
      })

    .state('Aptitude', {
      url: '/Aptitude',
      templateUrl: './app/views/aptitude.html',
      controller: 'aptitudeController'
    })

    .state('Aptitude/TCS/Set', {
        url: '/Aptitude/TCS/Set/:setId',
        templateUrl: './app/views/tcs_aptitude_test.html',
        controller: 'TCSAptitudeTestController'
      })
      .state('Testimonial', {
        url: '/Testimonial',
        templateUrl: './app/views/testimonial.html',
        controller: 'testimonialController'
      })

    .state('About', {
      url: '/About',
      templateUrl: './app/views/about.html',
      controller: 'aboutController'
    })

    .state('error', {
      url: '/error',
      templateUrl: './app/views/error_404.html',
      controller: 'errorController'
    });

    $facebookProvider.setAppId('1473928212839583');

    // Load the facebook SDK asynchronously
    (function() {
      // If we've already installed the SDK, we're done
      if (document.getElementById('facebook-jssdk')) {
        return;
      }

      // Get the first script element, which we'll use to find the parent node
      var firstScriptElement = document.getElementsByTagName('script')[0];

      // Create a new script element and set its id
      var facebookJS = document.createElement('script');
      facebookJS.id = 'facebook-jssdk';

      // Set the new script's source to the source of the Facebook JS SDK
      facebookJS.src = '//connect.facebook.net/en_US/all.js';

      // Insert the Facebook JS SDK into the DOM
      firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
    }());
  }
]);

etest.controller('errorController', ['$scope', '$rootScope', function($scope, $rootScope) {


}]);
