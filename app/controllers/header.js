angular.module('etest').controller('headerController', [
  '$scope',
  '$rootScope',
  '$http',
  '$window',
  '$timeout',
  '$mdBottomSheet',
  '$mdToast',
  '$mdDialog',
  '$timeout',
  '$mdSidenav',
  'login',
  'localStorageService',
  function($scope, $rootScope, $http, $window, $tiemout, $mdBottomSheet, $mdToast, $mdDialog, $timeout, $mdSidenav, login, localStorageService) {
    var user = localStorageService.get('user');
    $rootScope.urlPrefix = "http://vikashvv.5gbfree.com/";
    console.log(user)
    if (user) {
      $rootScope.logged = true;
      $rootScope.user = user;
    } else {
      $rootScope.logged = false;
      $rootScope.user = null;
    }
    $scope.templates = [{
      name: 'login_signup.html',
      url: './app/views/login_signup.html'
    }, {
      name: 'profile.html',
      url: './app/views/profile.html'
    }];
    $scope.login_signup = $scope.templates[0];
    $scope.profile = $scope.templates[1];
    $scope.toggleRight = function() {
      $mdSidenav('right').toggle();
    };
    $scope.toggleLeft = function() {
      $mdSidenav('left').toggle();
    };
    $scope.close = function() {
      $mdSidenav('right').close();
      $mdSidenav('left').close();
    };
    $scope.loginSignup = function(ev) {
      $mdDialog.show({
        controller: dialogController,
        templateUrl: './app/views/login_signup.html',
        targetEvent: ev,
      }).then(function(id) {
        //alertify.success("Set ID : "+id);
        //$location.path('Aptitude/TCS/Set/'+id);
      }, function() {
        //alertify.error('You cancelled the dialog.');
      });
    };

    function dialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.proceed = function() {
        $mdDialog.hide(' ');
      };
    };
    $scope.logme = function() {
      login.login();
      $scope.close();
    };
    $scope.logmeout = function() {
      login.logout();
      $scope.close();
    };

    var showFacebookLikeBox=function(ev){
      $mdDialog.show({
        controller: dialogController,
        templateUrl: './app/views/facebook_like_box.html',
        targetEvent: ev,
      }) .then(function (id) {

      }, function () {
        //alertify.error('You cancelled the dialog.');
      });
    };
    // function DialogController($scope, $mdDialog) {
    //   $scope.hide = function () {
    //     $mdDialog.hide();
    //   };
    //   $scope.cancel = function () {
    //     $mdDialog.cancel();
    //   };
    // };
    $timeout(showFacebookLikeBox,5000);
  }
]);
