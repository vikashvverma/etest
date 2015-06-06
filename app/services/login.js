angular.module('etest') .service('login', [
    '$rootScope',
    '$http',
    '$facebook',
    'localStorageService',
    '$location',
    function ($rootScope, $http, $facebook, localStorageService,$location) {
        var logged = false;
        var fromFacebook = false;
        this.login = function () {
            $facebook.login() .then(function () {
                this.logmein();
            }.bind(this));
        };
        this.logout=function(){
            localStorageService.remove('user');
            $rootScope.user = localStorageService.get("user");
            $rootScope.logged=false;
            logged=false;
            $location.path('Home');
            alertify.success("You have been logged out!");
        };
        this.logmein = function () {
            $facebook.api('/me') .then(function (response) {
                $rootScope.user = {
                    first_name: response.first_name,
                    email: response.email ? response.email : 'unknown',
                    name: response.name,
                    college: 'unknown',
                    username: response.id
                };
                console.log(JSON.stringify($rootScope.user));
                localStorageService.set('user', $rootScope.user);
                this.fromFacebook = true;
                this.addUser($rootScope.user);
                $rootScope.logged = true;
                this.logged = true;
                //$scope.startTime();
            }.bind(this), function (err) {
                alertify.error('Please log in');
                $rootScope.logged = false;
            }.bind(this));
            $facebook.api('/me/picture') .then(function (response) {
                if (response && !response.error) {
                    console.log(response.data.url);
                    $rootScope.user.profile_url = response.data.url;
                    localStorageService.set('user', $rootScope.user);
                }
            }.bind(this));
        };
        this.addUser = function (user) {
            $http({
                method: 'POST',
                url: $rootScope.urlPrefix + 'etest/addUser.php',
                params: {
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    college: user.college
                }
            }) .then(function (data) {
                console.log(data.data);
                if (this.fromFacebook)
                    this.fromFacebook = false;
                else {
                    if (!data.data.indexOf('error')) {
                        alertify.error(data.data.split(':') [1]);
                    } else {
                        $rootScope.user = user;
                        localStorageService.set('user', $rootScope.user);
                    }
                }
            }) .catch (function (err) {
                console.log(err.message);
            }) .finally (function (data) {
            });
        };
        this.isLogged = function () {
            return logged;
        };
    }
]);
