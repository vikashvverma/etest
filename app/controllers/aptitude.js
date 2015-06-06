angular.module('etest') .controller('aptitudeController', [
    '$scope',
    '$rootScope',
    '$http',
    'aptitudeTest',
    '$location',
    '$mdDialog',
    'header',
    function ($scope, $rootScope, $http, aptitudeTest, $location, $mdDialog, header)
    {
        header.setTitle('e-test: Free Online Aptitude Test for TCS, IBM, Infosys');
        $rootScope.page = 'aptitude';

        $scope.selectTCSAptitudeTestSet = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: './app/views/tcs_aptitude_select.html',
                targetEvent: ev,
            }) .then(function (id) {
                //alertify.success("Set ID : "+id);
                $location.path('Aptitude/TCS/Set/' + id);
            }, function () {
                //alertify.error('You cancelled the dialog.');
            });
        };
        function DialogController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.proceed = function () {
                $mdDialog.hide(aptitudeTest.getTCSSetId());
            };
        };
    }
]);
