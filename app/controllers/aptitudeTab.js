angular.module('etest') .controller('aptitudeTabController', [
    '$scope',
    '$mdToast',
    '$timeout',
    'aptitudeTest',
    function ($scope, $mdToast, $timeout, aptitudeTest) {
        $scope.showTCSToast = function (id) {
            alertify.success('Selected Aptitude Test : Set ' + id);
            aptitudeTest.setTCSSetId(id);
        };
    }
]);
