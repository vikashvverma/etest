angular.module('etest') .controller('verbalTabController', [
    '$scope',
    '$mdToast',
    '$timeout',
    'VerbalTest',
    function ($scope, $mdToast, $timeout, VerbalTest) {
        $scope.selectedIndex = 0;
        $scope.showToast = function (id) {
            alertify.success('Selected Verbal Test : Set ' + id);
            VerbalTest.setTCSSetId(id);
        };
        $scope.toastPosition = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };
        $scope.getToastPosition = function () {
            return Object.keys($scope.toastPosition) .filter(function (pos) {
                return $scope.toastPosition[pos];
            }) .join(' ');
        };
    }
]);
