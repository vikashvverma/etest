angular.module('etest') .controller('aboutController', [
    '$scope',
    '$rootScope',
    '$http',
    '$window',
    '$timeout',
    '$mdBottomSheet',
    '$mdToast',
    '$mdDialog',
    '$timeout',
    'header',
    function ($scope, $rootScope, $http, $window, $tiemout, $mdBottomSheet, $mdToast, $mdDialog, $timeout, header) {
        header.setTitle('e-test : About');
        $rootScope.page = 'about';
    }
]);
