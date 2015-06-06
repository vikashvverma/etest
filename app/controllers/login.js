angular.module('etest') .controller('loginController', [
    '$scope',
    '$rootScope',
    '$http',
    '$window',
    '$timeout',
    '$mdBottomSheet',
    '$mdToast',
    '$mdDialog',
    '$timeout',
    'login',
    function ($scope, $rootScope, $http, $window, $tiemout, $mdBottomSheet, $mdToast, $mdDialog, $timeout, login) {
        $scope.signin = function () {
            alertify.error('You must login with Facebook, this is temporarily not accesible!');
        };
        //        var set=function(){
        //            $scope.username="";
        //            $scope.first_name="";
        //            $scope.last_name="";
        //            $scope.email="";
        //            $scope.college="";
        //            $scope.password="";
        //        };
        //        set();
        $scope.signup = function () {
            var user = {
            };
            user.username = $scope.username;
            user.first_name = $scope.first_name;
            user.last_name = $scope.last_name;
            user.password = $scope.password;
            user.college = $scope.college;
            user.email = $scope.email;
            console.log($scope.username);
            if (validate(user))
            {
                login.addUser(user);
            } else {
                alertify.error('All fields are required!');
            }
        };
        var validate = function (user) {
            if (!user.username || !user.first_name || !user.email || !user.college || !user.password || !user.last_name)
                return false;
            else
                return true;
        };
        $scope.logme = function () {
            login.login();
            this.hide();
        };
    }
]);
