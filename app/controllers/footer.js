
angular.module('etest') .controller('footerController', [
'$scope',
'$rootScope',
'$http',
'$mdDialog',
function ($scope, $rootScope, $http, $mdDialog)
  {

    $scope.contact = function (ev) {
      $mdDialog.show({
        controller: dialogController,
        templateUrl: './app/views/contact_form.html',
        targetEvent: ev,
      }) .then(function (id) {
      }, function () {
      });
    };
    function dialogController($scope, $mdDialog,$http) {
      $scope.hide = function () {
        $mdDialog.hide();
      };
      $scope.cancel = function () {
        $mdDialog.cancel();
      };
      $scope.proceed = function () {
        $mdDialog.hide(' ');
      };
      $scope.submit = function () {
        console.log($scope.name + ' ' + $scope.email + ' ' + $scope.college + ' ' + $scope.message);
        if (!$scope.name || !$scope.college || !$scope.email || !$scope.message)
          alertify.error('Name, College, eMail and message are mandatory!');
          else {
            $scope.time=new Date().toDateString();
            $http({
              method: 'POST',
              url: $rootScope.urlPrefix + 'etest/contactUs.php',
              params: {
                name: $scope.name,
                college: $scope.college,
                email: $scope.email,
                message: $scope.message,
                time: $scope.time
              }
            }) .then(function (data) {
              console.log(data);
              alertify.success('Message submitted, we will get back to you as soon as possible');
              $mdDialog.hide(' ');
            }) .catch (function (err) {
              console.log(err.message);
              alertify.error('Sorry unable to submit your message!\nPlease try again later! \nor\n Drop a mail at admin@programminggeek.in');
            }) .finally (function (data) {
              $scope.name = '';
              $scope.college = '';
              $scope.message = '';
              $scope.email = '';
              $scope.time = '';
            });
          }
        };
      };


  }
]);
